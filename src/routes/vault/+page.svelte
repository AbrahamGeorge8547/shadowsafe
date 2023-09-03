<script>
  import { TreeView, FoldersView } from "$lib/components";
  import { treeStore } from "$lib/store/ui";
  import { BreadCrumbs } from "$lib/components";
  const tree = {
    id: 1,
    label: "USA",
    children: [
      {
        id: 2,
        parentId: 1,
        label: "Florida",
        children: [
          { id: 3, parentId: 2, label: "Jacksonville" },
          {
            id: 4,
            label: "Orlando",
            parentId: 2,
            children: [
              { id: 6, parentId: 4, label: "Disney World" },
              { id: 8, parentId: 4, label: "Universal Studio" },
              { id: 7, parentId: 4, label: "Sea World" },
            ],
          },
          { id: 5, parentId: 2, label: "Miami" },
        ],
      },
      {
        parentId: 1,
        id: 9,
        label: "California",
        children: [
          { id: 10, parentId: 9, label: "San Francisco" },
          { id: 11, parentId: 9, label: "Los Angeles" },
          { id: 12, parentId: 9, label: "Sacramento" },
        ],
      },
    ],
  };
  treeStore.set(tree);
</script>

<BreadCrumbs />
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
