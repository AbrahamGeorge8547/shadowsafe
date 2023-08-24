<script>
  import { Table, tableMapperValues } from "@skeletonlabs/skeleton";
  import { secretsStore, selectedSecret, activeTab } from "$lib/store";
  import { drawerStore, Drawer } from "@skeletonlabs/skeleton";
  import { DrawerComponent, CreateSecret } from ".";

  const drawerSettings = {
    id: "secrets",
    bgDrawer: "bg-purple-900 text-white",
    bgBackdrop:
      "bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50",
    width: "w-[200px] md:w-[360px]",
    height: "h-[400px]",
    padding: "p-10",
    rounded: "rounded-xl",
  };
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
    drawerStore.open(drawerSettings);
  }
  $: {
    console.log("ACTIVE TAB", $activeTab);
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
<Drawer>
  {#if $drawerStore.id === "secrets"}
    <DrawerComponent />
  {:else if $drawerStore.id === "create-secret"}
    <CreateSecret />
  {/if}
</Drawer>
