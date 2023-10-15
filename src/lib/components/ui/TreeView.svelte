<script>
  import {
    selectedNodeChildren,
    currentParentNode,
    breadCrumbs,
    treeStore,
    expandedNodes,
  } from "$lib/store/ui";
  const _expansionState = {};
  import Icon from "@iconify/svelte";

  import { findNodeById, findParentNodesById } from "$lib/util/index";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  export let nodeId;
  let tree;
  let id, label, children, parentId;
  $: if (nodeId) {
    tree = findNodeById($treeStore, nodeId);
    if (tree) {
      ({ id, label, children, parentId } = tree);
    }
  }
  onMount(() => {
    console.log(label, "dsfasd");
    if (label === "Vault") {
      expandedNodes.update((nodes) => {
        nodes.add($currentParentNode);
        isExpanded = true;
        return new Set(nodes);
      });

      expandedNodes.subscribe((nodes) => {
        isExpanded = nodes.has($currentParentNode);
      });
      expanded = _expansionState[$currentParentNode] = !expanded;
    }
  });

  let isExpanded = false;

  let expanded = label ? _expansionState[id] : false;
  const handleNodeClick = () => {
    expandedNodes.update((nodes) => {
      if (nodes.has(id)) {
        nodes.delete(id);
        isExpanded = false;
      } else {
        nodes.add(id);
        isExpanded = true;
      }
      return new Set(nodes);
    });

    expandedNodes.subscribe((nodes) => {
      isExpanded = nodes.has(id);
    });
    currentParentNode.set(id);
    const parentNodes = findParentNodesById($treeStore, id);
    breadCrumbs.set(parentNodes);
    if (children) {
      selectedNodeChildren.set(children);
    } else {
      selectedNodeChildren.set([]);
    }

    toggleExpansion();
  };
  const toggleExpansion = () => {
    if (id) {
      expanded = _expansionState[id] = !expanded;
    }
  };
</script>

<div transition:fade>
  <ul>
    <li class="mb-2 mt-2 relative">
      <!-- Add this div for the vertical line -->
      <div
        class={`absolute left-4 top-16 bottom-0 ${
          expanded && isExpanded ? "border-l border-[#323A5A]" : ""
        }`}
      />
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span
        on:click={handleNodeClick}
        class={`flex items-center text-lg btn-sm ml-auto rounded ${
          $currentParentNode === id ? "selected-node" : "hoverItem"
        }`}
      >
        <!-- Hide caret if no children -->
        {#if expanded}
          <Icon icon="ph:caret-up-bold" class="mr-1 text-[16px]" />
        {:else}
          <Icon icon="ph:caret-down-bold" class="mr-1 text-[16px]" />
        {/if}
        <Icon
          icon="ph:folder"
          class="mr-2 text-2xl"
          color={`${$currentParentNode === id ? "#fff" : "#828CAE"}`}
        />
        <span
          class={`${
            $currentParentNode === id ? "text-[#fff]" : "text-[#828CAE]"
          } w-[152px] text-lg`}>{label}</span
        >
      </span>
      {#if isExpanded && children}
        <div class="pl-4">
          {#each children as child}
            <svelte:self nodeId={child.id} />
          {/each}
        </div>
      {/if}
    </li>
  </ul>
</div>

<style>
  .selected-node {
    background: #2e3654;
    border: 1px solid #374165;
    border-radius: 4px;
  }
  .hoverItem:hover {
    border: 1px solid #374165;
    border-radius: 4px;
  }
</style>
