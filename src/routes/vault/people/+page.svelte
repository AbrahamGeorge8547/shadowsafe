<script>
  import { editMembers } from "$lib/store/ui";
  import { peopleList } from "$lib/store/people";
  import { groupList, selectedGroup } from "$lib/store/group";
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
  groupList.set(data.groups);
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
      { userId: person.userId, accessType: "MEMBER", name: person.name },
    ];
    peopleList.update((people) => {
      return [
        ...people,
        {
          userId: person.userId,
          accessType: "MEMBER",
          name: person.name,
          unsaved: true,
        },
      ];
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
    fetch(`/api/groups/${group.groupId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          peopleList.set(data.data.users);
        }
      });
    editMembers.set(false);
    toastStore.trigger(t);
    addedUsers = [];
  };

  const addNewGroup = async () => {
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

<div
  class="bread-crumbs-container flex justify-start items-center ml-8 mt-5 mb-5"
>
  <div class="flex items-center">
    <button
      class="bg-[#2D3552] px-[27.5px] py-2.5 rounded-full flex justify-center items-center text-[#828CAE]"
      on:click={addNewGroup}
    >
      Add Group
      <Icon
        icon="ic:round-plus"
        color="#828CAE"
        class="h-5 w-5 ml-1 mt-[1px]"
      />
    </button>
    <div
      class="rounded-full h-11 w-11 bg-[#2D3552] justify-center items-center p-2.5 ml-2.5"
    >
      <!-- Add refresh function here -->
      <button>
        <Icon
          icon="bx:refresh"
          color="#828CAE"
          class="h-6 w-6 mt-[1px] rounded"
        />
      </button>
    </div>
  </div>
</div>
<div class="app-container flex">
  <div class="min-w-[250px] max-w-sm h-screen rounded-[4px] p-8">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      on:click={handleAllUsersClick}
      class="flex items-center text-lg btn-sm hover:bg-[#34487F] all-users-node"
    >
      <Icon icon="clarity:group-line" class="mr-2" />
      <span>All Users</span>
    </span>
    <GroupsView />
  </div>

  <div class="flex flex-col flex-grow">
    <div class="folders-area flex-grow flex">
      <div
        class="folders-area flex-grow rounded-[4px] mx-8 min-w-0 bg-[#2E3654]"
        on:drop={handleDrop}
        on:dragover={allowDrop}
      >
        <!-- <FoldersView /> -->
        <div class="flex flex-row justify-between px-8 items-center py-6">
          <div class="text-3xl">
            <h1>{`${$selectedGroup.name}`}</h1>
          </div>
          {#if $selectedGroup.name != "AllUsers"}
            <div class="flex flex-row">
              {#if $editMembers}
                <button
                  class="bg-[#4E46DC] px-3 py-1.5 rounded-3xl ml-4 mr-2"
                  on:click={cancelEdit}>Cancel</button
                >
              {/if}
              {#if $editMembers}
                <button
                  class="btn bg-[#4E46DC] !px-4"
                  disabled={addedUsers.length === 0}
                  on:click={addUserstoGroup}
                >
                  save changes</button
                >
              {:else}
                <button
                  class="btn variant-filled-tertiary p-2 !bg-[#4E46DC] !px-4"
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
        <div transition:fade class="flex flex-1 py-4">
          <div class="flex-1 flex">
            <PeopleCard />
          </div>
          {#if $editMembers}
            <div transition:fade class="flex-grow mr-8 max-w-[400px]">
              <PeopleListView />
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
