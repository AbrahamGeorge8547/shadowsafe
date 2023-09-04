<script context="module">
  import Icon from "@iconify/svelte";
  const _expansionState = {};
</script>

<script>
  import {
    selectedNodeChildren,
    navigationHistory,
    currentParentNode,
    breadCrumbs,
    treeStore,
    expandedNodes,
  } from "$lib/store/ui";
  import { findNodeById, findParentNodesById } from "$lib/util/index";
  export let nodeId;
  let tree;
  let id, label, children, parentId;
  $: if (nodeId) {
    tree = findNodeById($treeStore, nodeId);
    if (tree) {
      ({ id, label, children, parentId } = tree);
    }
  }
  let isExpanded = false;

  let expanded = label ? _expansionState[label] : false;
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
    navigationHistory.update((history) => {
      history.push({ id, label, children, parentId });
      return history;
    });
    const parentNodes = findParentNodesById($treeStore, id);
    breadCrumbs.set(parentNodes);
    if (children) {
      selectedNodeChildren.set(children);
    } else {
      console.log(`Leaf node clicked with ID: ${id}`);
      selectedNodeChildren.set([]);
    }

    toggleExpansion();
  };
  const toggleExpansion = () => {
    if (label) {
      expanded = _expansionState[label] = !expanded;
    }
  };
  const logChildren = (node) => {
    if (!node.children) return [];

    return node.children.map((child) => {
      return {
        id: child.id,
        label: child.label,
        children: child.children,
      };
    });
  };
</script>

<ul class="ml-2">
  <li class="mb-2 mt-2">
    <span
      on:click={handleNodeClick}
      class="flex items-center card-hover text-lg btn-sm"
    >
      {#if expanded}
        <Icon icon="twemoji:file-folder" class="mr-2 text-2xl" />
      {:else}
        <Icon icon="twemoji:file-folder" class="mr-2 text-2xl" />
      {/if}
      <span>{label}</span>
    </span>
    {#if isExpanded && children}
      {#each children as child}
        <svelte:self nodeId={child.id} />
      {/each}
    {/if}
  </li>
</ul>
