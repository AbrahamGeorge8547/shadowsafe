<script>
  import Item from "./Item.svelte";

  let items = [1, 2, 3];

  function allowDrop(e) {
    e.preventDefault();
  }

  function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    items = [...items, parseInt(data)];
  }
</script>

<div class="drop-zone" on:dragover={allowDrop} on:drop={drop}>
  {#each items as item}
    <Item id={item} />
  {/each}
</div>

<style>
  .drop-zone {
    width: 200px;
    height: 200px;
    border: 2px dashed #ccc;
  }
</style>
