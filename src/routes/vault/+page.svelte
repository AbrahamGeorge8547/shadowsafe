<script>
  import { TreeView, FoldersView } from "$lib/components";

  const tree = {
    id: "root",
    label: "USA",
    children: [
      {
        id: "florida",
        label: "Florida",
        children: [
          { id: "jacksonville", label: "Jacksonville" },
          {
            id: "orlando",
            label: "Orlando",
            children: [
              { id: "disney-world", label: "Disney World" },
              { id: "universal-studio", label: "Universal Studio" },
              { id: "sea-world", label: "Sea World" },
            ],
          },
          { id: "miami", label: "Miami" },
        ],
      },
      {
        id: "california",
        label: "California",
        children: [
          { id: "san-francisco", label: "San Francisco" },
          { id: "los-angeles", label: "Los Angeles" },
          { id: "sacramento", label: "Sacramento" },
        ],
      },
    ],
  };
</script>

<div class="app-container flex">
  <div class="tree-container border-r-2 border-gray-300 ml-4">
    <TreeView {tree} />
  </div>
  <div class="folders-area">
    <FoldersView />
  </div>
</div>

<style>
  .tree-container {
    min-width: 150px; /* You can adjust this value */
    height: 100%;
    overflow-y: auto;
  }
</style>
