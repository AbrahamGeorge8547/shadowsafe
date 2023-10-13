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
    import { onDestroy, onMount } from "svelte";
    const drawerStore = getDrawerStore();

    function allowDrop(event) {
        event.preventDefault();
    }
    let payload = {
        folderId: get(currentParentNode),
        userAccess: [],
        groupAccess: [],
    };
    let accessUserList = [];
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
        } else if (droppedItemType == "group" && $selectedPermission != null) {
            payload.groupAccess.push({
                groupId: get(droppedItem).id,
                type: $selectedPermission,
            });
            console.log(payload);
            const permission = get(selectedPermission);
            fetch(`/api/groups/${$droppedItem.id}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    const groupUsers = responseJson.data.users.map((ele) => {
                        return {
                            name: ele.name,
                            permission,
                            team: get(droppedItem).name,
                        };
                    });
                    unsavedUserList = [...unsavedUserList, ...groupUsers];
                });
        }

        selectedPermission.set(null);
    }
    let unsubscribe;
    onMount(() => {
        unsubscribe = currentParentNode.subscribe((node) => {
            if (node !== undefined && node !== null) {
                droppedItemType = null;
                droppedItem.set(null);
                payload = {
                    folderId: node,
                    userAccess: [],
                    groupAccess: [],
                };
            }

            if (node != "root") {
                fetch(`/api/folder/${node}?access=true`)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        accessUserList = responseJson.users;
                    });
            } else {
                accessUserList = [];
            }
            unsavedUserList = [];
        });
    });
    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });
    const addUsersToFolder = () => {
        fetch(`/api/folder/${$currentParentNode}`, {
            method: "POST",
            body: JSON.stringify(payload),
        }).then((data) => {
            fetch(`/api/folder/${$currentParentNode}?access=true`)
                .then((response) => response.json())
                .then((responseJson) => {
                    accessUserList = responseJson.users;
                });
        });
        unsavedUserList = [];
        droppedItemType = null;
        droppedItem.set(null);
        payload = {
            folderId: get(currentParentNode),
            userAccess: [],
            groupAccess: [],
        };
    };
</script>

<!-- disable the button if unsaveduserList is 0 -->
<div class="flex justify-end mx-10 mb-2 absolute right-2 top-4">
    {#if unsavedUserList.length}
        <button class="btn bg-[#828CAE]" on:click={addUsersToFolder}>
            Save changes
        </button>
    {/if}
</div>
<div class="flex">
    <!-- The ul with the $groupList -->
    <div class="w-8/12" on:drop={handleDrop} on:dragover={allowDrop}>
        <ul class="flex flex-col bg-[#2E3654]">
            {#each unsavedUserList as user}
                <div class="card p-[10px] flex justify-between !border-b-0">
                    <div class="w-4/5 !bg-[#2E3654] flex ml-4">
                        <li
                            class="w-11/12 flex justify-start items-center !text-xs font-light"
                        >
                            <span
                                class="rounded-full w-[24px] h-[24px] flex justify-center items-center bg-[#4C598B33] mr-2"
                            >
                                <Icon
                                    icon="tabler:user"
                                    class="text-3xl h-[15px] w-[15px]"
                                    color="#fff"
                                />
                            </span>
                            {user.name}
                        </li>
                        <div
                            class="w-full flex justify-start items-center font-light !text-xs"
                        >
                            <li
                                class=" bg-[#837EE633] mr-2 py-2 px-2 rounded flex-nowrap whitespace-nowrap"
                            >
                                {user.permission}
                            </li>
                            {#if user.team}
                                <li
                                    class=" bg-[#837EE633] py-2 px-2 rounded flex-nowrap whitespace-nowrap"
                                >
                                    {user.team}
                                </li>
                            {/if}
                        </div>
                    </div>
                    <li class="w-1/6 flex justify-center items-center">
                        <button>
                            <Icon
                                icon="simple-line-icons:options-vertical"
                                class=""
                                color="#828CAE"
                            />
                        </button>
                    </li>
                </div>
            {/each}
            {#each accessUserList as user}
                <div class="flex flex-col bg-[#2E3654]">
                    <div
                        class="card p-[10px] !bg-[#3A4468] flex justify-between !border-b-0"
                    >
                        <div class="w-4/5 flex ml-4">
                            <li
                                class="w-11/12 flex justify-start items-center !text-xs font-light"
                            >
                                <span
                                    class="rounded-full w-[24px] h-[24px] flex justify-center items-center bg-[#4C598B33] mr-2"
                                >
                                    <Icon
                                        icon="tabler:user"
                                        class="text-3xl h-[15px] w-[15px]"
                                        color="#fff"
                                    />
                                </span>
                                {user.name}
                            </li>
                            <div
                                class="w-full flex justify-start items-center font-light !text-xs"
                            >
                                <li
                                    class=" bg-[#837EE633] mr-2 py-2 px-2 rounded flex-nowrap whitespace-nowrap"
                                >
                                    {user.accessType}
                                </li>
                                {#if user.team}
                                    <li
                                        class=" bg-[#837EE633] py-2 px-2 rounded flex-nowrap whitespace-nowrap mr-2"
                                    >
                                        {user.team}
                                    </li>
                                {/if}

                                {#if user.group}
                                    {#each user?.group as group}
                                        <li
                                            class=" bg-[#837EE633] py-2 px-2 rounded flex-nowrap whitespace-nowrap mr-2"
                                        >
                                            {group.name}
                                        </li>
                                    {/each}
                                {/if}
                            </div>
                        </div>
                        <li class="w-1/6 flex justify-center items-center">
                            <button>
                                <Icon
                                    icon="simple-line-icons:options-vertical"
                                    class=""
                                    color="#828CAE"
                                />
                            </button>
                        </li>
                    </div>
                </div>
            {/each}
        </ul>
    </div>

    <!-- The GroupListView -->
    <div class="w-4/12">
        <GroupListView />
    </div>
</div>
