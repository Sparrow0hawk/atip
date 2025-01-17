#[macro_use]
extern crate anyhow;
#[macro_use]
extern crate log;

mod map_matching;

use std::collections::BTreeSet;

use geojson::Feature;
use geom::{Distance, FindClosest, Pt2D};
use osm2streets::{Filter, IntersectionID, StreetNetwork};
use serde::Deserialize;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct RouteInfo {
    network: StreetNetwork,
    closest_intersection: FindClosest<IntersectionID>,
}

#[wasm_bindgen]
impl RouteInfo {
    /// Call with bincoded bytes of a StreetNetwork
    #[wasm_bindgen(constructor)]
    pub fn new(input_bytes: &[u8]) -> Result<RouteInfo, JsValue> {
        // Panics shouldn't happen, but if they do, console.log them.
        console_error_panic_hook::set_once();
        console_log::init_with_level(log::Level::Info).unwrap();

        info!("Got {} bytes, deserializing", input_bytes.len());

        let network: StreetNetwork = bincode::deserialize(input_bytes).map_err(err_to_js)?;

        let mut closest_intersection = FindClosest::new();
        for i in network.intersections.values() {
            closest_intersection.add_polygon(i.id, &i.polygon);
        }

        Ok(RouteInfo {
            network,
            closest_intersection,
        })
    }

    // TODO How can we glue up anyhow?
    // TODO Can we take geojson::Feature so that it shows up in TS?
    /// Given a GeoJSON LineString, generate a name based on the roads at each endpoint
    #[wasm_bindgen(js_name = nameForRoute)]
    pub fn name_for_route(&self, raw_line_string: JsValue) -> Result<String, JsValue> {
        let feature: geojson::Feature = serde_wasm_bindgen::from_value(raw_line_string)?;
        let (pt1, pt2) = self.linestring_endpoints(&feature).map_err(err_to_js)?;

        // Find the closest intersections to the route endpoints
        let threshold = Distance::meters(100.0);
        let (i1, _) = self
            .closest_intersection
            .closest_pt(pt1, threshold)
            .ok_or_else(|| err_to_js("no intersection close to first pt"))?;
        let (i2, _) = self
            .closest_intersection
            .closest_pt(pt2, threshold)
            .ok_or_else(|| err_to_js("no intersection close to last pt"))?;

        let i1_name = self.name_intersection(i1);
        let i2_name = self.name_intersection(i2);
        Ok(format!("Route from {i1_name} to {i2_name}"))
    }

    fn name_intersection(&self, i: IntersectionID) -> String {
        // TODO When the name is missing, we could fallback on other OSM tags. See
        // map_model::Road::get_name.
        let road_names = self.network.intersections[&i]
            .roads
            .iter()
            .map(|r| {
                self.network.roads[r]
                    .name
                    .clone()
                    .unwrap_or_else(|| "???".to_string())
            })
            .collect::<BTreeSet<_>>();
        abstutil::plain_list_names(road_names)
    }

    /// Given the JSON waypoints array produced by route-snapper, generate GeoJSON LineStrings
    /// covering each segment of the route where `speed_limit` (in mph, rounded) is defined.
    /// Freehand and unknown segments are not returned.
    #[wasm_bindgen(js_name = speedLimitForRoute)]
    pub fn speed_limit_for_route(&self, raw_waypoints: JsValue) -> Result<String, JsValue> {
        let raw_waypoints: Vec<RawRouteWaypoint> = serde_wasm_bindgen::from_value(raw_waypoints)?;
        let waypoints = self.parse_waypoints(raw_waypoints).map_err(err_to_js)?;

        let mut features = Vec::new();
        for pair in waypoints.windows(2) {
            if let (Waypoint::Snapped(_, i1), Waypoint::Snapped(_, i2)) = (&pair[0], &pair[1]) {
                if let Some(path) = self.geometric_path(*i1, *i2) {
                    // Add one LineString per Road where speed_limit is defined.
                    // We could try to glue together contiguous LineStrings where the speed is the
                    // same, but there's no benefit.
                    for (r, _) in path {
                        let road = &self.network.roads[&r];
                        if let Some(speed) = road.speed_limit {
                            let mut feature = Feature::from(
                                road.reference_line
                                    .to_geojson(Some(&self.network.gps_bounds)),
                            );
                            feature.set_property("speed_limit", speed.to_miles_per_hour().round());
                            features.push(feature);
                        }
                    }
                } else {
                    return Err(err_to_js("no path between two waypoints"));
                }
            }
        }

        let gj = geojson::GeoJson::from(geojson::FeatureCollection {
            bbox: None,
            features,
            foreign_members: None,
        });
        Ok(abstutil::to_json(&gj))
    }

