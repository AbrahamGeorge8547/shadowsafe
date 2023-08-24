<script>
  import { Table, tableMapperValues } from "@skeletonlabs/skeleton";
  import { peopleStore, selectedPerson } from "$lib/store";
  import { Drawer } from "@skeletonlabs/skeleton";
  import { CreatePeople } from ".";

  $: sourceData = $peopleStore;
  $: table = {
    head: ["Username", "tags"],
    body: tableMapperValues(sourceData, ["username", "tags"]),
    meta: tableMapperValues(sourceData, ["username", "password", "id", "tags"]),
  };

  function selectedHandler(data) {}
</script>

<Table
  class="m-auto max-w-6xl"
  interactive={true}
  on:selected={selectedHandler}
  source={table}
  columnWidths={[100, 400, 200]}
/>

<Drawer>
  <CreatePeople />
</Drawer>
