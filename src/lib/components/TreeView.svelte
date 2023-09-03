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
  } from "$lib/store/ui";
  import { findParentNodesById } from "$lib/util/index";
  export let tree;
  let id, label, children, parentId;
  if (tree) {
    ({ id, label, children, parentId } = tree);
  }

  let expanded = label ? _expansionState[label] : false;
  const handleNodeClick = () => {
    currentParentNode.set(label);
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

<ul class="pl-1">
  <li>
    <span on:click={handleNodeClick} class="flex items-center">
      {#if expanded}
        <Icon icon="twemoji:file-folder" class="mr-2" />
      {:else}
        <Icon icon="twemoji:file-folder" class="mr-2" />
      {/if}
      <span>{label}</span>
    </span>
    {#if expanded && children}
      {#each children as child}
        <svelte:self tree={child} />
      {/each}
    {/if}
  </li>
</ul>
