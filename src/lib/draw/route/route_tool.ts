import { JsRouteSnapper } from "route-snapper";
import type { Map, GeoJSONSource, MapMouseEvent } from "maplibre-gl";
import type { Feature, LineString, Polygon } from "geojson";
import {
  emptyGeojson,
  isPoint,
  isLine,
  isPolygon,
  overwriteSource,
  overwriteLayer,
  drawCircle,
  drawLine,
  drawPolygon,
  type FeatureWithProps,
} from "../../../maplibre_helpers";
import { EventManager } from "../events";

const source = "route-snapper";

const circleRadiusPixels = 10;
const snapDistancePixels = 30;

export class RouteTool {
  map: Map;
  inner: JsRouteSnapper;
  active: boolean;
  eventListenersSuccessRoute: ((f: FeatureWithProps<LineString>) => void)[];
  eventListenersSuccessArea: ((f: FeatureWithProps<Polygon>) => void)[];
  eventListenersFailure: (() => void)[];

  events: EventManager;

  constructor(map: Map, graphBytes: Uint8Array) {
    this.map = map;
    console.time("Deserialize and setup JsRouteSnapper");
    this.inner = new JsRouteSnapper(graphBytes);
    console.timeEnd("Deserialize and setup JsRouteSnapper");
    this.active = false;
    this.eventListenersSuccessRoute = [];
    this.eventListenersSuccessArea = [];
    this.eventListenersFailure = [];

    // Rendering
    overwriteSource(map, source, {
      type: "geojson",
      data: emptyGeojson(),
    });
    overwriteLayer(map, {
      id: "route-points",
      source,
      filter: isPoint,
      ...drawCircle(
        [
          "match",
          ["get", "type"],
          "hovered",
          "green",
          "important",
          "red",
          // other
          "black",
        ],
        [
          "match",
          ["get", "type"],
          "unimportant",
          circleRadiusPixels / 2.0,
          // other
          circleRadiusPixels,
        ]
      ),
    });
    overwriteLayer(map, {
      id: "route-lines",
      source,
      filter: isLine,
      ...drawLine("black", 2.5),
    });
    overwriteLayer(map, {
      id: "route-polygons",
      source,
      filter: isPolygon,
      ...drawPolygon("black", 0.5),
    });

    // Set up interactions
    this.events = new EventManager(this, map);
    this.events.mapHandler("mousemove", this.onMouseMove);
    this.events.mapHandler("click", this.onClick);
    this.events.mapHandler("dragstart", this.onDragStart);
    this.events.mapHandler("mouseup", this.onMouseUp);
    this.events.documentHandler("keypress", this.onKeyPress);
    this.events.documentHandler("keydown", this.onKeyDown);
    this.events.documentHandler("keyup", this.onKeyUp);
  }

  private onMouseMove(e: MapMouseEvent) {
    if (!this.active) {
      return;
    }
    const nearbyPoint: [number, number] = [
      e.point.x - snapDistancePixels,
      e.point.y,
    ];
    const circleRadiusMeters = this.map
      .unproject(e.point)
      .distanceTo(this.map.unproject(nearbyPoint));
    if (
      this.inner.onMouseMove(e.lngLat.lng, e.lngLat.lat, circleRadiusMeters)
    ) {
      this.redraw();
    }
  }

  private onClick() {
    if (!this.active) {
      return;
    }
    this.inner.onClick();
    this.redraw();
  }

  private onDragStart() {
    if (!this.active) {
      return;
    }
    if (this.inner.onDragStart()) {
      this.map.dragPan.disable();
    }
  }

  private onMouseUp() {
    if (!this.active) {
      return;
    }
    if (this.inner.onMouseUp()) {
      this.map.dragPan.enable();
    }
  }

  private onKeyPress(e: KeyboardEvent) {
    if (!this.active) {
      return;
    }
    if (e.key == "Enter") {
      e.preventDefault();
      this.finish();
    }
  }

  private onKeyDown(e: KeyboardEvent) {
    if (!this.active) {
      return;
    }
    if (e.key == "Shift") {
      e.preventDefault();
      this.inner.setSnapMode(false);
      this.redraw();
    }
  }

  private onKeyUp(e: KeyboardEvent) {
    if (!this.active) {
      return;
    }
    if (e.key == "Shift") {
      e.preventDefault();
      this.inner.setSnapMode(true);
      this.redraw();
    }
  }

