<script>
  import { Table, tableMapperValues } from "@skeletonlabs/skeleton";
  export let sourceData;
  export let onSelected;

  const table = {
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
  on:selected={onSelected}
  source={table}
  columnWidths={[100, 400, 200]}
/>
