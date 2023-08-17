<script>
  import { writable } from "svelte/store";
  import Secrets from "./secrets.svelte";

  const selectedTab = writable("secrets");

  const selectTab = (tab) => {
    selectedTab.set(tab);
  };
</script>

<div class="tabs">
  <button
    class="btn {$selectedTab === 'secrets'
      ? 'variant-filled-secondary'
      : 'variant-outline-secondary'}"
    on:click={() => selectTab("secrets")}>Secrets</button
  >
  <button
    class="btn {$selectedTab === 'people'
      ? 'variant-filled-secondary'
      : 'variant-outline-secondary'}"
    on:click={() => selectTab("people")}>People</button
  >
</div>
<div class="content">
  {#if $selectedTab === "secrets"}
    <Secrets />
  {:else}
    <Secrets />
  {/if}
</div>
