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

<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
    <RadioItem bind:group={value} name="justify" value="Secrets"
        >Secrets</RadioItem
    >
    <RadioItem bind:group={value} name="justify" value="Groups"
        >Groups</RadioItem
    >
</RadioGroup>
