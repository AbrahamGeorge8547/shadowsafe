<script>
  import { InputChip } from "@skeletonlabs/skeleton";
  import { loadSecrets } from "$lib/store";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";

  const drawerStore = getDrawerStore();

  let username = "";
  let password = "";
  let description = "";
  let tags = [];

  async function saveSecret() {
    const secret = { username, password, description, tags };
    const response = await fetch("/api/secrets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...secret }),
    });
    drawerStore.close();
    await loadSecrets();
    if (response.ok) {
      // Handle success, close drawer, etc.
    } else {
      // Handle error
    }
  }
  onMount(() => {
    console.log("MOUNTING");
  });
</script>

<div class="container mx-auto p-4 relative">
  <!-- Form Fields Here -->
  <label class="label mb-2"
    >Username: <input class="input" type="text" bind:value={username} /></label
  >
  <label class="label mb-2"
    >Password: <input
      class="input"
      type="password"
      bind:value={password}
    /></label
  >
  <label class="label mb-2"
    >Description: <textarea
      class="textarea"
      rows="3"
      bind:value={description}
    /></label
  >
  <label class="label mb-2"
    >Tags: <InputChip name="tags" bind:value={tags} /></label
  >
  <button
    class="btn variant-outline-secondary mt-4 absolute"
    on:click={saveSecret}>Save</button
  >
</div>
