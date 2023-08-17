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

  const sourceData = [
    {
      username: "user1",
      password: "pass1",
      description: "desc1",
      tags: "tag1,tag2",
    },
    {
      username: "user1",
      password: "pass1",
      description: "desc1",
      tags: "tag1",
    },
    {
      username: "user1",
      password: "pass1",
      description: "desc1",
      tags: "tag1",
    },
    {
      username: "user1",
      password: "pass1",
      description: "desc1",
      tags: "tag1",
    },
    // Other secrets...
  ];
  const table = {
    head: ["Username", "description"],
    body: tableMapperValues(sourceData, ["username", "description"]),
    meta: tableMapperValues(sourceData, [
      "username",
      "password",
      "description",
      "tags",
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
  function selectedHandler(data) {
    const details = {
      username: data.detail[0],
      password: data.detail[1],
      description: data.detail[2],
      tags: data.detail[3], // Adjust this according to how your tags are structured
    };
    selectedSecret.set(details);
    // Assuming that tags are a comma-separated string in your data
    value = details.tags.split(",");
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

<style>
  .table-container {
    width: 70%; /* Adjust the width as needed */
    margin: 0 auto; /* Center the container */
  }
</style>
