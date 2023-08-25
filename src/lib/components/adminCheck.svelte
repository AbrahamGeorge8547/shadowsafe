<script>
  import { Drawer } from "@skeletonlabs/skeleton";
  import { drawerStore } from "@skeletonlabs/skeleton";

  import LoginForm from "./Login.svelte";
  import CreateAdminForm from "./createAdmin.svelte";
  import { onMount } from "svelte";
  export const loginDrawerSettings = {
    id: "login",
    bgDrawer: "bg-purple-900 text-white",
    bgBackdrop:
      "bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50",
    width: "w-[120px] md:w-[360px]",
    height: "h-[280px]",
    padding: "p-10",
    rounded: "rounded-xl",
  };

  export const adminCreationDrawerSettings = {
    id: "create-admin",
    bgDrawer: "bg-purple-900 text-white",
    bgBackdrop:
      "bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50",
    width: "w-[120px] md:w-[320px]",
    height: "h-[340px]",
    padding: "p-10",
    rounded: "rounded-xl",
    position: "right",
  };

  // You can replace this with logic to determine if an admin exists
  let hasAdmin = true;
  onMount(async () => {
    const result = await fetch("/api/people/hasAdmin");
    await result.json();
    openDrawer();
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

<Drawer class="p-24 top-4">
  {#if $drawerStore.id === "login"}
    <LoginForm />
  {:else if $drawerStore.id === "create-admin"}
    <CreateAdminForm />
  {/if}
</Drawer>

<button class="btn variant-filled-primary mt-4" on:click={openDrawer}
  >{buttonText}</button
>
