<script>
  import {
    selectedNodeChildren,
    navigationHistory,
    currentParentNode,
  } from "$lib/store/ui";
  import { findNodeById, findParentNodesById } from "$lib/util";
  import { treeStore, breadCrumbs } from "$lib/store/ui";

  const handleFolderClick = (folder) => {
    console.log(`Clicked folder with ID: ${folder.id}, Label: ${folder.label}`);
    currentParentNode.set(folder.label);
    navigationHistory.update((history) => {
      history.push(folder);
      return [...history];
    });
    const parentNodes = findParentNodesById($treeStore, folder.id);
    breadCrumbs.set(parentNodes);
    selectedNodeChildren.set(folder.children || []);
  };

  const goBack = () => {
    navigationHistory.update((history) => {
      // Remove the last node from the history
      const lastNode = history.pop();

      const node = findNodeById($treeStore, lastNode.parentId);
      currentParentNode.set(node.label);
      // Update the selectedNodeChildren based on the parent of the lastNode
      if (lastNode) {
        selectedNodeChildren.set(node.children || []);
      }

      return history;
    });
  };
</script>

<div class="p-4">
  {#if $navigationHistory.length > 1}
    <button class="text-xl font-semibold mb-4 cursor-pointer" on:click={goBack}
      >Back</button
    >
  {/if}

  <h2 class="text-2xl font-semibold mb-4">
    {$currentParentNode ? $currentParentNode : "Root"}
  </h2>

  {#each $selectedNodeChildren as folder}
    <span
      class="text-lg card card-hover p-4 ml-8 cursor-pointer"
      on:click={() => handleFolderClick(folder)}
    >
      {folder.label}
    </span>
  {/each}
</div>