  // Activate the tool with blank state.
  startRoute() {
    // If we were already active, don't do anything
    // TODO Or... error? Why'd this happen?
    if (this.active) {
      return;
    }

    this.active = true;
    // Otherwise, shift+click breaks
    this.map["boxZoom"].disable();
  }

  // Activate the tool with blank state.
  startArea() {
    // If we were already active, don't do anything
    // TODO Or... error? Why'd this happen?
    if (this.active) {
      return;
    }

    this.inner.setConfig({ avoid_doubling_back: true, area_mode: true });
    this.active = true;
    // Otherwise, shift+click breaks
    this.map["boxZoom"].disable();
  }

  // Deactivate the tool, clearing all state. No events are fired for addEventListenerFailure.
  stop() {
    this.active = false;
    this.inner.clearState();
    this.redraw();
    this.map["boxZoom"].enable();
  }

  // This takes a GeoJSON feature previously returned. It must have all
  // properties returned originally. If waypoints are missing (maybe because
  // the route was produced by a different tool, or an older version of this
  // tool), the edited line-string may differ from the input.
  editExistingRoute(feature: FeatureWithProps<LineString>) {
    if (this.active) {
      window.alert("Bug: editExistingRoute called when tool is already active");
    }

    if (!feature.properties.waypoints) {
      // Only use the first and last points as waypoints, and assume they're
      // snapped. This only works for the simplest cases.
      feature.properties.waypoints = [
        {
          lon: feature.geometry.coordinates[0][0],
          lat: feature.geometry.coordinates[0][1],
          snapped: true,
        },
        {
          lon: feature.geometry.coordinates[
            feature.geometry.coordinates.length - 1
          ][0],
          lat: feature.geometry.coordinates[
            feature.geometry.coordinates.length - 1
          ][1],
          snapped: true,
        },
      ];
    }

    this.startRoute();
    this.inner.editExisting(feature.properties.waypoints);
    this.redraw();
  }

  // This only handles features previously returned by this tool.
  editExistingArea(feature: FeatureWithProps<Polygon>) {
    if (this.active) {
      window.alert("Bug: editExistingArea called when tool is already active");
    }

    if (!feature.properties.waypoints) {
      window.alert(
        "Bug: editExistingArea called for a polygon not produced by the route-snapper"
      );
    }

    this.startArea();
    this.inner.editExisting(feature.properties.waypoints);
    this.redraw();
  }

  // Destroy resources attached to the map.
  tearDown() {
    // TODO Will these throw if they're not there?
    this.map.removeLayer("route-points");
    this.map.removeLayer("route-lines");
    this.map.removeLayer("route-polygons");
    this.map.removeSource("route-snapper");
    this.events.tearDown();
  }

  addEventListenerSuccessRoute(
    callback: (f: FeatureWithProps<LineString>) => void
  ) {
    this.eventListenersSuccessRoute.push(callback);
  }
  addEventListenerSuccessArea(
    callback: (f: FeatureWithProps<Polygon>) => void
  ) {
    this.eventListenersSuccessArea.push(callback);
  }
  addEventListenerFailure(callback: () => void) {
    this.eventListenersFailure.push(callback);
  }

  isActive(): boolean {
    return this.active;
  }

  // Either a success or failure event will happen, depending on current state
  finish() {
    let rawJSON = this.inner.toFinalFeature();
    if (rawJSON) {
      // Parse once just to check geometry type. But keep parsing the string
      // for each callback, to copy and make sure different callbacks
      // don't have the same reference
      let f = JSON.parse(rawJSON) as Feature;
      if (f.geometry.type == "LineString") {
        for (let cb of this.eventListenersSuccessRoute) {
          cb(JSON.parse(rawJSON) as FeatureWithProps<LineString>);
        }
      } else {
        for (let cb of this.eventListenersSuccessArea) {
          cb(JSON.parse(rawJSON) as FeatureWithProps<Polygon>);
        }
      }
    } else {
      for (let cb of this.eventListenersFailure) {
        cb();
      }
    }
    this.stop();
  }

  // This stops the tool and fires a failure event
  cancel() {
    this.inner.clearState();
    this.finish();
  }

  setRouteConfig(config: { avoid_doubling_back: boolean }) {
    this.inner.setConfig({ ...config, area_mode: false });
    this.redraw();
  }

  private redraw() {
    (this.map.getSource(source) as GeoJSONSource).setData(
      JSON.parse(this.inner.renderGeojson())
    );
  }
}