<script lang="ts">
  import { peopleList } from "$lib/store/people";
  import { currentParentNode, editMembers } from "$lib/store/ui";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

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
  }
  function handleDeleteUsers(id: string) {
    console.log("Clicked to delete the user");
  }
</script>

<ul>
  {#each $peopleList as people}
    <li class="card card-hover p-2 m-2 flex items-center justify-between">
      <button
        class="focus:outline-none"
        on:click={() => handleUsernameClick(people.username)}
      >
        {people.username}
      </button>
      {#if $editMembers}
        <button
          class="focus:outline-none"
          on:click|stopPropagation={() => handleDeleteUsers(people._id)}
        >
          <Icon icon="mingcute:delete-2-line" />
        </button>
      {/if}
    </li>
  {/each}
</ul>
