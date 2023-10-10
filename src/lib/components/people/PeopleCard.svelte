<script lang="ts">
  import { peopleList } from "$lib/store/people";
  import { editMembers } from "$lib/store/ui";
  import { selectedGroup } from "$lib/store/ui";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import UserProfile from "./UserProfile.svelte";
  import { writable } from "svelte/store";

  const selectedUserId = writable(null);
  onMount(() => {
    const unsubscribe = selectedGroup.subscribe((group) => {
      selectedUserId.set(null);
      if (group !== undefined && group !== null) {
        if (group.name != "AllUsers") {
          fetch(`/api/groups/${group.groupId}`)
            .then((response) => response.json())
            .then((data) => {
              peopleList.set(data.data.users);
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

<div class="flex">
  <!-- People List -->
  <div class="flex-1">
    <ul class="p-4">
      {#each $peopleList as people}
        <li class="p-2 m-2 flex items-center justify-between">
          <div
            class="card card-hover flex items-center justify-between w-full cursor-pointer p-4"
            on:click={() => handleUsernameClick(people.userId)}
          >
            <span>{people.name}</span>
            {#if $editMembers}
              <button
                class="focus:outline-none"
                on:click|stopPropagation={() => handleDeleteUsers(people._id)}
              >
                <Icon icon="mingcute:delete-2-line" />
              </button>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </div>

  <!-- UserProfile Component -->
  <div class="flex-1">
    {#if $selectedUserId !== null && !$editMembers}
      <UserProfile userId={$selectedUserId} />
    {/if}
  </div>
</div>
