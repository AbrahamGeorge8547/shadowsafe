<script>
  import { TreeView, FoldersView, BreadCrumbs } from "$lib/components/ui";
  import {
    treeStore,
    navigationHistory,
    expandedNodes,
    selectedNodeChildren,
    breadCrumbs,
    currentParentNode,
    editMembers,
  } from "$lib/store/ui";
  import { peopleList } from "$lib/store";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { createNewGroup, createPeopleDrawerSettings } from "$lib/util/drawerSettings";
  import { findNodeById, findParentNodesById } from "$lib/util";
  import Icon from "@iconify/svelte";
  import { PeopleListView, PeopleCard } from "$lib/components/people";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import { get } from "svelte/store";
  import { fade } from "svelte/transition";
  const drawerStore = getDrawerStore();
  const toastStore = getToastStore();
  export let data;
  let currentNode;
  treeStore.set(data.folder);
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

  function allowDrop(event) {
    event.preventDefault();
  }
  let addedUsers = [];
  function handleDrop(event) {
    event.preventDefault();

    const personData = event.dataTransfer.getData("person");
    const person = JSON.parse(personData);
    addedUsers = [...addedUsers, person._id];
    peopleList.update((people) => {
      return [...people, person];
    });
  }
  const addUserstoGroup = async () => {
    const t = {
      message: "user added to group",
      timeout: 2000,
    };
    const groupId = get(currentParentNode);
    await fetch(`/api/groups/${groupId}`, {
      method: "POST",
      body: JSON.stringify({ userIds: addedUsers }),
    });
    editMembers.set(false);
    toastStore.trigger(t);
    addedUsers = [];
  };

  $: {
    //TODO: disable addFolder and editMembers buttons
    if ($currentParentNode != "AllUsers") {
      currentNode = findNodeById($treeStore, $currentParentNode);
    } else {
      currentNode = {
        label: "All Users",
      };
    }
  }

  const addNewFolder = async () => {
    // @ts-ignore
    drawerStore.open(createNewGroup);
  };

  function handleAllUsersClick() {
    currentParentNode.set("AllUsers");
    editMembers.set(false);
  }

  function addMembers() {
    console.log("Adding members");
    drawerStore.open(createPeopleDrawerSettings);
  }

  function cancelEdit() {
    addedUsers = [];
    editMembers.set(false);
  }
</script>

<div class="bread-crumbs-container flex items-center ml-4">
  <button type="button" class="btn-icon btn-icon-sm variant-filled-tertiary m-4" on:click={goBack}>
    <Icon icon="ep:back" />
  </button>
  <div class="flex-box card-hover variant-outline-tertiary rounded-md p-1">
    <BreadCrumbs />
  </div>
</div>

<div class="app-container flex">
  <!-- TreeView on the left -->
  <div
    class="min-w-[250px] max-w-sm h-screen card-hover variant-ringed-tertiary rounded-[4px] shadow-md p-8 ml-16"
  >
    <span
      on:click={handleAllUsersClick}
      class="flex items-center text-lg btn-sm hover:bg-[#34487F] all-users-node"
    >
      <Icon icon="twemoji:file-folder" class="mr-2 text-2xl" />
      <span>All Users</span>
    </span>
    <TreeView nodeId={$treeStore.id} />
  </div>

  <!-- FoldersView on the right -->
  <div class="flex flex-col flex-grow">
    <div class="folders-area flex-grow flex">
      <div
        class="folders-area flex-grow border-2 border-[#235789] rounded-[4px] mx-8 min-w-0"
        on:drop={handleDrop}
        on:dragover={allowDrop}
      >
        <!-- <FoldersView /> -->
        <div class="flex flex-row justify-between px-8 items-center py-6">
          <div>
            <h1>{`${currentNode ? currentNode.label : "All users"}`}</h1>
          </div>
          {#if $currentParentNode != "AllUsers"}
            <div class="flex flex-row">
              {#if !$editMembers}
                <button class="bg-[#4E46DC] px-3 py-1.5 rounded-2xl ml-4" on:click={addNewFolder}
                  >Add Folder</button
                >
              {:else}
                <button class="bg-[#4E46DC] px-3 py-1.5 rounded-2xl ml-4" on:click={cancelEdit}
                  >Cancel</button
                >
              {/if}
              {#if $editMembers}
                <button
                  class="btn variant-filled-tertiary p-2"
                  disabled={addedUsers.length === 0}
                  on:click={addUserstoGroup}
                >
                  save changes</button
                >
              {:else}
                <button
                  class="btn variant-filled-tertiary p-2"
                  on:click={() => editMembers.set(true)}
                >
                  edit members</button
                >
              {/if}
            </div>
          {:else}
            <button class="btn variant-filled-tertiary p-2" on:click={addMembers}>
              add members</button
            >
          {/if}
        </div>
        <div transition:fade class=" py-4 border-t-2 rounded-[4px] border-[#235789]">
          <PeopleCard />
        </div>
      </div>
      {#if $editMembers}
        <div transition:fade class="flex-grow mr-8 max-w-[400px]">
          <PeopleListView />
        </div>
      {/if}
    </div>
  </div>
</div>
