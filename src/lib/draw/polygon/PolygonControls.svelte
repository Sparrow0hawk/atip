<script lang="ts">
  import CollapsibleCard from "../../common/CollapsibleCard.svelte";
  import KeyHandler from "../KeyHandler.svelte";
  import { PolygonTool } from "./polygon_tool";

  export let polygonTool: PolygonTool;
</script>

<CollapsibleCard label="Help">
  <ul>
    <li><b>Click</b> the map to add a vertex</li>
    <li><b>Click</b> a vertex to delete it</li>
    <li><b>Drag</b> a vertex or the polygon to move it</li>
    <li>Press <b>Enter</b> or <b>double click</b> to finish</li>
    <li>Press <b>Escape</b> to cancel</li>
  </ul>
</CollapsibleCard>

<div style="display: flex; justify-content: space-between">
  <button type="button" on:click={() => polygonTool.finish()}>Finish</button>
  <button type="button" on:click={() => polygonTool.cancel()}>Cancel</button>
</div>
<KeyHandler tool={polygonTool} />
