<script>
  import { groupList } from "$lib/store/people";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  const drawerStore = getDrawerStore();
  let folderName;
  const addNewFolder = async (e) => {
    if (folderName && e.key == "Enter") {
      console.log('Enter pressed')
      await fetch("/api/groups", {
        method: "POST",
        body: JSON.stringify({
          name: folderName,
          userAccess: [],
        }),
      });
      drawerStore.close();
      // Update your treeStore to include the new folder
      const response = await fetch(`/api/groups`);
      const responseJson = await response.json();
      groupList.set(responseJson.data.groups);
    }
  };
</script>



<div class="container h-full mx-auto p-4 relative bg-[#2E3654] flex flex-col justify-between ">
  <div class="text-3xl flex justify-between">
    <h1>Add Group</h1>
    <Icon icon="iconamoon:close-bold" class="" color="#4C598B"/>
  </div>
  <input
    class="input !bg-[#2E3654]"
    type="text"
    placeholder="Group"
    bind:value={folderName}
    on:keydown={addNewFolder}
  />
  <button on:click={addNewFolder} class="bg-[#4E46DC] rounded-3xl w-1/2 py-2 px-2 text-md self-center">Add Group</button>
</div>

