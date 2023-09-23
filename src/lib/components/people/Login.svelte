<script>
  import { userStore } from "$lib/store";
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import { getDrawerStore } from "@skeletonlabs/skeleton";

  const drawerStore = getDrawerStore();

  let username = "";
  let password = "";
  let showPassword = false;
  let errorMessage = "";

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  async function login() {
    // Call your backend API to create an admin.
    // Dispatch an event to notify that the admin was created.
    const response = await fetch("/api/people/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const responseData = await response.json();
    if (responseData.success == false) {
      errorMessage = "Username/password is incorrect."; // Set the error message
      return;
    }
    const token = responseData.data.token;
    userStore.set(responseData.data.user);
    const isProduction = process.env.NODE_ENV === "production";
    const secureFlag = isProduction ? "Secure;" : "";
    const sameSite = isProduction ? "None" : "Lax"; // Use 'Lax' in development

    if (isProduction && location.protocol !== "https:") {
      console.warn(
        "SameSite=None requires HTTPS. Please ensure your production environment uses HTTPS."
      );
    }

    document.cookie = `token=${token}; path=/; ${secureFlag} SameSite=${sameSite}`;

    drawerStore.close();
    goto("/vault/secrets");
    // dispatch("adminCreated");
  }
</script>

<div class="mx-auto p-4 relative px-8 z-10">
  <label class="label mb-2 block">
    <span class="block text-left">Username:</span>
    <input class="input h-10 pl-4" type="text" bind:value={username} />
    <!-- Added h-12 for height -->
  </label>
  <div class="relative label mb-2">
    <span class="block text-left">Password:</span>
    {#if showPassword}
      <input class="input h-10 pl-4" type="text" bind:value={password} />
      <!-- Added h-12 for height -->
    {:else}
      <input class="input h-10 pl-4" type="password" bind:value={password} />
      <!-- Added h-12 for height -->
    {/if}
    <button
      on:click={togglePasswordVisibility}
      class="absolute right-2 top-1/2 transform -translate-y-1/4 bg-transparent border-none cursor-pointer p-2 text-center"
    >
      <Icon icon="ph:eye-bold" />
    </button>
  </div>
  {#if errorMessage}
    <div class="input-error">
      {errorMessage}
    </div>
  {/if}
  <label class="label mb-2">
    <button
      class="btn variant-outline-secondary mt-4 float-right"
      on:click={login}>Login</button
    >
  </label>
</div>
