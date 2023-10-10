<script>
  import { groupList } from "$lib/store/people";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  const drawerStore = getDrawerStore();
  let folderName;
  const addNewFolder = async (e) => {
    if (folderName && e.key == "Enter") {
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

<div class="container mx-auto p-4 relative">
  <label class="label mb-2">
    Group Name :
    <input
      class="input"
      type="text"
      bind:value={folderName}
      on:keydown={addNewFolder}
    />
  </label>
</div>
