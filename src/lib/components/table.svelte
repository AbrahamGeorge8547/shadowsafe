<script>
  import { Table, tableMapperValues } from "@skeletonlabs/skeleton";
  import { secretsStore } from "$lib/store";
  $: sourceData = $secretsStore;
  export let selectedHandler;
  $: table = {
    head: ["Username", "description"],
    body: tableMapperValues(sourceData, ["username", "description"]),
    meta: tableMapperValues(sourceData, [
      "username",
      "password",
      "description",
      "tags",
      "id",
    ]),
  };
</script>

<Table
  class="m-auto max-w-6xl"
  interactive={true}
  on:selected={selectedHandler}
  source={table}
  columnWidths={[100, 400, 200]}
/>
