<script lang="ts">
  // The ordering of these imports is critical to your app working properly
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";
  // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
  import "@skeletonlabs/skeleton/styles/skeleton.css";
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
