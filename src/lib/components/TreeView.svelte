<script context="module">
  import Icon from "@iconify/svelte";
  const _expansionState = {};
</script>

<script>
  import { selectedNodeChildren } from "$lib/store/ui";
  export let tree;
  let id, label, children;
  if (tree) {
    ({ id, label, children } = tree);
  }

  let expanded = label ? _expansionState[label] : false;

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

  const handleNodeClick = () => {
    expanded = !expanded;
    if (id !== undefined) {
      console.log(`Clicked node with ID: ${id}`);
    }
    if (children) {
      const childData = logChildren(tree);
      selectedNodeChildren.set(childData);
      console.log("Children Data: ", childData);
    } else {
      selectedNodeChildren.set([]);
    }
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
