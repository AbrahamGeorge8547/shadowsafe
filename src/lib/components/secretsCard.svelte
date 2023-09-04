<script>
  import { secretsStore, selectedSecret, activeTab } from "$lib/store";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  onMount(() => {
    console.log($secretsStore);
  });
</script>
