<script>
  import {
    Table,
    tableMapperValues,
    Drawer,
    drawerStore,
    InputChip,
  } from "@skeletonlabs/skeleton";
  import { writable } from "svelte/store";
  import { onDestroy } from "svelte";

  export let sourceData;
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

  $: unsubscribe = drawerStore.subscribe((value) => {
    if (value.id === "example-3" && value.open == false) {
      isEditing.set(false);
    }
  });

  // Unsubscribe when the component is destroyed
  onDestroy(() => {
    unsubscribe();
  });
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
  const selectedSecret = writable(null);
  let value = [];
  async function selectedHandler(data) {
    const response = await fetch(`/api/secrets/${data.detail[4]}`);
    const { secret } = await response.json();
    selectedSecret.set(secret);
    // Assuming that tags are a comma-separated string in your data
    value = secret.tags;
    drawerStore.open(drawerSettings);
  }

  const isEditing = writable(false);

  function updateSecret() {
    // Update the secret with the modified values from selectedSecret
  }

  function toggleEdit() {
    isEditing.update((val) => !val);
  }
</script>

<Table
  class="m-auto max-w-6xl"
  interactive={true}
  on:selected={selectedHandler}
  source={table}
  columnWidths={[100, 400, 200]}
/>

<Drawer>
  <div class="container mx-auto p-4 relative">
    <label class="label mb-2">
      <span class="mr-2">Username:</span>
      <input
        class="input"
        type="text"
        value={$selectedSecret.username}
        readonly={!$isEditing}
      />
    </label>
    <label class="label mb-2">
      <span class="mr-2">Password:</span>
      <input
        class="input"
        type="password"
        value={$selectedSecret.password}
        readonly={!$isEditing}
      />
    </label>
    <label class="label mb-2">
      <span class="mr-2">Description:</span>
      <textarea
        class="textarea"
        rows="3"
        value={$selectedSecret.description}
        readonly={!$isEditing}
      />
    </label>
    <label class="label mb-2">
      <span class="mr-2">Tags:</span>
      <InputChip name="tags" {value} disabled={!$isEditing} />
    </label>
    <button
      class="btn variant-outline-secondary mt-4 absolute right-4"
      on:click={toggleEdit}>{$isEditing ? "Save" : "Edit"}</button
    >
  </div>
</Drawer>
