<script>
    import { onMount, onDestroy } from "svelte";
    export let userId;
    const user = {
        fullName: "Abraham George",
        groups: [
            {
                id: 19,
                label: "qa",
            },
            {
                id: 19,
                label: "team leads",
            },
            {
                id: 19,
                label: "broker",
            },
            {
                id: 19,
                label: "fe",
            },
            {
                id: 19,
                label: "ledger",
            },
        ],
        createdBy: "John Doe",
        username: "abrahamgeorge8547@gmail.com",
    };

    $: {
        (async () => {
            console.log("UserId updated:", userId);
            try {
                // Fetch new user data here
                // const response = await fetch(`/api/users/${userId}`);
                // const newData = await response.json();
                // // Update user data
                // user = newData;
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
        <p class="text-lg">{user.fullName}</p>
    </div>

    <!-- Groups Section -->
    <div class="mb-4">
        <h1 class="text-xl font-semibold">Groups:</h1>
        <div class="flex flex-wrap">
            {#each user.groups as group}
                <span class="chip variant-filled m-2">
                    {group.label}
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
