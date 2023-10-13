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

<div class="flex">
  <div class="flex rounded-md flex-grow">
    <input
      type="search"
      class="variant-filled-surface border-0 rounded-l-lg flex-grow"
      placeholder="Search..."
      id="search-input"
      bind:value={search}
    />
    <div class="flex items-center bg-[#495A8F] rounded-r-lg pr-3">
      <img src="/search.svg" alt="search-icon" />
    </div>
  </div>
</div>
<ul class="w-full !text-xs !font-light bg-[#2E3654]">
  {#each filteredPeoples as person}
    <li
      draggable="true"
      on:dragstart={(e) => handleDragStart(e, person)}
      class="px-2 py-3 !bg-[#262844] w-full flex border-t-[1px] border-[#374165]"
    >
      <Icon
        icon="tabler:user"
        class="text-3xl h-[15px] w-[15px] bg-[#343D5F] rounded-full mr-2 "
      />
      {person.name}
    </li>
  {/each}
</ul>

<style>
  #search-input:focus {
    box-shadow: none;
  }
</style>
