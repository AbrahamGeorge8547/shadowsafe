<script lang="ts">
  import { TreeView, BreadCrumbs } from "$lib/components/ui";
  import {
    treeStore,
    navigationHistory,
    expandedNodes,
    selectedNodeChildren,
    breadCrumbs,
    currentParentNode,
  } from "$lib/store/ui";
  import { createNewFolder, createSecretDrawerSettings } from "$lib/util/drawerSettings";
  import { SecretsCard } from "$lib/components/secrets";
  import { findNodeById, findParentNodesById } from "$lib/util";
  import Icon from "@iconify/svelte";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import { AccessList } from "$lib/components/ui";
  const drawerStore = getDrawerStore();

  export let data;

  let currentNode;
  const fakeParent = {
    id: "root",
    label: "Vault",
    children: data.folders,
  };
  treeStore.set(fakeParent);

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
    drawerStore.open(createNewFolder);
  };

  let isIconChanged = false;
  let isHidden = false;
  const toggleIcon = () => {
    isIconChanged = !isIconChanged;
    isHidden = !isHidden;
  };

  $: {
    currentNode = findNodeById($treeStore, $currentParentNode);
  }
</script>

<div class="bread-crumbs-container flex justify-start items-center ml-8">
  <div class="flex items-center mt-5">
    <button
      class="bg-[#2D3552] px-[27.5px] py-2.5 rounded-full ml-4 flex justify-center items-center text-[#828CAE]"
      on:click={addNewFolder}
    >
      Add Folder
      <Icon icon="ic:round-plus" color="#828CAE" class="h-5 w-5 ml-1 mt-[1px]" />
    </button>
    <div class="rounded-full h-11 w-11 bg-[#2D3552] justify-center items-center p-2.5 ml-2.5">
      <!-- Add refresh function here -->
      <button>
        <Icon icon="bx:refresh" color="#828CAE" class="h-6 w-6 mt-[1px] rounded" />
      </button>
    </div>
    <BreadCrumbs />
  </div>
</div>

<div class="app-container flex">
  <div
    class="flex-none flex-shrink-0 flex-grow-0 min-w-[250px] max-w-sm card-hover variant-ringed-tertiary rounded-[4px] shadow-md p-8 ml-16 self-start"
  >
    <TreeView nodeId={$treeStore.id} />
  </div>
  <div class="flex flex-col flex-grow h-4/5 rounded-[4px] mx-8 bg-[#2E3654] relative">
    <div class="flex flex-row justify-between px-8 items-center py-6">
      <div class="flex">
        <div class="flex items-center mr-4">
          <h1 class="mr-2 text-4xl">{`${currentNode ? currentNode.label : ""}`}</h1>
          <button on:click={toggleIcon} class="ml-2">
            {#if isIconChanged}
              <Icon icon="ic:baseline-groups" class="text-3xl" />
            {:else}
              <Icon icon="ic:outline-groups" class="text-3xl" />
            {/if}
          </button>
        </div>

        <!-- Share button -->
        <button
          class="bg-[#3F4766] px-4 py-1.5 rounded-full flex justify-center items-center text-[#828CAE] mr-4"
          on:click={() => console.log("Share")}
        >
          <Icon icon="tdesign:share" class="h-[14px] w-[14px] mr-2" />
          Share
        </button>

        <!-- Search component -->
        <div class="flex rounded-full searchWrapper justify-between">
          <input
            type="search"
            class="variant-filled-surface border-0 rounded-l-full !bg-[#2E3654] flex-1"
            placeholder="Search..."
            id="search-input"
            on:change={(text) => {
              console.log(text);
            }}
          />
          <div class="flex items-center bg-[#2E3654] rounded-r-full px-3 justify-center">
            <Icon icon="ic:baseline-search" class="h-6 w-6" color="#4C598B" />
          </div>
        </div>
      </div>
      {#if !isHidden}
        <div class="flex flex-row">
          <button
            class="bg-[#4E46DC] px-3 py-1.5 rounded-2xl flex justify-center items-center"
            on:click={createSecret}
            >Add new secret
            <Icon icon="ic:round-plus" class="h-5 w-5 ml-1" />
          </button>
        </div>
      {/if}
    </div>

    {#if !isHidden}
      <div class="folders-area mt-6">
        <SecretsCard />
      </div>
    {:else}
      <AccessList />
    {/if}
  </div>
</div>

<style>
  .searchWrapper {
    border: 1px solid #374165;
    width: 306px;
    /* border-radius: 4px; */
  }
</style>
