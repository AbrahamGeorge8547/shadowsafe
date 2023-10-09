<script>
    import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
    import { droppedItem, selectedPermission } from "$lib/store/ui";
    import { getDrawerStore } from "@skeletonlabs/skeleton";

    const drawerStore = getDrawerStore();
    let value = "MEMBER";
    const confirmPermission = () => {
        selectedPermission.set(value);
        drawerStore.close();
    };

    const cancelDrop = () => {
        selectedPermission.set("Cancelled");
        drawerStore.close();
    };
</script>

<h2>
    select the role you want to assign to {$droppedItem.name}
</h2>

<RadioGroup rounded="rounded-container-token" display="flex-col">
    <RadioItem bind:group={value} name="justify" value="MEMBER"
        >View Only</RadioItem
    >
    <RadioItem bind:group={value} name="justify" value="MANAGER"
        >Manage</RadioItem
    >
    <RadioItem bind:group={value} name="justify" value="OWNER">Owner</RadioItem>
</RadioGroup>

<button class="btn-md variant-filled-primary" on:click={confirmPermission}>
    Confirm
</button>

<button class="btn-md variant-filled-tertiary" on:click={cancelDrop}>
    Cancel
</button>
