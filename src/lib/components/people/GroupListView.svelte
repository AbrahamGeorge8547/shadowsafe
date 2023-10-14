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

<div class="bg-[#262C44] rounded-lg">

  <div class="px-3 py-3 mb-2">
    <RadioGroup active="bg-[#4C598B]" hover="hover:bg-[#4C598B33]" border="border border-[#4C598B4D]" class="mb-3" background="bg-[#262C44]">
      <RadioItem bind:group={value} name="justify" value="Users"
        >All Users</RadioItem
      >
      <RadioItem bind:group={value} name="justify" value="Groups">Groups</RadioItem>
    </RadioGroup>
    <h1 class="ml-4 mb-2 text-3xl">All Groups</h1>
    <p class="ml-4 text-xs font-light">Drag and Drop groups from here to access to your folder</p>
  </div>

  <div class="flex w-full h-[50px] border border-[#4C598B4D] justify-center items-center !border-b-0">
    <div class="w-full flex rounded-full !h-[40px] searchWrapper justify-center items-center border border-[#4C598B4D] mx-2 my-2">
      <input
        type="search"
        class="variant-filled-surface border-0 !h-[26px] rounded-l-full !bg-[#262C44] flex-1 font-light text-sm"
        placeholder="Search"
        id="search-input"
        on:change={(text) => {
          console.log(text);
        }}
      />
      <div class="flex items-center bg-[#262C44] rounded-r-full px-3 justify-center">
        <Icon icon="ic:baseline-search" class="h-4 w-4" color="#4C598B" />
      </div>
    </div>
  </div>

  <ul class="w-full !text-xs !font-light">
    {#each filteredList as element}
    <div class="flex justify-center items-center pl-4 border border-[#4C598B4D] border-b-0 py-[6px]">
        <span
        class="rounded-full w-[24px] h-[24px] flex justify-center items-center bg-[#4C598B33] mr-1" >
        {#if value == "Users" }
        <Icon
            icon="tabler:user"
            class="text-3xl h-[15px] w-[15px]"
            color="#fff"
        />
        {:else}
        <Icon
        icon="tabler:users"
        class="text-3xl h-[15px] w-[15px]"
        color="#fff"
        />
        {/if}
        </span>
      <li
        draggable="true"
        on:dragstart={(e) => handleDragStart(e, element)}
        class="px-2 py-3 !bg-[#262C44] w-full"
      >
        {element.name}
      </li>
    </div>
    {/each}
  </ul>

</div>

<style>
  #search-input:focus {
    box-shadow: none;
  }
</style>
