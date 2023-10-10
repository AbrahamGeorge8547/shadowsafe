<script>
  import {
    treeStore,
    currentParentNode,
    selectedNodeChildren,
    expandedNodes,
  } from "$lib/store/ui";
  import { findNodeById } from "$lib/util";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  const drawerStore = getDrawerStore();
  let folderName;

  const addFolderToTree = (currentNode, parentId, newFolder) => {
    // Base case: if this is the parent we're looking for
    if (currentNode.id === parentId) {
      // Clone the parent and add the new folder to its children
      return {
        ...currentNode,
        children: [...(currentNode.children || []), newFolder],
      };
    }

    // Recursive case: go through all children (if any)
    if (Array.isArray(currentNode.children)) {
      return {
        ...currentNode,
        children: currentNode.children.map((child) =>
          addFolderToTree(child, parentId, newFolder)
        ),
      };
    }

    // If we've reached here, this isn't the parent we're looking for, and it has no children,
    // so just return it as is
    return currentNode;
  };
  const addNewFolder = async (e) => {
    if (folderName && e.key == "Enter") {
      // Assuming currentParentNode is reactive Svelte store
      let parentId = $currentParentNode;
      if ($currentParentNode == "root") {
        parentId = null;
      }
      const response = await fetch("/api/folder", {
        method: "POST",
        body: JSON.stringify({
          label: folderName,
          parent: parentId,
        }),
      });
      const responseJson = await response.json();
      drawerStore.close();
      treeStore.set(responseJson);
      const parentNode = findNodeById($treeStore, parentId);
      selectedNodeChildren.set(parentNode.children);

      // Optionally, you might want to expand the parent folder
      expandedNodes.update((nodes) => nodes.add(parentId));
    }
  };
</script>

<div class="container mx-auto p-4 relative">
  <label class="label mb-2">
    Folder Name :
    <input
      class="input"
      type="text"
      bind:value={folderName}
      on:keydown={addNewFolder}
    />
  </label>
</div>
