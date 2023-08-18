<script>
  import { Drawer, InputChip } from "@skeletonlabs/skeleton";
  import { writable } from "svelte/store";
  export let selectedSecret;
  export let isEditing;
  export let toggleEdit;
  let value = [];

  $: value = selectedSecret ? selectedSecret.tags : [];
</script>

<Drawer {drawerSettings}>
  <!-- Existing Drawer markup with input fields and buttons -->
</Drawer>
