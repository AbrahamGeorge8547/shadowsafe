<script lang="ts">
  // Most of your app wide CSS should be put in this file
  import "../app.postcss";
  import { AppShell, AppBar } from "@skeletonlabs/skeleton";
  import { initializeStores } from "@skeletonlabs/skeleton";
  import { Toast, Drawer } from "@skeletonlabs/skeleton";
  import {
    Login,
    CreateAdmin,
    ViewSecret,
    CreateSecret,
    CreatePeople,
  } from "$lib/components";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  initializeStores();
  const drawerStore = getDrawerStore();
</script>

<Drawer class="p-24 top-4">
  {#if $drawerStore.id === "login"}
    <Login />
  {:else if $drawerStore.id === "create-admin"}
    <CreateAdmin />
  {:else if $drawerStore.id === "secrets"}
    <ViewSecret />
  {:else if $drawerStore.id === "create-secret"}
    <CreateSecret />
  {:else if $drawerStore.id === "create-people"}
    <CreatePeople />
  {/if}
</Drawer>
<Toast />
<!-- App Shell -->
<AppShell>
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <img src="/logo.svg" alt="Logo" class="h-6 w-6 inline-block" />
        <!-- Logo Image -->
        <span class="text-xl">
          shadow<span class="font-bold">safe</span>
        </span>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <!-- Page Route Content -->
  <slot />
</AppShell>
