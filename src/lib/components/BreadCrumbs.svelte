<script>
  import {
    breadCrumbs,
    currentParentNode,
    selectedNodeChildren,
    treeStore,
  } from "$lib/store/ui";
  import { findParentNodesById } from "$lib/util";

  const handleClick = (node) => {
    selectedNodeChildren.set(node.children || []);
    const parentNodes = findParentNodesById($treeStore, node.id);
    breadCrumbs.set(parentNodes);
    // Function to handle breadcrumb clicks.
    // You'll set the current folder and refresh the breadcrumbs here.
  };
</script>

<div>
  {#each $breadCrumbs as node, index (node.id)}
    <span
      class="cursor-pointer text-blue-600"
      on:click={() => handleClick(node)}
    >
      {node.label}
    </span>
    {#if index < $breadCrumbs.length - 1}
      <span class="mx-2">/</span>
    {/if}
  {/each}
</div>
