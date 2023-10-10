<script lang="ts">
    import { selectedGroup } from "$lib/store/ui";
    import { groupList } from "$lib/store/people";
    const selectGroup = (group) => {
        selectedGroup.set(group);
    };
</script>

<div>
    {#each $groupList as group}
        <h2 class="card p-3 m-2" on:click={selectGroup(group)}>
            {group.name}
        </h2>
    {/each}
</div>
