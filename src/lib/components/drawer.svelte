<script>
  import { InputChip, clipboard } from "@skeletonlabs/skeleton";
  import { selectedSecret, isEditing } from "$lib/store";
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
      <div class="flex">
        <input
          class="input"
          type="text"
          bind:value={$selectedSecret.username}
          readonly={!$isEditing}
        />
        <button use:clipboard={$selectedSecret.username}> copy </button>
      </div>
    </label>
    <label class="label mb-2">
      <span class="mr-2">Password:</span>
      <div class="flex">
        {#if showPassword}
          <input
            class="input"
            type="text"
            bind:value={$selectedSecret.password}
            readonly={!$isEditing}
          />
        {:else}
          <input
            class="input type-password"
            type="password"
            bind:value={$selectedSecret.password}
            readonly={!$isEditing}
          />
        {/if}
        <button on:click={togglePasswordVisibility}> show </button>
        <button use:clipboard={$selectedSecret.password}> copy </button>
      </div>
    </label>
    <label class="label mb-2">
      <span class="mr-2">Description:</span>
      <textarea
        class="textarea"
        rows="3"
        bind:value={$selectedSecret.description}
        readonly={!$isEditing}
      />
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
