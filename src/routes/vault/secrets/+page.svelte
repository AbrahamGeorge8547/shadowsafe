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
  import { groupList } from "$lib/store/people";
  import {
    createNewFolder,
    createSecretDrawerSettings,
  } from "$lib/util/drawerSettings";
  import { SecretsCard } from "$lib/components/secrets";
  import { GroupListView } from "$lib/components/people";
  import { findNodeById, findParentNodesById } from "$lib/util";
  import Icon from "@iconify/svelte";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  const drawerStore = getDrawerStore();

  export let data;

  let currentNode;

  treeStore.set(data.folder);
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

  function allowDrop(event) {
    event.preventDefault();
  }
  function handleDrop(event) {
    event.preventDefault();

    const personData = event.dataTransfer.getData("person");
    const person = JSON.parse(personData);
    groupList.update((people) => {
      return [...people, person.groupName];
    });
    // Now `person` is available to be added to your folder or whatever structure you have
    // console.log("Dropped:", person);
  }
  let isIconChanged = false;
  let isHidden = false;
  const toggleIcon = () => {
    isIconChanged = !isIconChanged;
    isHidden = !isHidden;
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
      placeholder="Search..."
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
      <div class="flex items-center">
        <h1 class="mr-2">{`${currentNode ? currentNode.label : ""}`}</h1>
        <button on:click={toggleIcon} class="ml-2">
          {#if isIconChanged}
            <Icon icon="ic:baseline-groups" class="text-3xl" />
          {:else}
            <Icon icon="ic:outline-groups" class="text-3xl" />
          {/if}
        </button>
      </div>

      {#if !isHidden}
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
      {/if}
    </div>

    {#if !isHidden}
      <div class="folders-area py-4 border-t-2 rounded-t-xl border-[#235789]">
        <SecretsCard />
      </div>
    {:else}
      <div class="flex">
        <!-- The ul with the $groupList -->
        <div class="w-1/2" on:drop={handleDrop} on:dragover={allowDrop}>
          <ul class="grid grid-cols-3 gap-4">
            {#each $groupList as group}
              <li class="text-center">
                <div class="flex flex-col items-center">
                  <Icon icon="dashicons:groups" class="text-3xl" />
                  <span>{group}</span>
                </div>
              </li>
            {/each}
          </ul>
        </div>

        <!-- The GroupListView -->
        <div class="w-1/2">
          <GroupListView />
        </div>
      </div>
    {/if}
  </div>
</div>
