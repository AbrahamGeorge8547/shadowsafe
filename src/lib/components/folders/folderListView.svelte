<script lang="ts">
    import { folderStore, selectedFolder } from "$lib/store/folder";
    import { selectedSecret } from "$lib/store/secrets";
    import type { Folder } from "$lib/dtos/folder.dto";
    import Icon from "@iconify/svelte";

    const selectFolder = (folder: Folder) => {
        selectedSecret.set(null);
        if ($selectedFolder === folder) {
            selectedFolder.set(null); // Deselect the group if it's clicked again
        } else {
            selectedFolder.set(folder);
        }
    };
</script>

<div>
    <ul>
        {#each $folderStore as folder}
            <li class="list-none">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span
                    on:click={() => selectFolder(folder)}
                    class={`p-2 text-lg rounded flex items-center cursor-pointer
                        ${
                            $selectedFolder === folder
                                ? "bg-blue-800 border border-blue-900"
                                : "hover:border hover:border-blue-900"
                        }`}
                >
                    <Icon icon="clarity:group-line" class="mr-2 text-[24px]" />
                    {folder.name}
                </span>
            </li>
        {/each}
    </ul>
</div>
