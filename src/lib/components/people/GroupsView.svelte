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
    <ul>
        {#each $groupList as group}
            <li>
                <span
                    on:click={() => selectGroup(group)}
                    class={`p-2 text-lg btn-sm rounded flex items-center ${
                        $selectedGroup === group ? "selected-node" : "hoverItem"
                    }`}
                >
                    <Icon icon="clarity:group-line" class="mr-2 text-[24px]" />

                    {group.name}
                </span>
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
