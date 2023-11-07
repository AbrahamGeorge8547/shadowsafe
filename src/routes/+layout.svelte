<script lang="ts">
  // Most of your app wide CSS should be put in this file
  import "../app.postcss";
  import { AppShell, AppBar } from "@skeletonlabs/skeleton";
  import { initializeStores } from "@skeletonlabs/skeleton";
  import { Toast, Drawer } from "@skeletonlabs/skeleton";
  import { AddSecret } from "$lib/components/secrets";
  import { Login, CreateAdmin, CreatePeople } from "$lib/components/people";
  import { NewFolder, NewGroup, Permissions } from "$lib/components/ui";
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
  import Icon from "@iconify/svelte";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  initializeStores();
  const drawerStore = getDrawerStore();

  let isLoginPage = false;

  $: {
    isLoginPage = $page.route.id === "/";
  }

  onMount(() => {
    isLoginPage = $page.route.id === "/";
    console.log(">>>>>>LoginPage<<<<<<<<<<<<<");
    console.log(isLoginPage);
  });
</script>

<Drawer class="top-14">
  {#if $drawerStore.id === "login"}
    <Login />
  {:else if $drawerStore.id === "create-admin"}
    <CreateAdmin />
  {:else if $drawerStore.id === "create-secret"}
    <AddSecret />
  {:else if $drawerStore.id === "create-people"}
    <CreatePeople />
  {:else if $drawerStore.id === "newFolder"}
    <NewFolder />
  {:else if $drawerStore.id === "newGroup"}
    <NewGroup />
  {:else if $drawerStore.id === "permissions"}
    <Permissions />
  {/if}
</Drawer>
<Toast />
<!-- App Shell -->
<AppShell>
  <!-- App Bar -->

  {#if !isLoginPage}
    <div class=" flex flex-1 items-center">
      <div class="flex items-center mx-12">
        <img src="/logo.svg" alt="Logo" class="h-9 w-9" />
        <!-- Logo Image -->
        <span class="text-2xl font-normal">
          shadow<span class="font-medium">safe</span>
        </span>
      </div>
      <div class="w-[80%] border-l-[1px] border-[#323A5A] py-6">
        <div
          class="flex searchWrapper justify-between rounded-lg !w-[50%] !bg-[#2E3654] ml-12"
        >
          <div
            class="flex items-center bg-[#2E3654] rounded-full px-3 justify-center"
          >
            <Icon
              icon="ic:baseline-search"
              class="h-6 w-6 rounded-lg"
              color="#828CAE"
            />
          </div>
          <input
            type="search"
            class="variant-filled-surface border-0 rounded-lg !bg-[#2E3654] flex-1"
            placeholder="Find secrets, folders, groups, people"
            id="search-input"
            on:change={(text) => {
              console.log(text);
            }}
          />
        </div>
      </div>
    </div>
  {:else}
    <div />
  {/if}
  <!-- Page Route Content -->
  <slot />
</AppShell>
