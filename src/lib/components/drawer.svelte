<script>
  import { InputChip, clipboard } from "@skeletonlabs/skeleton";
  import { selectedSecret, isEditing } from "$lib/store";
  import Icon from "@iconify/svelte";
  import copyIcon from "@iconify/icons-bxs/copy";
  const value = $selectedSecret?.tags;
  let showPassword = false;
  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  async function saveEdit() {
    const response = await fetch(`/api/secrets/${$selectedSecret.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify($selectedSecret), // assuming selectedSecret is a reactive variable
    });
    const result = await response.json();

    if (result.success) {
      // Close the editing drawer, reload the secrets, or any other actions you want to take on success
      toggleEdit();
      // Optionally you might want to reload the secrets to reflect the updated information
    } else {
      // Handle the error
    }
  }

  function toggleEdit() {
    isEditing.update((val) => !val);
  }
</script>

{#if $selectedSecret}
  <div class="container mx-auto p-4 relative">
    <label class="label mb-2">
      <span class="mr-2">Username:</span>
      <div class="relative">
        <input
          class="input pr-10"
          type="text"
          bind:value={$selectedSecret.username}
          readonly={!$isEditing}
        />
        <button
          use:clipboard={$selectedSecret.username}
          class="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Icon icon={copyIcon} />
        </button>
      </div>
    </label>
    <label class="label mb-2">
      <span class="mr-2">Password:</span>
      <div class="relative">
        {#if showPassword}
          <input
            class="input pr-16"
            type="text"
            bind:value={$selectedSecret.password}
            readonly={!$isEditing}
          />
        {:else}
          <input
            class="input pr-16"
            type="password"
            bind:value={$selectedSecret.password}
            readonly={!$isEditing}
          />
        {/if}
        <button
          on:click={togglePasswordVisibility}
          class="absolute right-10 top-1/2 transform -translate-y-1/2"
        >
          show
        </button>
        <button
          use:clipboard={$selectedSecret.password}
          class="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Icon icon={copyIcon} />
        </button>
      </div>
    </label>
    <label class="label mb-2">
      <span class="mr-2">Tags:</span>
      <InputChip name="tags" {value} disabled={!$isEditing} />
    </label>
    <button
      class="btn variant-outline-secondary mt-4 absolute right-4"
      on:click={toggleEdit}
      hidden={$isEditing}
    >
      Edit
    </button>
    <button
      class="btn variant-outline-secondary mt-4 absolute"
      on:click={saveEdit}
      hidden={!$isEditing}
    >
      Save
    </button>
  </div>
{/if}
