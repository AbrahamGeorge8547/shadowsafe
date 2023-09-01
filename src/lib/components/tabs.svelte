<script>
  import { goto } from "$app/navigation";
  import { activeTab } from "$lib/store";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import {
    createSecretDrawerSettings,
    createPeopleDrawerSettings,
  } from "$lib/util/drawerSettings";
  const drawerStore = getDrawerStore();

  const navigateTo = (tab) => {
    if (tab === "secrets") {
      activeTab.set("secrets");
      goto("/secrets/1");
    } else {
      activeTab.set("people");
      goto("/people/1");
    }
  };
</script>

<div class="tabs p-4 ml-4">
  <button
    class="btn {$activeTab === 'secrets'
      ? 'variant-filled-secondary'
      : 'variant-outline-secondary'}"
    on:click={() => navigateTo("secrets")}>Secrets</button
  >
  <button
    class="btn {$activeTab === 'people'
      ? 'variant-filled-secondary'
      : 'variant-outline-secondary'} ml-4"
    on:click={() => navigateTo("people")}>People</button
  >
  {#if $activeTab == "secrets"}
    <button
      class="btn variant-outline-secondary absolute right-40 ml-8"
      on:click={() => {
        drawerStore.open(createSecretDrawerSettings);
      }}
    >
      Create Secret
    </button>
  {:else if $activeTab == "people"}
    <button
      class="btn variant-outline-secondary absolute right-40 ml-8"
      on:click={() => {
        drawerStore.open(createPeopleDrawerSettings);
      }}
    >
      add People
    </button>
  {/if}
</div>
