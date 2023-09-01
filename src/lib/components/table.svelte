<script>
  import { Table, tableMapperValues } from "@skeletonlabs/skeleton";
  import { secretsStore, selectedSecret, activeTab } from "$lib/store";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import { getSecretsDrawer } from "$lib/util/drawerSettings";

  const drawerStore = getDrawerStore();

  $: sourceData = $secretsStore;
  $: table = {
    head: ["Username", "description", "id"],
    body: tableMapperValues(sourceData, ["username", "description", "id"]),
    meta: tableMapperValues(sourceData, [
      "username",
      "password",
      "description",
      "tags",
      "id",
    ]),
  };
  async function selectedHandler(data) {
    const response = await fetch(`/api/secrets/${data.detail[4]}`);
    const { secret } = await response.json();
    selectedSecret.set(secret);
    drawerStore.open(getSecretsDrawer);
    console.log($drawerStore);
  }
</script>

<div class="content-container flex flex-col">
  <Table
    class="m-auto max-w-6xl"
    interactive={true}
    on:selected={selectedHandler}
    source={table}
    columnWidths={[100, 400, 200]}
  />
</div>
