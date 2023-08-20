<script>
  import { Tabs } from "$lib/components";
  import { paginationStore, loadSecrets } from "$lib/store";
  import { Paginator } from "@skeletonlabs/skeleton";
  import { Secrets } from "$lib/components";
  import { goto } from "$app/navigation";
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
</script>

<div class="p-4">
  <Tabs />
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
