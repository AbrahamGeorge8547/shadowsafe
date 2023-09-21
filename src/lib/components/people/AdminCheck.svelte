<script>
  import { getDrawerStore } from "@skeletonlabs/skeleton";

  const drawerStore = getDrawerStore();

  import { onMount } from "svelte";
  import { userStore } from "$lib/store";
  import { get } from "svelte/store";
  import { goto } from "$app/navigation";
  import {
    loginDrawerSettings,
    adminCreationDrawerSettings,
  } from "$lib/util/drawerSettings";

  let hasAdmin = true;
  onMount(async () => {
    const user = get(userStore);
    if (user.email) {
      goto("/vault/secrets");
    } else {
      const result = await fetch("/api/people/hasAdmin");
      await result.json();
      openDrawer();
    }
  });
  let buttonText = "Login";

  // Function to open login or admin creation drawer
  function openDrawer() {
    let settings;

    if (hasAdmin) {
      settings = loginDrawerSettings;
      buttonText = "Login";
    } else {
      settings = adminCreationDrawerSettings;
      buttonText = "Create Admin";
    }
    drawerStore.open(settings);
  }
</script>

<button class="btn variant-filled-primary mt-4" on:click={openDrawer}
  >{buttonText}</button
>
