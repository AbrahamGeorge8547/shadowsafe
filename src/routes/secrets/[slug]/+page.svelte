<script>
  import { Tabs } from "$lib/components";
  import {
    paginationStore,
    loadSecrets,
    userStore,
    activeTab,
  } from "$lib/store";
  import { Paginator } from "@skeletonlabs/skeleton";
  import { Secrets } from "$lib/components";
  import { goto } from "$app/navigation";
  import { drawerStore } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  export let data;
  async function handlePageChange(e) {
    const offset = e.detail;
    // Navigate to the new URL
    goto(`/secrets/${offset + 1}`);
  }
  //TODO: handle reload for paginator

  async function handleAmountChange(e) {
    paginationStore.update((state) => ({
      ...state,
      offset: 0,
      // limit: e.detail,
    }));
    await loadSecrets(data.fetch);
    // Navigate to the new URL
    goto(`/secrets/1`);
  }
  let pageNo = $page.params.slug;
  onMount(() => {
    activeTab.set("secrets");
    paginationStore.update((state) => ({
      ...state,
      offset: pageNo - 1,
      // limit: e.detail,
    }));
    console.log($userStore.isAdmin);
  });
  const drawerSettings = {
    id: "create-secret",
    bgDrawer: "bg-purple-900 text-white",
    bgBackdrop:
      "bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50",
    width: "w-[200px] md:w-[320px]",
    height: "h-[500px]",
    padding: "p-10",
    rounded: "rounded-xl",
  };
  function openCreateSecretDrawer() {
    drawerStore.open(drawerSettings);
  }
  const drawerFunc = openCreateSecretDrawer;
</script>

<div class="p-4">
  <Tabs {drawerFunc} />
  <div class="p-4">
    <Secrets />
  </div>

  <Paginator
    bind:settings={$paginationStore}
    on:page={handlePageChange}
    on:amount={handleAmountChange}
    showPreviousNextButtons={true}
  />
</div>