    /// Return GeoJSON LineStrings with all known `speed_limit`s.
    #[wasm_bindgen(js_name = allSpeedLimits)]
    pub fn all_speed_limits(&self) -> Result<String, JsValue> {
        let mut features = Vec::new();
        for r in self.network.roads.values() {
            if r.is_light_rail() {
                continue;
            }
            if let Some(speed) = r.speed_limit {
                let mut feature =
                    Feature::from(r.reference_line.to_geojson(Some(&self.network.gps_bounds)));
                feature.set_property("speed_limit", speed.to_miles_per_hour().round());
                features.push(feature);
            }
        }
        let gj = geojson::GeoJson::from(geojson::FeatureCollection {
            bbox: None,
            features,
            foreign_members: None,
        });
        Ok(abstutil::to_json(&gj))
    }

    /// Return 4 GeoJSON layers for rendering lane details, limited to just roads along a route.
    /// Due to encoding limitations, returns it as a JSON string containing 4 more JSON strings.
    /// The order returned is [lane polygons, lane markings, intersection polygons, intersection
    /// markings], and the properties of each feature isn't documented anywhere clearly yet.
    #[wasm_bindgen(js_name = renderLaneDetailsForRoute)]
    pub fn render_lane_details_for_route(&self, raw_waypoints: JsValue) -> Result<String, JsValue> {
        let raw_waypoints: Vec<RawRouteWaypoint> = serde_wasm_bindgen::from_value(raw_waypoints)?;
        let waypoints = self.parse_waypoints(raw_waypoints).map_err(err_to_js)?;

        let mut roads = BTreeSet::new();
        let mut intersections = BTreeSet::new();

        for pair in waypoints.windows(2) {
            if let (Waypoint::Snapped(_, i1), Waypoint::Snapped(_, i2)) = (&pair[0], &pair[1]) {
                if let Some(path) = self.geometric_path(*i1, *i2) {
                    for (r, _) in path {
                        let road = &self.network.roads[&r];
                        roads.insert(r);
                        intersections.insert(road.src_i);
                        intersections.insert(road.dst_i);
                    }
                }
            }
        }
        let filter = Filter::Filtered(roads, intersections);

        Ok(abstutil::to_json(&vec![
            self.network
                .to_lane_polygons_geojson(&filter)
                .map_err(err_to_js)?,
            self.network
                .to_lane_markings_geojson(&filter)
                .map_err(err_to_js)?,
            self.network.to_geojson(&filter).map_err(err_to_js)?,
            self.network
                .to_intersection_markings_geojson(&filter)
                .map_err(err_to_js)?,
        ]))
    }
}

fn err_to_js<E: std::fmt::Display>(err: E) -> JsValue {
    JsValue::from_str(&err.to_string())
}

// Defined by https://github.com/dabreegster/route_snapper/blob/main/route-snapper/src/lib.rs. Too
// simple to take a dependency.
#[derive(Deserialize)]
struct RawRouteWaypoint {
    lon: f64,
    lat: f64,
    snapped: bool,
}

enum Waypoint {
    Free(Pt2D),
    Snapped(Pt2D, IntersectionID),
}
