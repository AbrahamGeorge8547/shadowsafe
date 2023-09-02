<!-- FoldersView.svelte -->
<script>
  import { selectedNodeChildren } from "$lib/store/ui";

  const handleFolderClick = (folder) => {
    console.log(`Clicked folder with ID: ${folder.id}, Label: ${folder.label}`);
    // Add your logic here
    selectedNodeChildren.set(folder.children || []);
  };
</script>

<div class="p-4">
  <h2 class="text-2xl font-semibold mb-4">Folders</h2>
  {#each $selectedNodeChildren as folder}
    <span
      class="text-lg card card-hover p-4 ml-8 cursor-pointer"
      on:click={() => handleFolderClick(folder)}
    >
      {folder.label}
    </span>
  {/each}
</div>
