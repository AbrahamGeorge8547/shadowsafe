<script>
    import { groupList } from "$lib/store/people";
    import { selectedGroup } from "$lib/store/ui";
    import Icon from "@iconify/svelte";

    const selectGroup = (group) => {
        if ($selectedGroup === group) {
            selectedGroup.set(null); // Deselect the group if it's clicked again
        } else {
            selectedGroup.set(group);
        }
    };
</script>

<div>
    <ul class="ml-4">
        {#each $groupList as group}
            <li class="mb-2 mt-2 relative">
                <span
                    on:click={() => selectGroup(group)}
                    class={`flex items-center text-lg btn-sm ml-auto rounded ${
                        $selectedGroup === group ? "selected-node" : "hoverItem"
                    }`}
                >
                    {group.name}
                </span>
                <Icon icon="clarity:group-line" class="mr-1 text-[16px]" />
            </li>
        {/each}
    </ul>
</div>

<style>
    .selected-node {
        background: #2e3654;
        border: 1px solid #374165;
        border-radius: 4px;
    }
    .hoverItem:hover {
        border: 1px solid #374165;
        border-radius: 4px;
    }
</style>
