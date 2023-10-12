<script>
  import { onMount } from "svelte";

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
<ul class="mt-4 px-3">
  {#each filteredPeoples as person}
    <li
      draggable="true"
      on:dragstart={(e) => handleDragStart(e, person)}
      class="card ml-2 p-2"
    >
      {person.username}
    </li>
  {/each}
</ul>

<style>
  #search-input:focus {
    box-shadow: none;
  }
</style>
