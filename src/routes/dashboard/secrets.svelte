<script>
  import TableComponent from "./table.component.svelte";
  import DrawerComponent from "./drawer.component.svelte";
  import { writable } from "svelte/store";
  import { drawerStore } from "@skeletonlabs/skeleton";
  export let sourceData;
  const selectedSecret = writable(null);
  let value = [];

  const drawerSettings = {
    id: "example-3",
    bgDrawer: "bg-purple-900 text-white",
    bgBackdrop:
      "bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50",
    width: "w-[280px] md:w-[480px]",
    height: "h-[500px]",
    padding: "p-4",
    rounded: "rounded-xl",
  };

  const isEditing = writable(false);

  async function selectedHandler(data) {
    const response = await fetch(`/api/secrets/${data.detail[4]}`);
    const { secret } = await response.json();
    selectedSecret.set(secret);
    value = secret.tags;
    console.log("opening drawer...");
    drawerStore.open(drawerSettings);
  }

  function toggleEdit() {
    isEditing.update((val) => !val);
  }
</script>

<TableComponent {sourceData} {selectedHandler} />

<DrawerComponent
  {selectedSecret}
  {isEditing}
  {value}
  {drawerSettings}
  {toggleEdit}
/>
