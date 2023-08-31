<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<script>
  import { Toast, Drawer, drawerStore } from "@skeletonlabs/skeleton";
  import { DrawerComponent } from "$lib/components";
  import { AdminCheck } from "$lib/components";
  import { userStore } from "$lib/store";
  import "font-awesome/css/font-awesome.min.css";

  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  onMount(() => {
    const user = get(userStore);
    if (user.email) {
      goto("/secrets/1");
    }
  });
</script>

<!-- <img src="/logo.svg" alt="Logo" /> -->

<div class="container h-full mx-auto flex justify-center items-center z-0">
  <div class="space-y-10 text-center flex flex-col items-center">
    <!-- Animated Logo -->
    <figure>
      <section class="img-bg" />
      <img
        src="/logo.svg"
        alt="Logo"
        class="fill-token"
        style="width: 300px;"
      />
    </figure>
    <AdminCheck />
    <Toast />
    <!-- / -->
  </div>
</div>

<style lang="postcss">
  figure {
    @apply flex relative flex-col;
  }
  figure svg,
  .img-bg {
    @apply w-64 h-64 md:w-80 md:h-80;
  }
  .img-bg {
    @apply absolute z-[-1] rounded-full blur-[50px] transition-all;
    animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
      glow 5s linear infinite;
  }
  @keyframes glow {
    0% {
      @apply bg-primary-400/50;
    }
    33% {
      @apply bg-secondary-400/50;
    }
    66% {
      @apply bg-tertiary-400/50;
    }
    100% {
      @apply bg-primary-400/50;
    }
  }
  @keyframes pulse {
    50% {
      transform: scale(1.5);
    }
  }
</style>
