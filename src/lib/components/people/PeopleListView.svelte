<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  let usernames = [];

  onMount(() => {
    fetch("/api/people")
      .then((response) => response.json())
      .then((data) => {
        usernames = data;
      });
  });
  let search = "";
  let filteredPeoples;

  $: filteredPeoples = usernames.filter((person) =>
    person.username.toLowerCase().includes(search.toLowerCase())
  );
  function handleDragStart(event, person) {
    event.dataTransfer.setData("person", JSON.stringify(person));
    search = "";
  }
</script>

<div class="flex w-full h-[50px] border-0 justify-center items-center !border-b-0">
  <div class="w-full flex rounded-full !h-[40px] searchWrapper justify-center items-center border border-[#4C598B4D] mx-2 my-2 !bg-[#262C44]">
    <input
      type="search"
      class="variant-filled-surface border-0 !h-[26px] rounded-l-full !bg-[#262C44] flex-1 font-light text-sm"
      placeholder="Search"
      id="search-input"
      bind:value={search}
    />
    <div class="flex items-center bg-[#262C44] rounded-r-full px-3 justify-center">
      <Icon icon="ic:baseline-search" class="h-6 w-6" color="#4C598B" />
    </div>
  </div>
</div>
<ul class="w-full !text-xs !font-light bg-[#2E3654]">
  {#each filteredPeoples as person}
    <li
      draggable="true"
      on:dragstart={(e) => handleDragStart(e, person)}
      class="px-2 py-3 !bg-[#262C44] w-full flex border-t-[1px] border-[#374165]"
    >
    <span class="rounded-full w-[24px] h-[24px] flex justify-center items-center bg-[#4C598B33] mx-2">
      <Icon
        icon="tabler:user"
        class="text-3xl h-[15px] w-[15px]"
      />
    </span>
    <span class="flex justify-center items-center">
      {person.name}
    </span>
    </li>
  {/each}
</ul>

<style>
  #search-input:focus {
    box-shadow: none;
  }
</style>
