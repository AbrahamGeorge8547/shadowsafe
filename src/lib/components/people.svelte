<script>
  import { Table, tableMapperValues } from "@skeletonlabs/skeleton";
  import { peopleStore, selectedPerson } from "$lib/store";
  import { drawerStore, Drawer } from "@skeletonlabs/skeleton";
  import { CreatePeople } from ".";

  const drawerSettings = {
    id: "people",
    bgDrawer: "bg-purple-900 text-white",
    bgBackdrop:
      "bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50",
    width: "w-[280px] md:w-[480px]",
    height: "h-[500px]",
    padding: "p-4",
    rounded: "rounded-xl",
  };
  $: sourceData = $peopleStore;
  $: table = {
    head: ["Username"],
    body: tableMapperValues(sourceData, ["username"]),
    meta: tableMapperValues(sourceData, ["username", "password", "id"]),
  };
  function openCreateSecretDrawer() {
    drawerStore.open({ ...drawerSettings, id: "create-secret" });
  }
  function selectedHandler(data) {}
</script>

<button
  class="btn variant-outline-secondary mt-4 absolute right-4"
  on:click={openCreateSecretDrawer}
>
  Add People
</button>

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
