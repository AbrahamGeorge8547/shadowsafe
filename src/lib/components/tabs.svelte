<script>
  import { goto } from "$app/navigation";
  import { activeTab } from "$lib/store";

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

<div class="tabs">
  <button
    class="btn {$activeTab === 'secrets'
      ? 'variant-filled-secondary'
      : 'variant-outline-secondary'}"
    on:click={() => navigateTo("secrets")}>Secrets</button
  >
  <button
    class="btn {$activeTab === 'people'
      ? 'variant-filled-secondary'
      : 'variant-outline-secondary'}"
    on:click={() => navigateTo("people")}>People</button
  >
</div>
