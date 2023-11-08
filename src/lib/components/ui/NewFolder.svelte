<script lang="ts">
  import { folderStore } from "$lib/store/folder";
  import { findNodeById } from "$lib/util";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  const drawerStore = getDrawerStore();
  let folderName: string;
  let description: string;

  const addNewFolder = async () => {
    fetch("/api/folder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: folderName,
        description: description,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          // Handle the error case
          throw new Error("Network response was not ok.");
        }
        return fetch("/api/folder"); // Fetch the updated list of folders
      })
      .then((response) => {
        if (!response.ok) {
          // Handle the error case
          throw new Error("Network response was not ok when fetching folders.");
        }
        return response.json();
      })
      .then((data) => {
        folderStore.set(data); // Update your store with the new list of folders
        drawerStore.close();
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };
</script>

<div
  class="container h-full mx-auto p-4 relative bg-[#2E3654] flex flex-col justify-around space-y-4"
>
  <div class="text-3xl text-white flex justify-between items-center">
    <h1>Add Folder</h1>
    <Icon icon="iconamoon:close-bold" class="text-[#4C598B]" />
  </div>
  <input
    class="input bg-[#2E3654] text-white border border-gray-700 rounded-lg p-2"
    type="text"
    placeholder="Folder Name"
    bind:value={folderName}
  />
  <input
    class="input bg-[#2E3654] text-white border border-gray-700 rounded-lg p-2"
    type="text"
    placeholder="Folder Description"
    bind:value={description}
  />
  <button
    on:click={addNewFolder}
    class="bg-blue-600 hover:bg-blue-700 rounded-full w-1/2 py-2 px-4 text-md text-white self-center transition duration-150 ease-in-out"
  >
    Add Folder
  </button>
</div>
