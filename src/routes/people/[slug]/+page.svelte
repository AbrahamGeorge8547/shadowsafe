<script>
  import { Tabs } from "$lib/components";
  import { activeTab, peoplePaginationStore, loadPeople } from "$lib/store";
  import { People } from "$lib/components";
  import { Paginator } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { getDrawerStore } from "@skeletonlabs/skeleton";

  const drawerStore = getDrawerStore();
  export let data;
  async function handlePageChange(e) {
    const offset = e.detail;
    // Navigate to the new URL
    goto(`/people/${offset + 1}`);
  }
  //TODO: handle reload for paginator

  async function handleAmountChange(e) {
    peoplePaginationStore.update((state) => ({
      ...state,
      offset: 0,
      // limit: e.detail,
    }));
    await loadPeople(data.fetch);
    // Navigate to the new URL
    goto(`/people/1`);
  }
  let pageNo = $page.params.slug;
  onMount(() => {
    activeTab.set("people");

    peoplePaginationStore.update((state) => ({
      ...state,
      offset: pageNo - 1,
      // limit: e.detail,
    }));
  });
</script>

<div class="p-4">
  <Tabs />
  <div class="p-4">
    <People />
  </div>

  <Paginator
    bind:settings={$peoplePaginationStore}
    on:page={handlePageChange}
    on:amount={handleAmountChange}
    showPreviousNextButtons={true}
  />
</div>
