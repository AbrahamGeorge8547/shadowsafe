<script>
    import {
      treeStore,
      currentParentNode,
      expandedNodes,
    } from "$lib/store/ui";
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
        const parentId = $currentParentNode;
        await fetch("/api/groups", {
          method: "POST",
          body: JSON.stringify({
            name: folderName,
            parentId,
          }),
        });
        drawerStore.close();
        // Update your treeStore to include the new folder
        const response = await fetch(`/api/groups`);
        const responseJson = await response.json();
        treeStore.set(responseJson.data)
        // Optionally, you might want to expand the parent folder
        expandedNodes.update((nodes) => nodes.add(parentId));
      }
    };
  </script>
  
  <div class="container mx-auto p-4 relative">
    <label class="label mb-2">
      Group  Name :
      <input
        class="input"
        type="text"
        bind:value={folderName}
        on:keydown={addNewFolder}
      />
    </label>
  </div>
  