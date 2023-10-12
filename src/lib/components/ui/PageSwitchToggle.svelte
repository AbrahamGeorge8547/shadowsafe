<script>
  import { goto } from "$app/navigation";
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { activeTab } from "$lib/store/ui";
  let value = get(activeTab) || "Secrets";
  let tab;
  $: if (!import.meta.env.SSR) {
    // Check if running on client
    if (value === "Secrets") {
      activeTab.set("Secrets");
      goto("/vault/secrets");
      tab = get(activeTab);
      console.log(tab, "TAB");
    } else if (value === "Groups") {
      tab = get(activeTab);
      console.log(tab, "TAB");
      activeTab.set("Groups");
      goto("/vault/people");
      tab = get(activeTab);
      console.log(tab, "TAB");
    }
  }
  onMount(() => {
    const tab = get(activeTab);
    console.log(tab, "TAB");
    if (tab === "Secrets") {
      goto("/vault/secrets");
    } else {
      goto("/vault/people");
    }
  });
</script>

<RadioGroup
  active="bg-[#4C598B]"
  hover="hover:variant-soft-primary"
  padding="px-4 py-1"
  background="bg-[#262C44]"
>
  <RadioItem bind:group={value} name="justify" value="Secrets" id="secrets">
    <label
      for="secrets"
      class={value === "Secrets" ? "text-[#fff]" : "text-[#828CAE]"}
      >Secrets</label
    >
  </RadioItem>
  <RadioItem bind:group={value} name="justify" value="Groups" id="groups">
    <label
      for="groups"
      class={value === "Groups" ? "text-[#fff]" : "text-[#828CAE]"}
      >Groups</label
    >
  </RadioItem>
</RadioGroup>

<style>
  /* Custom style for unselected labels */
  .unselected-label {
    color: #666; /* Replace with your desired text color for unselected labels */
  }
</style>
