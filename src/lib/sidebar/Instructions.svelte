<script lang="ts">
  import Modal from "../common/Modal.svelte";

  export let open: boolean;
</script>

<Modal title="Instructions" bind:open>
  <h2>Drawing objects on the map</h2>
  <p>
    Use the tools on right to sketch new objects on the map. Each tool has
    instructions that appear when you click on its icon.
  </p>
  <p>
    Modify existing objects on the map using <b>Edit geometry</b> and clicking something.
  </p>

  <h2>Filling out data</h2>
  <p>
    <b>Edit attributes</b> mode allows selecting and adding attributes to objects
    that appear on the left.
  </p>

  <h2>Saving files</h2>
  <p>
    ATIP does not send any data over the network or store your data in the
    cloud. The current file you're editing will be saved in your browser's local
    storage and automatically resume when you return to the page. The <b
      >Export to GeoJSON</b
    >
    and <b>Load from GeoJSON</b> buttons save and load GeoJSON files (with a
    <i>.txt</i> file extension) to your computer. You share these files with others
    to collaborate on designs.
  </p>
</Modal>
