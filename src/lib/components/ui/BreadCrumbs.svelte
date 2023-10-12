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
    currentParentNode.set(node.id);
    breadCrumbs.set(parentNodes);
    // Function to handle breadcrumb clicks.
    // You'll set the current folder and refresh the breadcrumbs here.
  };
</script>

<div class="border border-[#4C598B4D] px-3 py-3 rounded-lg">
  <ol class="breadcrumb">
    {#each $breadCrumbs as node, index (node.id)}
      <li class="crumb">
        <span class="anchor cursor-pointer" on:click={() => handleClick(node)}>
          {node.label}
        </span>
      </li>
      {#if index < $breadCrumbs.length - 1}
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
      {/if}
    {/each}
  </ol>
</div>
