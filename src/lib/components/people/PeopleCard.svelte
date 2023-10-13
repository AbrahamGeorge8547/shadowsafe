<script lang="ts">
  import { accessList, peopleList } from "$lib/store/people";
  import { editMembers } from "$lib/store/ui";
  import { selectedGroup } from "$lib/store/ui";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import UserProfile from "./UserProfile.svelte";
  import { writable } from "svelte/store";

  const selectedUserId = writable(null);
  onMount(() => {
    const unsubscribe = selectedGroup.subscribe((group) => {
      console.log("GROUP", group);
      selectedUserId.set(null);
      if (group !== undefined && group !== null) {
        if (group.name != "AllUsers") {
          fetch(`/api/groups/${group.groupId}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.data) {
                peopleList.set(data.data.users);
              }
            });
        } else {
          fetch("/api/people")
            .then((response) => response.json())
            .then((data) => {
              peopleList.set(data);
            });
        }
      }
    });

    // Don't forget to unsubscribe when the component is destroyed
    return () => {
      unsubscribe();
    };
  });
  function handleUsernameClick(id: string) {
    if (!$editMembers) {
      selectedUserId.set(id);
    }
  }
  async function handleDeleteUsers(id: string) {
    const response = await fetch(
      `/api/groups/${$selectedGroup.id}/users/${id}`,
      {
        method: "DELETE",
      }
    );
    fetch(`/api/groups/${$selectedGroup.id}`)
      .then((response) => response.json())
      .then((data) => {
        peopleList.set(data.data.users);
      });
    //TODO: add toast here
  }
</script>

<div class="flex flex-1">
  <!-- People List -->
  <div class="flex-1">
    <ul class="p-4">
      {#each $peopleList as people}
        <div
          class="card p-[10px] flex justify-between !border-b-0 {people.unsaved
            ? '!bg-[#3A4468]'
            : '!bg-[#2E3654]'}"
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
              {people.name}
            </li>
            <div
              class="w-full flex justify-start items-center font-light !text-xs"
            >
              <li
                class="bg-[#837EE633] mr-2 py-2 px-2 rounded flex-nowrap whitespace-nowrap"
              >
                {people.accessType}
              </li>
              {#if people.team}
                <li
                  class="bg-[#837EE633] py-2 px-2 rounded flex-nowrap whitespace-nowrap"
                >
                  {people.team}
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
    </ul>
  </div>

  {#if $selectedUserId !== null && !$editMembers}
    <UserProfile userId={$selectedUserId} />
  {/if}
</div>
