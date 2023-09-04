<script>
  import {
    selectedNodeChildren,
    navigationHistory,
    currentParentNode,
    expandedNodes,
  } from "$lib/store/ui";
  import Icon from "@iconify/svelte";
  import { findNodeById, findParentNodesById } from "$lib/util";

  import { treeStore, breadCrumbs } from "$lib/store/ui";
  import { onMount } from "svelte";

  const handleFolderClick = (folder) => {
    console.log(`Clicked folder with ID: ${folder.id}, Label: ${folder.label}`);
    currentParentNode.set(folder.label);
    navigationHistory.update((history) => {
      history.push(folder);
      return [...history];
    });
    const parentNodes = findParentNodesById($treeStore, folder.id) || [];
    expandedNodes.update((currentSet) => {
      currentSet.add(folder.id);
      for (const parent of parentNodes) {
        currentSet.add(parent.id);
      }
      return currentSet;
    });
    breadCrumbs.set(parentNodes);
    selectedNodeChildren.set(folder.children || []);
  };
  onMount(() => {
    const startNode = findNodeById($treeStore, 1);
    selectedNodeChildren.set(startNode.children);
    breadCrumbs.set([startNode]);
  });
</script>

<input
  type="search"
  class="rounded-2xl variant-filled-surface ml-14"
  placeholder="search..."
/>
<div class="p-4 grid grid-cols-8">
  {#each $selectedNodeChildren as folder}
    <div
      class="text-center cursor-pointer transform transition-transform duration-200 hover:scale-110"
      on:click={() => handleFolderClick(folder)}
    >
      <Icon icon="twemoji:file-folder" class="text-6xl m-auto" />
      <!-- Larger icon -->
      <span class="block mt-1 text-lg">{folder.label}</span>
      <!-- Reduced margin between label and icon, Larger label text -->
    </div>
  {/each}
</div>
