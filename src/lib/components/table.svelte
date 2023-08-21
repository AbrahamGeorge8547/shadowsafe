<script>
  import { Table, tableMapperValues } from "@skeletonlabs/skeleton";
  import { secretsStore, selectedSecret } from "$lib/store";
  import { drawerStore, Drawer } from "@skeletonlabs/skeleton";
  import { DrawerComponent, CreateSecret } from ".";

  const drawerSettings = {
    id: "secrets",
    bgDrawer: "bg-purple-900 text-white",
    bgBackdrop:
      "bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50",
    width: "w-[280px] md:w-[480px]",
    height: "h-[500px]",
    padding: "p-4",
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
  function openCreateSecretDrawer() {
    drawerStore.open({ ...drawerSettings, id: "create-secret" });
  }
  async function selectedHandler(data) {
    const response = await fetch(`/api/secrets/${data.detail[4]}`);
    const { secret } = await response.json();
    selectedSecret.set(secret);
    drawerStore.open(drawerSettings);
  }
</script>

<button
  class="btn variant-outline-secondary mt-4 absolute right-4"
  on:click={openCreateSecretDrawer}
>
  Create Secret
</button>

<Table
  class="m-auto max-w-6xl"
  interactive={true}
  on:selected={selectedHandler}
  source={table}
  columnWidths={[100, 400, 200]}
/>

<Drawer>
  {#if $drawerStore.id === "secrets"}
    <DrawerComponent />
  {:else if $drawerStore.id === "create-secret"}
    <CreateSecret />
  {/if}
</Drawer>
