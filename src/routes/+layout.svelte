<script lang="ts">
  // Most of your app wide CSS should be put in this file
  import "../app.postcss";
  import { AppShell, AppBar } from "@skeletonlabs/skeleton";
</script>

<!-- App Shell -->
<AppShell>
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <img src="/logo.svg" alt="Logo" class="h-6 w-6 inline-block" />
        <!-- Logo Image -->
        <span class="text-xl">
          shadow<span class="font-bold">Safe</span>
        </span>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <!-- Page Route Content -->
  <slot />
</AppShell>
