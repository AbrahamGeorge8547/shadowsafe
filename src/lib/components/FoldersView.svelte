<script>
  import {
    selectedNodeChildren,
    navigationHistory,
    currentParentNode,
    expandedNodes,
  } from "$lib/store/ui";
  import Icon from "@iconify/svelte";
  import { findNodeById, findParentNodesById } from "$lib/util";
  import {
    createNewFolder,
    createSecretDrawerSettings,
  } from "$lib/util/drawerSettings";
  import { treeStore, breadCrumbs } from "$lib/store/ui";
  import { onMount } from "svelte";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  const drawerStore = getDrawerStore();
  const handleFolderClick = (folder) => {
    console.log(`Clicked folder with ID: ${folder.id}, Label: ${folder.label}`);
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
    currentParentNode.set(folder.id);
    selectedNodeChildren.set(folder.children || []);
  };
  onMount(() => {
    const startNode = findNodeById($treeStore, 1);
    selectedNodeChildren.set(startNode.children);
    breadCrumbs.set([startNode]);
    currentParentNode.set(startNode.id);
  });
  function addNewFolder() {
    drawerStore.open(createNewFolder);
  }

  const createSecret = async () => {
    drawerStore.open(createSecretDrawerSettings);
  };
</script>

<input
  type="search"
  class="rounded-2xl variant-filled-surface ml-14"
  placeholder="search..."
/>

<button class="btn-md variant-filled" on:click={createSecret}>Add Secret</button
>
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
<div class="fixed bottom-0 right-0 p-4">
  <button
    on:click={addNewFolder}
    class="btn-icon btn-icon-sm variant-filled-tertiary m-4"
  >
    <Icon icon="codicon:new-folder" />
  </button>
</div>
