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
    NewFolder,
    AddSecret,
  } from "$lib/components";
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from "@floating-ui/dom";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import { storePopup } from "@skeletonlabs/skeleton";
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  initializeStores();
  const drawerStore = getDrawerStore();
</script>

<Drawer class="p-24 top-14">
  {#if $drawerStore.id === "login"}
    <Login />
  {:else if $drawerStore.id === "create-admin"}
    <CreateAdmin />
  {:else if $drawerStore.id === "secrets"}
    <ViewSecret />
  {:else if $drawerStore.id === "create-secret"}
    <AddSecret />
  {:else if $drawerStore.id === "create-people"}
    <CreatePeople />
  {:else if $drawerStore.id === "newFolder"}
    <NewFolder />
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
