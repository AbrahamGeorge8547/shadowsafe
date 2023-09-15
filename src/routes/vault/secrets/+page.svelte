<script>
  import { TreeView } from "$lib/components";
  import {
    treeStore,
    navigationHistory,
    expandedNodes,
    selectedNodeChildren,
    breadCrumbs,
    currentParentNode,
  } from "$lib/store/ui";
  import {
    createNewFolder,
    createSecretDrawerSettings,
  } from "$lib/util/drawerSettings";
  import { BreadCrumbs, SecretsCard } from "$lib/components";
  import { findNodeById, findParentNodesById } from "$lib/util";
  import Icon from "@iconify/svelte";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  const drawerStore = getDrawerStore();

  let currentNode;
  const tree = {
    id: 1,
    label: "VAULT",
    children: [
      {
        id: 2,
        parentId: 1,
        label: "UAT",
        children: [
          { id: 3, parentId: 2, label: "DB" },
          {
            id: 4,
            label: "USERNAMES",
            parentId: 2,
            children: [
              { id: 6, parentId: 4, label: "Admin" },
              { id: 8, parentId: 4, label: "corporate-admin" },
              { id: 7, parentId: 4, label: "spenders" },
            ],
          },
          { id: 5, parentId: 2, label: "KAFKA" },
        ],
      },
      {
        parentId: 1,
        id: 9,
        label: "STAGE",
        children: [
          { id: 10, parentId: 9, label: "DB" },
          { id: 11, parentId: 9, label: "USER NAMES" },
          { id: 12, parentId: 9, label: "KAFKA" },
        ],
      },
    ],
  };
  treeStore.set(tree);
  $: {
    currentNode = findNodeById($treeStore, $currentParentNode);
  }

  const goBack = () => {
    navigationHistory.update((history) => {
      // Remove the last node from the history
      const lastNode = history.pop();
      if (lastNode) {
        const node = findNodeById($treeStore, lastNode.parentId);
        const parents = findParentNodesById($treeStore, lastNode.parentId);
        currentParentNode.set(node.id);
        expandedNodes.update((nodes) => {
          nodes.add(lastNode.id);
          return new Set(nodes);
        });
        breadCrumbs.set(parents);

        // Update the selectedNodeChildren based on the parent of the lastNode

        selectedNodeChildren.set(node.children || []);
      }

      return history;
    });
  };
  const createSecret = async () => {
    drawerStore.open(createSecretDrawerSettings);
  };
  const addNewFolder = async () => {
    // @ts-ignore
    drawerStore.open(createNewFolder);
  };
</script>

<div class="bread-crumbs-container flex items-center ml-4">
  <button
    type="button"
    class="btn-icon btn-icon-sm variant-filled-tertiary m-4"
    on:click={goBack}
  >
    <Icon icon="ep:back" />
  </button>
  <div class="flex-box card-hover variant-outline-tertiary rounded-md p-1">
    <BreadCrumbs />
  </div>
</div>
<div class="flex justify-end px-14 mb-4">
  <div class="flex rounded-md">
    <input
      type="search"
      class="variant-filled-surface border-0 rounded-l-lg"
      placeholder="search..."
      id="search-input"
      on:change={(text) => {
        console.log(text);
      }}
    />
    <div class="flex items-center bg-[#495A8F] rounded-r-lg pr-3">
      <img src="/search.svg" alt="search-icon" />
    </div>
  </div>
</div>

<div class="app-container flex">
  <!-- TreeView on the left -->
  <div
    class="flex-none flex-shrink-0 flex-grow-0 min-w-[250px] max-w-sm card-hover variant-ringed-tertiary rounded-xl shadow-md p-8 ml-16 self-start"
  >
    <TreeView nodeId={$treeStore.id} />
  </div>

  <!-- FoldersView on the right -->
  <div
    class="flex flex-col flex-grow h-4/5 border-2 border-[#235789] rounded-xl mx-8"
  >
    <div class="flex flex-row justify-between px-8 items-center py-6">
      <div>
        <h1>{`${currentNode ? currentNode.label : ""}`}</h1>
      </div>
      <div class="flex flex-row">
        <button
          class="bg-[#4E46DC] px-3 py-1.5 rounded-2xl"
          on:click={createSecret}>Add Secret</button
        >
        <button
          class="bg-[#4E46DC] px-3 py-1.5 rounded-2xl ml-4"
          on:click={addNewFolder}>Add Folder</button
        >
      </div>
    </div>
    <div class="folders-area py-4 border-t-2 rounded-t-xl border-[#235789]">
      <SecretsCard />
    </div>
  </div>
</div>

<style>
  #search-input:focus {
    box-shadow: none;
  }
  h1 {
    font-size: 24px;
    font-weight: normal;
  }
</style>
