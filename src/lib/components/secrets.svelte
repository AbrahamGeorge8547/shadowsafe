<script>
  import TableComponent from "./table.svelte";
  import DrawerComponent from "./drawer.svelte";
  import { selectedSecret } from "$lib/store";
  import { writable } from "svelte/store";
  import { drawerStore } from "@skeletonlabs/skeleton";
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
    drawerStore.open(drawerSettings);
  }

  function toggleEdit() {
    isEditing.update((val) => !val);
  }
</script>

<TableComponent {selectedHandler} />

<DrawerComponent {isEditing} {value} {drawerSettings} {toggleEdit} />
