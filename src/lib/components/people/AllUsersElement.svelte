<script>
    import Icon from "@iconify/svelte"; // Replace with your actual icon library

    let handleAllUsersClick = () => {
        // Handle click event for All Users
    };
</script>

<div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
        on:click={handleAllUsersClick}
        class="flex items-center text-lg btn-sm hover:bg-[#34487F] all-users-node"
    >
        <Icon icon="twemoji:people" class="mr-2 text-2xl" />
        <span>All Users</span>
    </span>
</div>

<style>
    .all-users-node {
        @apply bg-transparent border border-transparent rounded-md;
    }
    .all-users-node:hover {
        @apply bg-[#34487F];
    }
    .all-users-node.selected-node {
        @apply bg-[#33487e] border border-[#4ba3e3] rounded-md;
    }
</style>
