<script>
  import { Tabs } from "$lib/components";
  import { activeTab, peoplePaginationStore, loadPeople } from "$lib/store";
  import { People } from "$lib/components";
  import { Paginator } from "@skeletonlabs/skeleton";
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
    console.log($peoplePaginationStore);
    await loadPeople(data.fetch);
    // Navigate to the new URL
    goto(`/people/1`);
  }
</script>

<Tabs />

<People />
<Paginator
  bind:settings={$peoplePaginationStore}
  on:page={handlePageChange}
  on:amount={handleAmountChange}
  showPreviousNextButtons={true}
/>
