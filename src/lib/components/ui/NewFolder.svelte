<script>
  import {
    treeStore,
    currentParentNode,
    selectedNodeChildren,
    expandedNodes,
  } from "$lib/store/ui";
  import { findNodeById } from "$lib/util";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
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
      await fetch("/api/folder", {
        method: "POST",
        body: JSON.stringify({
          label: folderName,
          parent: parentId,
        }),
      });
      fetch(`/api/folder`)
        .then((response) => response.json())
        .then((responseJson) => {
          const fakeParent = {
            id: "root",
            label: "Vault",
            children: responseJson.body.data.folders,
          };
          treeStore.set(fakeParent);
        });
      drawerStore.close();
    }
  };
</script>

<div class="container h-full mx-auto p-4 relative bg-[#2E3654] flex flex-col justify-around ">
    <div class="text-3xl flex justify-between">
      <h1>Add Folder</h1>
      <Icon icon="iconamoon:close-bold" class="" color="#4C598B"/>
    </div>
    <input
      class="input !bg-[#2E3654]"
      type="text"
      placeholder="Vault"
      bind:value={folderName}
      on:keydown={addNewFolder}
    />
    <!-- <button on:click={addNewFolder} class="bg-[#4E46DC] rounded-3xl w-1/2 py-2 px-2 text-md self-center">Add folder</button> -->
</div>
