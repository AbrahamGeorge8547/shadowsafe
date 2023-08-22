<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<script>
  import { Toast, Drawer, drawerStore } from "@skeletonlabs/skeleton";
  import { DrawerComponent } from "$lib/components";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  onMount(() => {
    if (window.location.pathname === "/") {
      goto("/secrets/1");
    }
  });
</script>
