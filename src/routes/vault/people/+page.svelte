<script>
  import { editMembers, selectedGroup } from "$lib/store/ui";
  import { peopleList, groupList } from "$lib/store/people";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import {
    createNewGroup,
    createPeopleDrawerSettings,
  } from "$lib/util/drawerSettings";
  import Icon from "@iconify/svelte";
  import {
    PeopleListView,
    PeopleCard,
    GroupsView,
  } from "$lib/components/people";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import { get } from "svelte/store";
  import { fade } from "svelte/transition";
  const drawerStore = getDrawerStore();
  const toastStore = getToastStore();
  export let data;
  groupList.set(data.folder);

  selectedGroup.set(data.folder[0]);
  function allowDrop(event) {
    event.preventDefault();
  }
  let addedUsers = [];
  function handleDrop(event) {
    event.preventDefault();
    const personData = event.dataTransfer.getData("person");
    const person = JSON.parse(personData);
    addedUsers = [
      ...addedUsers,
      { userId: person.userId, accessType: "MEMBER" },
    ];
    peopleList.update((people) => {
      return [...people, person];
    });
  }
  const addUserstoGroup = async () => {
    const t = {
      message: "user added to group",
      timeout: 2000,
    };
    const group = get(selectedGroup);
    await fetch(`/api/groups/${group.groupId}`, {
      method: "POST",
      body: JSON.stringify({ userAccessList: addedUsers }),
    });
    editMembers.set(false);
    toastStore.trigger(t);
    addedUsers = [];
  };

  const addNewFolder = async () => {
    // @ts-ignore
    drawerStore.open(createNewGroup);
  };

  function handleAllUsersClick() {
    selectedGroup.set({ name: "AllUsers" });
    editMembers.set(false);
  }

  function addMembers() {
    console.log("Adding members");
    drawerStore.open(createPeopleDrawerSettings);
  }

  function cancelEdit() {
    addedUsers = [];
    editMembers.set(false);
  }
</script>

<div class="app-container flex">
  <div
    class="min-w-[250px] max-w-sm h-screen card-hover variant-ringed-tertiary rounded-[4px] shadow-md p-8 ml-16"
  >
    <button class="btn variant-filled-primary" on:click={addNewFolder}
      >Create Group</button
    >
    <span
      on:click={handleAllUsersClick}
      class="flex items-center text-lg btn-sm hover:bg-[#34487F] all-users-node"
    >
      <Icon icon="twemoji:file-folder" class="mr-2 text-2xl" />
      <span>All Users</span>
    </span>
    <!-- tree here -->
    <GroupsView />
  </div>

  <!-- FoldersView on the right -->
  <div class="flex flex-col flex-grow">
    <div class="folders-area flex-grow flex">
      <div
        class="folders-area flex-grow border-2 border-[#235789] rounded-[4px] mx-8 min-w-0"
        on:drop={handleDrop}
        on:dragover={allowDrop}
      >
        <!-- <FoldersView /> -->
        <div class="flex flex-row justify-between px-8 items-center py-6">
          <div>
            <h1>{`${$selectedGroup.name}`}</h1>
          </div>
          {#if $selectedGroup.name != "AllUsers"}
            <div class="flex flex-row">
              {#if $editMembers}
                <button
                  class="bg-[#4E46DC] px-3 py-1.5 rounded-2xl ml-4"
                  on:click={cancelEdit}>Cancel</button
                >
              {/if}
              {#if $editMembers}
                <button
                  class="btn variant-filled-tertiary p-2"
                  disabled={addedUsers.length === 0}
                  on:click={addUserstoGroup}
                >
                  save changes</button
                >
              {:else}
                <button
                  class="btn variant-filled-tertiary p-2"
                  on:click={() => editMembers.set(true)}
                >
                  edit members</button
                >
              {/if}
            </div>
          {:else}
            <button
              class="btn variant-filled-tertiary p-2"
              on:click={addMembers}
            >
              add members</button
            >
          {/if}
        </div>
        <div
          transition:fade
          class=" py-4 border-t-2 rounded-[4px] border-[#235789]"
        >
          <PeopleCard />
        </div>
      </div>
      {#if $editMembers}
        <div transition:fade class="flex-grow mr-8 max-w-[400px]">
          <PeopleListView />
        </div>
      {/if}
    </div>
  </div>
</div>
