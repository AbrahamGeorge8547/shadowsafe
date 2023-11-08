<script lang="ts">
  import { groupList } from "$lib/store/group";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  const drawerStore = getDrawerStore();
  let groupName: string;
  const addNewGroup = async (e: any) => {
    if (groupName && e.key === "Enter") {
      fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: groupName,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            // Handle the error case
            throw new Error("Error posting the new group.");
          }
          drawerStore.close();
          // Fetch the updated list of groups
          return fetch("/api/groups");
        })
        .then((response) => {
          if (!response.ok) {
            // Handle the error case
            throw new Error("Error fetching the groups list.");
          }
          return response.json();
        })
        .then((responseJson) => {
          groupList.set(responseJson.data);
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
  };
</script>

<div
  class="container h-full mx-auto p-4 relative bg-[#2E3654] flex flex-col justify-around"
>
  <div class="text-3xl flex justify-between">
    <h1>Add Group</h1>
    <Icon icon="iconamoon:close-bold" class="" color="#4C598B" />
  </div>
  <input
    class="input !bg-[#2E3654]"
    type="text"
    placeholder="Group"
    bind:value={groupName}
    on:keydown={addNewGroup}
  />
  <!-- <button on:click={addNewFolder} class="bg-[#4E46DC] rounded-3xl w-1/2 py-2 px-2 text-md self-center">Add Group</button> -->
</div>
