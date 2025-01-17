import * as Comlink from "comlink";
import type { Feature, LineString } from "geojson";
import init, { RouteInfo as RouteInfoWasm } from "route_info";
import type { Waypoint } from "./types";

/* This wraps the Rust/WASM API in the route_info crate, exposing it as a web
 * worker. Svelte components shouldn't directly use the WASM API because:
 *
 * - Initially loading a file can be slow, and blocking the main thread is bad UX
 * - We may want to later switch to calling a remote API over the network. Using
 *   a web worker now immediately forces us to have an async API everywhere.
 */
export class RouteInfo {
  inner: RouteInfoWasm | null;

  constructor() {
    this.inner = null;
  }

  async loadFile(url: string) {
    await init();
    console.log(`Grabbing A/B Street map model data from ${url}`);
    let resp = await fetch(url);
    let mapBytes = await resp.arrayBuffer();
    this.inner = new RouteInfoWasm(new Uint8Array(mapBytes));
    console.log(`RouteInfo is ready!`);
  }

  nameForRoute(linestring: Feature<LineString>): string {
    if (!this.inner) {
      throw new Error(
        "Still loading route info, please retry after a few seconds"
      );
    }

    return this.inner.nameForRoute(linestring);
  }

  speedLimitForRoute(waypoints: Waypoint[]): string {
    if (!this.inner) {
      throw new Error(
        "Still loading route info, please retry after a few seconds"
      );
    }

    return this.inner.speedLimitForRoute(waypoints);
  }

  allSpeedLimits(): string {
    if (!this.inner) {
      throw new Error(
        "Still loading route info, please retry after a few seconds"
      );
    }

    return this.inner.allSpeedLimits();
  }

  renderLaneDetailsForRoute(waypoints: Waypoint[]): string[] {
    if (!this.inner) {
      throw new Error(
        "Still loading route info, please retry after a few seconds"
      );
    }
    // Normally this code doesn't parse the results at all, but at least unpack the 4 strings
    return JSON.parse(this.inner.renderLaneDetailsForRoute(waypoints));
  }
}

Comlink.expose(RouteInfo);
