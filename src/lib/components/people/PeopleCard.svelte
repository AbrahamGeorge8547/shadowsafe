<script lang="ts">
  import { peopleList } from "$lib/store/people";
  import { currentParentNode, editMembers } from "$lib/store/ui";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import UserProfile from "./UserProfile.svelte";
  import { writable } from "svelte/store";

  const selectedUserId = writable(null);
  onMount(() => {
    const unsubscribe = currentParentNode.subscribe((value) => {
      if (value !== undefined && value !== null) {
        fetch(`/api/groups/${value}`)
          .then((response) => response.json())
          .then((data) => {
            peopleList.set(data.data.users);
          });
      }
    });

    // Don't forget to unsubscribe when the component is destroyed
    return () => {
      unsubscribe();
    };
  });
  function handleUsernameClick(id: string) {
    console.log("clicked on user", id);
    if (!$editMembers) {
      selectedUserId.set(id);
    }
  }
  function handleDeleteUsers(id: string) {
    console.log("Clicked to delete the user");
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
            on:click={() => handleUsernameClick(people._id)}
          >
            <span>{people.username}</span>
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
