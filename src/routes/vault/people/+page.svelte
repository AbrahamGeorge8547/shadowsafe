<script>
  import { TreeView, FoldersView } from '$lib/components';
  import {
    treeStore,
    navigationHistory,
    expandedNodes,
    selectedNodeChildren,
    breadCrumbs,
    currentParentNode,
  } from '$lib/store/ui';
  import { peopleList } from '$lib/store';
  import { BreadCrumbs, SecretsCard } from '$lib/components';
  import { createNewFolder } from '$lib/util/drawerSettings';
  import { findNodeById, findParentNodesById } from '$lib/util';
  import Icon from '@iconify/svelte';
  import { PeopleListView } from '$lib/components';
  import People from '$lib/components/people.svelte';
  import { getDrawerStore } from '@skeletonlabs/skeleton';
  const drawerStore = getDrawerStore();
  let currentNode;
  const tree = {
    id: 1,
    label: 'Groups',
    children: [
      {
        id: 2,
        parentId: 1,
        label: 'Team1',
        children: [
          { id: 3, parentId: 2, label: 'dev' },
          {
            id: 4,
            label: 'testers',
            parentId: 2,
            children: [
              { id: 6, parentId: 4, label: 'Admin' },
              { id: 8, parentId: 4, label: 'corporate-admin' },
              { id: 7, parentId: 4, label: 'spenders' },
            ],
          },
          { id: 5, parentId: 2, label: 'qa' },
        ],
      },
      {
        parentId: 1,
        id: 9,
        label: 'Team2',
        children: [
          { id: 10, parentId: 9, label: 'devs' },
          { id: 11, parentId: 9, label: 'testers' },
          { id: 12, parentId: 9, label: 'qa' },
        ],
      },
    ],
  };
  treeStore.set(tree);
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
  function handleDrop(event) {
    event.preventDefault();

    const personData = event.dataTransfer.getData('person');
    const person = JSON.parse(personData);
    peopleList.update((people) => {
      return [...people, person];
    });
    console.log($peopleList);
    // Now `person` is available to be added to your folder or whatever structure you have
    // console.log("Dropped:", person);
  }

  treeStore.set(tree);
  $: {
    currentNode = findNodeById($treeStore, $currentParentNode);
  }

  const addNewFolder = async () => {
    // @ts-ignore
    drawerStore.open(createNewFolder);
  };
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
    class="min-w-[250px] max-w-sm h-screen card-hover variant-ringed-tertiary rounded-xl shadow-md p-8 ml-16"
  >
    <TreeView nodeId={$treeStore.id} />
  </div>

  <!-- FoldersView on the right -->
  <div class="flex flex-col flex-grow">
    <div class="folders-area flex-grow flex">
      <div
        class="folders-area flex-grow border-2 border-[#235789] rounded-xl mx-8 min-w-0"
        on:drop={handleDrop}
        on:dragover={allowDrop}
      >
        <!-- <FoldersView /> -->
        <div class="flex flex-row justify-between px-8 items-center py-6">
          <div>
            <h1>{`${currentNode ? currentNode.label : ''}`}</h1>
          </div>
          <div class="flex flex-row">
            <button class="bg-[#4E46DC] px-3 py-1.5 rounded-2xl ml-4" on:click={addNewFolder}
              >Add Folder</button
            >
          </div>
        </div>
        <div class=" py-4 border-t-2 rounded-xl border-[#235789]">
          <ul class="list">
            {#each $peopleList as people}
              <li class="card ml-2 p-4">
                {people.username}
              </li>
            {/each}
          </ul>
        </div>
      </div>
      <div class="flex-grow mr-8 max-w-[400px]">
        <PeopleListView />
      </div>
    </div>
  </div>
</div>
