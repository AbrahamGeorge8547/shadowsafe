<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  const dispatch = createEventDispatcher();
  let showPassword = false;
  let showConfirmPassword = false;
  let username = "";
  let password = "";
  let confirmPassword = "";
  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  function toggleConfirmPasswordVisibility() {
    showConfirmPassword = !showConfirmPassword;
  }

  async function createAdmin() {
    // Call your backend API to create an admin.
    // Dispatch an event to notify that the admin was created.
    dispatch("adminCreated");
  }
</script>

<div class="container mx-auto p-4 relative">
  <label class="label mb-2 block">
    <span class="block text-left ml-4">Username:</span>
    <input class="input" type="text" bind:value={username} />
  </label>
  <div class="relative label mb-2">
    <span class="block text-left ml-4">Password:</span>
    {#if showPassword}
      <input class="input" type="text" bind:value={password} />
    {:else}
      <input class="input" type="password" bind:value={password} />
    {/if}
    <button
      on:click={togglePasswordVisibility}
      class="absolute right-2 top-1/2 transform -translate-y-1/4 bg-transparent border-none cursor-pointer p-2"
    >
      <Icon icon="ph:eye-bold" class="text-center" />
    </button>
  </div>

  <div class="relative label mb-2">
    <span class="block text-left ml-4">Confirm Password:</span>
    {#if showConfirmPassword}
      <input class="input" type="text" bind:value={confirmPassword} />
    {:else}
      <input class="input" type="password" bind:value={confirmPassword} />
    {/if}
    <button
      on:click={toggleConfirmPasswordVisibility}
      class="absolute right-2 top-1/2 transform -translate-y-1/4 bg-transparent border-none cursor-pointer p-2"
    >
      <Icon icon="ph:eye-bold" class="text-center" />
    </button>
  </div>
  <label class="label mb-2">
    <button
      class="btn variant-outline-secondary mt-4 float-right"
      on:click={createAdmin}>Create</button
    >
  </label>
</div>
