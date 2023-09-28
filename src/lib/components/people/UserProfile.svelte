<script>
    import { onMount, onDestroy } from "svelte";
    export let userId;
    let user = {
        groups: [],
    };

    $: {
        (async () => {
            try {
                const responseData = await fetch(
                    `/api/people/details/${userId}`
                );
                const responseJson = await responseData.json();
                console.log(responseJson.data);
                user = responseJson.data;
            } catch (error) {
                console.error("Failed to update user data:", error);
            }
        })();
    }
</script>

<div class="p-4 variant-ringed-tertiary rounded-xl">
    <!-- Full Name Section -->
    <div class="mb-4 card">
        <h1 class="text-xl font-semibold">Full Name:</h1>
        <p class="text-lg">{user.name}</p>
    </div>

    <!-- Groups Section -->
    <div class="mb-4">
        <h1 class="text-xl font-semibold">Groups:</h1>
        <div class="flex flex-wrap">
            {#each user.groups as group}
                <span class="chip variant-filled m-2">
                    {group.name}
                </span>
            {/each}
        </div>
    </div>

    <!-- Created By Section -->
    <div class="mb-4">
        <h1 class="text-xl font-semibold">Created By:</h1>
        <p class="text-lg">{user.createdBy}</p>
    </div>

    <!-- Username Section -->
    <div class="mb-4">
        <h1 class="text-xl font-semibold">Username:</h1>
        <p class="text-lg">{user.username}</p>
    </div>
</div>
