<script lang="ts">
  import type { Polygon } from "geojson";
  import {
    currentMode,
    formOpen,
    gjScheme,
    newFeatureId,
  } from "../../../stores";
  import type { Feature, Mode } from "../../../types";
  import type { EventHandler } from "../event_handler";
  import type { PolygonTool } from "./polygon_tool";
  import PolygonControls from "./PolygonControls.svelte";

  const thisMode = "free-polygon";

  export let changeMode: (m: Mode) => void;
  export let polygonTool: PolygonTool;
  export let eventHandler: EventHandler;

  export function start() {
    polygonTool.setHandlers(eventHandler);
    polygonTool.startNew();
  }
  export function stop() {
    polygonTool.stop();
  }

  polygonTool.addEventListenerSuccess((feature) => {
    if ($currentMode == thisMode) {
      gjScheme.update((gj) => {
        feature.id = newFeatureId(gj);
        feature.properties.intervention_type = "area";
        gj.features.push(feature as Feature<Polygon>);
        return gj;
      });

      changeMode("edit-attribute");
      formOpen.set(feature.id as number);
    }
  });

  polygonTool.addEventListenerFailure(() => {
    if ($currentMode == thisMode) {
      changeMode("edit-attribute");
    }
  });
</script>

{#if $currentMode == thisMode}
  <PolygonControls {polygonTool} />
{/if}
