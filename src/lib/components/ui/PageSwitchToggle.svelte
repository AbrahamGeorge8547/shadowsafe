<script>
  import { goto } from "$app/navigation";
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
  let value = "Secrets";
  $: if (!import.meta.env.SSR) {
    // Check if running on client
    if (value === "Secrets") {
      goto("/vault/secrets");
    } else if (value === "Groups") {
      goto("/vault/people");
    }
  }
</script>

<RadioGroup
  active="bg-[#4C598B]"
  hover="hover:variant-soft-primary"
  padding="px-4 py-1"
  background="bg-[#262C44]"
>
  <RadioItem bind:group={value} name="justify" value="Secrets" id="secrets">
    <label for="secrets" class={value === "Secrets" ? "text-[#fff]" : "text-[#828CAE]"}
      >Secrets</label
    >
  </RadioItem>
  <RadioItem bind:group={value} name="justify" value="Groups" id="groups">
    <label for="groups" class={value === "Groups" ? "text-[#fff]" : "text-[#828CAE]"}>Groups</label>
  </RadioItem>
</RadioGroup>

<style>
  /* Custom style for unselected labels */
  .unselected-label {
    color: #666; /* Replace with your desired text color for unselected labels */
  }
</style>
