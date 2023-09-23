<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  const drawerStore = getDrawerStore();
  const dispatch = createEventDispatcher();
  let showPassword = false;
  let showConfirmPassword = false;
  let username = "";
  let password = "";
  let confirmPassword = "";
  let passwordError = false;

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  function toggleConfirmPasswordVisibility() {
    showConfirmPassword = !showConfirmPassword;
  }

  async function createAdmin() {
    if (password !== confirmPassword) {
      passwordError = true;
      return;
    }
    await fetch("/api/people/admin", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    passwordError = false;
    // Call your backend API to create an admin.
    // Dispatch an event to notify that the admin was created.
    drawerStore.close();
    dispatch("adminCreated");
  }
</script>

<div class="container mx-auto p-4 relative">
  <label class="label mb-2 block">
    Username: <input class="input" type="text" bind:value={username} />
  </label>
  <div class="relative label mb-2">
    Password:
    {#if showPassword}
      <input class="input" type="text" bind:value={password} />
    {:else}
      <input class="input" type="password" bind:value={password} />
    {/if}
    <button
      on:click={togglePasswordVisibility}
      class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer p-2"
    >
      <Icon icon="ph:eye-bold" />
    </button>
  </div>
  <div class="relative label mb-2">
    Confirm Password:
    {#if showConfirmPassword}
      <input class="input" type="text" bind:value={confirmPassword} />
    {:else}
      <input class="input" type="password" bind:value={confirmPassword} />
    {/if}
    <button
      on:click={toggleConfirmPasswordVisibility}
      class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer p-2"
    >
      <Icon icon="ph:eye-bold" />
    </button>
  </div>
  {#if passwordError}
    <div class="text-red-500">Passwords do not match</div>
  {/if}
  <label class="label mb-2">
    <button
      class="btn variant-outline-secondary mt-4 float-right"
      on:click={createAdmin}>Create</button
    >
  </label>
</div>
