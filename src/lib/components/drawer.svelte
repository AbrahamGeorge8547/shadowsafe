<script>
  import { Drawer, InputChip, clipboard } from "@skeletonlabs/skeleton";
  import { selectedSecret } from "$lib/store";
  export let isEditing;
  export let toggleEdit;
  export let drawerSettings;
  export let value;

  let showPassword = false;

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }
</script>

<Drawer {drawerSettings}>
  <div class="container mx-auto p-4 relative">
    <label class="label mb-2">
      <span class="mr-2">Username:</span>
      <div class="flex">
        <input
          class="input"
          type="text"
          value={$selectedSecret.username}
          readonly={!$isEditing}
        />
        <button use:clipboard={$selectedSecret.username}> copy </button>
      </div>
    </label>
    <label class="label mb-2">
      <span class="mr-2">Password:</span>
      <div class="flex">
        <input
          class={showPassword ? "input" : "input type-password"}
          type={showPassword ? "text" : "password"}
          value={$selectedSecret.password}
          readonly={!$isEditing}
        />
        <button on:click={togglePasswordVisibility}> show </button>
        <button use:clipboard={$selectedSecret.password}> copy </button>
      </div>
    </label>
    <label class="label mb-2">
      <span class="mr-2">Description:</span>
      <textarea
        class="textarea"
        rows="3"
        value={$selectedSecret.description}
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
    >
      {$isEditing ? "Save" : "Edit"}
    </button>
  </div>
</Drawer>
