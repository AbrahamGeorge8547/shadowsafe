<script>
  import Icon from "@iconify/svelte";
  import { clipboard } from "@skeletonlabs/skeleton";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { currentParentNode } from "$lib/store/ui";
  import { secretsStore } from "$lib/store/secrets";
  import { onMount } from "svelte";
  import SelectedSecretDetail from "./selectedSecret.svelte";
  import { selectedFolder } from "$lib/store/folder";
  const toastStore = getToastStore();

  let secretData = [];
  onMount(() => {
    const unsubscribe = selectedFolder.subscribe((folder) => {
      if (folder != null) {
        fetch(`/api/folder/${folder.id}`)
          .then((response) => response.json())
          .then((responseJson) => {
            secretData = responseJson.data;
            console.log(secretData);
            secretsStore.set(secretData);
            // Do something with the data
          });
      }
    });

    // Don't forget to unsubscribe when the component is destroyed
    return () => {
      unsubscribe();
    };
  });

  let selectedSecret = null;
</script>

<div class="flex">
  <!-- Left Side: List of Cards -->
  <div class="flex flex-wrap p-6 w-3/4">
    {#each $secretsStore as secret}
      <div class="mb-6 mr-2 max-w-sm">
        <div
          class="container mx-auto p-4 relative card card-hover rounded-lg group h-auto !bg-[#3A4468]"
          on:click={() => (selectedSecret = secret)}
        >
          {#each secret?.credentials as field, index}
            {#if !field.sensitive}
              <div class="relative mb-4">
                <label class="label block mb-2">{field.fieldKey}</label>
                <input
                  class="input pr-10 w-full items-center !bg-[#3A4468]"
                  type="text"
                  value={field.fieldValue}
                />
                <button
                  use:clipboard={field.fieldValue}
                  class="right-2 absolute top-[calc(50%+10px)]"
                >
                  <Icon icon="solar:copy-bold-duotone" />
                </button>
              </div>
            {/if}
          {/each}
          <p class="mb-4">{secret.description}</p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Right Side: Detailed Card -->
  <div class="w-1/4 p-6">
    {#if selectedSecret}
      <SelectedSecretDetail {selectedSecret} />
    {:else}
      <p>Select a card to view details.</p>
    {/if}
  </div>
</div>
