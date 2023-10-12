<script>
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  let listNames = [];
  let search = "";
  let filteredList = [];

  $: filteredList = listNames.filter((group) =>
    group.name.toLowerCase().includes(search.toLowerCase())
  );
  function handleDragStart(event, data) {
    if (value == "Groups") {
      event.dataTransfer.setData("group", true);
      event.dataTransfer.setData("groupData", JSON.stringify(data));
    } else {
      event.dataTransfer.setData("group", false);
      event.dataTransfer.setData("personData", JSON.stringify(data));
    }
    search = "";
  }
  let value = "Groups";
  const getAllGroups = async () => {
    const response = await fetch(`/api/groups`);
    const responseJson = await response.json();
    listNames = responseJson.data.groups;
  };

  const getAllUsers = async () => {
    const respone = await fetch("/api/people");
    const responseJson = await respone.json();
    listNames = responseJson;
  };

  $: if (!import.meta.env.SSR) {
    // Check if running on client
    if (value === "Groups") {
      getAllGroups();
    } else if (value === "Users") {
      getAllUsers();
    }
  }
</script>

<div class="flex">
  <div class="flex rounded-full searchWrapper justify-between border border-[#4C598B4D] ml-2">
    <input
      type="search"
      class="variant-filled-surface border-0 rounded-l-full !bg-[#2E3654] flex-1"
      placeholder="Search..."
      id="search-input"
      on:change={(text) => {
        console.log(text);
      }}
    />
    <div class="flex items-center bg-[#2E3654] rounded-r-full px-3 justify-center">
      <Icon icon="ic:baseline-search" class="h-6 w-6" color="#4C598B" />
    </div>
  </div>
</div>

<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
  <RadioItem bind:group={value} name="justify" value="Users"
    >All Users</RadioItem
  >
  <RadioItem bind:group={value} name="justify" value="Groups">Groups</RadioItem>
</RadioGroup>
<ul class="mt-4 px-3">
  {#each filteredList as element}
    <li
      draggable="true"
      on:dragstart={(e) => handleDragStart(e, element)}
      class="card ml-2 p-2"
    >
      {element.name}
    </li>
  {/each}
</ul>

<style>
  #search-input:focus {
    box-shadow: none;
  }
</style>
