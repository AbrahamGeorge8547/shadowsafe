<script>
  const groupNames = [
    {
      id: "6519318f73e491105e8e348b",
      groupName: "IronMan Suit Users",
      parentId: "6519278473e491105e8e3461",
      children: [],
    },
    {
      id: "6519319e73e491105e8e348c",
      groupName: "Team Cap",
      parentId: "6519278473e491105e8e3461",
      children: [],
    },
    {
      id: "651931b973e491105e8e348d",
      groupName: "Team IronMan",
      parentId: "6519278473e491105e8e3461",
      children: [],
    },
    {
      id: "651931de73e491105e8e348e",
      groupName: "Asgardians",
      parentId: "6519278473e491105e8e3461",
      children: [
        {
          id: "651934b873e491105e8e3493",
          groupName: "Valkyries",
          parentId: "651931de73e491105e8e348e",
          children: [],
        },
      ],
    },
    {
      id: "6519349f73e491105e8e3491",
      groupName: "S.H.I.E.L.D agents",
      parentId: "6519278473e491105e8e3461",
      children: [],
    },
    {
      id: "651934ab73e491105e8e3492",
      groupName: "Spies of Natasha",
      parentId: "6519278473e491105e8e3461",
      children: [],
    },
    {
      id: "6519352673e491105e8e3494",
      groupName: "Wakandans",
      parentId: "6519278473e491105e8e3461",
      children: [],
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
