<script lang="ts">
  import { userSettings } from "../../../stores";
  import CollapsibleCard from "../../common/CollapsibleCard.svelte";
  import KeyHandler from "../KeyHandler.svelte";
  import { RouteTool } from "./route_tool";

  export let routeTool: RouteTool;
  // Start with this enabled or disabled, based on whether we're drawing a new
  // route or editing an existing.
  export let extendRoute: boolean;

  // TODO When editing, we should save in the route and use the previous value
  $: routeTool.setRouteConfig({
    avoid_doubling_back: $userSettings.avoidDoublingBack,
    extend_route: extendRoute,
  });

  // TODO Show if shift is held or not
  // TODO Disable finish when the route is invalid
</script>

<CollapsibleCard label="Help">
  <ul>
    <li>
      <b>Click</b> green points on the transport network to create snapped routes
    </li>
    <li>Hold <b>Shift</b> to draw a point anywhere</li>
    <li><b>Click and drag</b> any point to move it</li>
    <li><b>Click</b> a red waypoint to delete it</li>
    <li>Press <b>Enter</b> or <b>double click</b> to finish</li>
    <li>Press <b>Escape</b> to cancel</li>
  </ul>
</CollapsibleCard>

<label title="Keep clicking to add more points to the end of the route">
  <input type="checkbox" bind:checked={extendRoute} />
  Add points to end
</label>

<br />

<label
  title="Try to make the route avoid using the same streets with multiple waypoints"
>
  <input type="checkbox" bind:checked={$userSettings.avoidDoublingBack} />
  Avoid doubling back
</label>

<div style="display: flex; justify-content: space-between">
  <button type="button" on:click={() => routeTool.finish()}>Finish</button>
  <button type="button" on:click={() => routeTool.cancel()}>Cancel</button>
</div>
<KeyHandler tool={routeTool} />
