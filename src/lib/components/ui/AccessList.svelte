<script lang="ts">
    import { GroupListView } from "$lib/components/people";
    import Icon from "@iconify/svelte";
    import { accessList } from "$lib/store/people";
    import {
        droppedItem,
        selectedPermission,
        currentParentNode,
    } from "$lib/store/ui";
    import { getDrawerStore } from "@skeletonlabs/skeleton";
    import { get } from "svelte/store";
    import { permissions } from "$lib/util/drawerSettings";
    const drawerStore = getDrawerStore();

    function allowDrop(event) {
        event.preventDefault();
    }
    let payload = {
        folderId: get(currentParentNode),
        userAccess: [],
        groupAccess: [],
    };
    let unsavedUserList = [];
    let droppedItemType: string = null;
    function handleDrop(event) {
        event.preventDefault();
        if (event.dataTransfer.getData("group") == "true") {
            droppedItemType = "group";
            const group = JSON.parse(event.dataTransfer.getData("groupData"));
            droppedItem.set({ id: group.groupId, name: group.name });
        } else {
            droppedItemType = "user";
            const user = JSON.parse(event.dataTransfer.getData("personData"));
            droppedItem.set({ name: user.name, type: "user", id: user.userId });
        }
        drawerStore.open(permissions);
    }

    $: {
        if ($selectedPermission === "Cancelled") {
            console.log("Cancelled");
        } else if (droppedItemType == "user" && $selectedPermission != null) {
            payload.userAccess.push({
                userId: get(droppedItem).id,
                type: $selectedPermission,
            });

            unsavedUserList = [
                ...unsavedUserList,
                {
                    name: $droppedItem.name,
                    team: "",
                    permission: $selectedPermission,
                    id: droppedItem.id,
                },
            ];
            console.log(unsavedUserList);
        } else if (droppedItemType == "group" && $selectedPermission != null) {
            payload.groupAccess.push({
                groupId: get(droppedItem).id,
                type: $selectedPermission,
            });
            console.log(payload);
        }

        selectedPermission.set(null);
    }

    currentParentNode.subscribe((node) => {
        if (node !== undefined && node !== null) {
            droppedItemType = null;
            droppedItem.set(null);
            payload = {
                folderId: node,
                userAccess: [],
                groupAccess: [],
            };
        }
    });
</script>

<div class="flex">
    <!-- The ul with the $groupList -->
    <div class="w-1/2" on:drop={handleDrop} on:dragover={allowDrop}>
        <ul class="grid grid-cols-3 gap-4">
            {#each unsavedUserList as user}
                <div class="card p-4">
                    {user.name}
                    {user.permission}
                    {user.team}
                </div>
            {/each}
            {#each $accessList as group}
                <li class="text-center">
                    <div class="flex flex-col items-center">
                        <Icon icon="dashicons:groups" class="text-3xl" />
                        <span>{group}</span>
                    </div>
                </li>
            {/each}
        </ul>
    </div>

    <!-- The GroupListView -->
    <div class="w-1/2">
        <GroupListView />
    </div>
</div>
