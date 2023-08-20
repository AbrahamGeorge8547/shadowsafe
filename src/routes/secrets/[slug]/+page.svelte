<script>
  import { Tabs } from "$lib/components";
  import { paginationStore, secretsStore, loadSecrets } from "$lib/store";
  import { Paginator } from "@skeletonlabs/skeleton";
  import { Secrets } from "$lib/components";
  import { goto } from "$app/navigation";
  import { tick } from "svelte";
  export let data;
  $: {
    if (data) {
      console.log(data.page, "dsfasdf");
      secretsStore.set(data.secrets);
      paginationStore.update((state) => ({
        ...state,
        size: data.size,
        offset: data.page,
      }));
      console.log($paginationStore);
    }
  }
  async function handlePageChange(e) {
    const offset = e.detail;
    paginationStore.update((state) => ({ ...state, offset }));
    // Navigate to the new URL
    goto(`/secrets/${offset + 1}`);
  }
  async function handleAmountChange(e) {
    paginationStore.update((state) => ({
      ...state,
      offset: 0,
      limit: e.detail,
    }));
    await loadSecrets(data.fetch);
    // Navigate to the new URL
    goto(`/secrets/1`);
  }
</script>

<Tabs />
<Secrets />
<Paginator
  bind:settings={$paginationStore}
  on:page={handlePageChange}
  on:amount={handleAmountChange}
  showPreviousNextButtons={true}
/>
