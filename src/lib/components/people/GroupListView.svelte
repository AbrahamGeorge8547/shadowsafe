<script>
  const groupNames = [
    {
      id: 1,
      groupName: "test",
      selected: false,
    },
    {
      id: 2,
      groupName: "qa",
      selected: false,
    },
    {
      id: 3,
      groupName: "L1-Support",
      selected: false,
    },
    {
      id: 4,
      groupName: "L2-Support",
      selected: false,
    },
    {
      id: 5,
      groupName: "Team Leads",
      selected: false,
    },
    {
      id: 6,
      groupName: "PMs",
      selected: false,
    },
    {
      id: 7,
      groupName: "Customer Success",
      selected: false,
    },
    {
      id: 8,
      groupName: "Corporate Admins",
      selected: false,
    },
    {
      id: 9,
      groupName: "T3",
      selected: false,
    },
    {
      id: 10,
      groupName: "T2",
      selected: false,
    },
    {
      id: 11,
      groupName: "T1",
      selected: false,
    },
  ];
  let search = "";
  let filteredPeoples;

  $: filteredPeoples = groupNames.filter((person) =>
    person.groupName.toLowerCase().includes(search.toLowerCase())
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
      {person.groupName}
    </li>
  {/each}
</ul>

<style>
  #search-input:focus {
    box-shadow: none;
  }
</style>
