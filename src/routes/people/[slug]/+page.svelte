<script>
  import { Tabs } from "$lib/components";
  import { activeTab, peoplePaginationStore, loadPeople } from "$lib/store";
  import { People } from "$lib/components";
  import { Paginator, drawerStore } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";
  export let data;
  async function handlePageChange(e) {
    const offset = e.detail;
    // Navigate to the new URL
    goto(`/people/${offset + 1}`);
  }
  //TODO: handle reload for paginator

  async function handleAmountChange(e) {
    console.log($peoplePaginationStore);
    peoplePaginationStore.update((state) => ({
      ...state,
      offset: 0,
      // limit: e.detail,
    }));
    await loadPeople(data.fetch);
    // Navigate to the new URL
    goto(`/people/1`);
  }
  const drawerSettings = {
    bgDrawer: "bg-purple-900 text-white",
    bgBackdrop:
      "bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50",
    width: "w-[200px] md:w-[340px]",
    height: "h-[460px]",
    padding: "p-10",
    rounded: "rounded-xl",
  };
  function openAddPeopleDrawer() {
    drawerStore.open({ ...drawerSettings, id: "create-people" });
  }
  const drawerFunc = openAddPeopleDrawer;
</script>

<div class="p-4">
  <Tabs {drawerFunc} />
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
