<script>
  const usernames = [
    {
      id: 1,
      username: 'abrahamgeorge8547@gmail.com',
      selected: false,
    },
    {
      id: 2,
      username: 'john.doe@example.com',
      selected: false,
    },
    {
      id: 3,
      username: 'jane.doe@example.com',
      selected: false,
    },
    {
      id: 4,
      username: 'sally.smith@example.com',
      selected: false,
    },
    {
      id: 5,
      username: 'michael.jones@example.com',
      selected: false,
    },
    {
      id: 6,
      username: 'emily.williams@example.com',
      selected: false,
    },
    {
      id: 7,
      username: 'jack.brown@example.com',
      selected: false,
    },
    {
      id: 8,
      username: 'linda.johnson@example.com',
      selected: false,
    },
    {
      id: 9,
      username: 'mark.wilson@example.com',
      selected: false,
    },
    {
      id: 10,
      username: 'jennifer.davis@example.com',
      selected: false,
    },
    {
      id: 11,
      username: 'elizabeth.miller@example.com',
      selected: false,
    },
    {
      id: 12,
      username: 'david.moore@example.com',
      selected: false,
    },
    {
      id: 13,
      username: 'barbara.taylor@example.com',
      selected: false,
    },
    {
      id: 14,
      username: 'james.anderson@example.com',
      selected: false,
    },
    {
      id: 15,
      username: 'mary.thomas@example.com',
      selected: false,
    },
    {
      id: 16,
      username: 'patricia.jackson@example.com',
      selected: false,
    },
    {
      id: 17,
      username: 'robert.white@example.com',
      selected: false,
    },
    {
      id: 18,
      username: 'margaret.harris@example.com',
      selected: false,
    },
    {
      id: 19,
      username: 'lisa.clark@example.com',
      selected: false,
    },
    {
      id: 20,
      username: 'betty.lewis@example.com',
      selected: false,
    },
    {
      id: 21,
      username: 'sandra.hall@example.com',
      selected: false,
    },
    {
      id: 22,
      username: 'dorothy.young@example.com',
      selected: false,
    },
    {
      id: 23,
      username: 'ashley.king@example.com',
      selected: false,
    },
    {
      id: 24,
      username: 'paul.wright@example.com',
      selected: false,
    },
    {
      id: 25,
      username: 'karen.scott@example.com',
      selected: false,
    },
    {
      id: 26,
      username: 'nancy.green@example.com',
      selected: false,
    },
    {
      id: 27,
      username: 'donald.adams@example.com',
      selected: false,
    },
    {
      id: 28,
      username: 'ruth.carter@example.com',
      selected: false,
    },
    {
      id: 29,
      username: 'kimberly.mitchell@example.com',
      selected: false,
    },
    {
      id: 30,
      username: 'jeffrey.campbell@example.com',
      selected: false,
    },
  ];
  let search = '';
  let filteredPeoples;

  $: filteredPeoples = usernames.filter((person) =>
    person.username.toLowerCase().includes(search.toLowerCase()),
  );
  function handleDragStart(event, person) {
    2;
    event.dataTransfer.setData('person', JSON.stringify(person));
    search = '';
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
    <li draggable="true" on:dragstart={(e) => handleDragStart(e, person)}>
      {person.username}
    </li>
  {/each}
</ul>

<style>
  #search-input:focus {
    box-shadow: none;
  }
</style>
