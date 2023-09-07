<script>
  export let id;
  let dragged = false;

  function dragStart(e) {
    dragged = true;
    e.dataTransfer.setData("text/plain", id);
  }

  function dragEnd() {
    dragged = false;
  }
</script>

<div
  class="item {dragged ? 'dragging' : ''}"
  draggable="true"
  on:dragstart={dragStart}
  on:dragend={dragEnd}
>
  Item {id}
</div>

<style>
  .item {
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
  }
  .dragging {
    opacity: 0.5;
  }
</style>
