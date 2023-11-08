<script lang="ts">
  import { folderStore, selectedFolder } from "$lib/store/folder";
  import {
    createNewFolder,
    createSecretDrawerSettings,
  } from "$lib/util/drawerSettings";
  import { SecretsCard } from "$lib/components/secrets";
  import Icon from "@iconify/svelte";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import { AccessList } from "$lib/components/ui";
  import FolderListView from "$lib/components/folders/folderListView.svelte";
  const drawerStore = getDrawerStore();

  export let data;
  console.log(data);
  folderStore.set(data.folders);
  const createSecret = async () => {
    drawerStore.open(createSecretDrawerSettings);
  };
  const addNewFolder = async () => {
    drawerStore.open(createNewFolder);
  };

  let isIconChanged = false;
  let isHidden = false;
  const toggleIcon = () => {
    isIconChanged = !isIconChanged;
    isHidden = !isHidden;
  };
</script>

<div
  class="bread-crumbs-container flex justify-start items-center ml-8 mt-5 mb-5"
>
  <div class="flex items-center">
    <button
      class="bg-[#2D3552] px-[27.5px] py-2.5 rounded-full flex justify-center items-center text-[#828CAE]"
      on:click={addNewFolder}
    >
      Add Folder
      <Icon
        icon="ic:round-plus"
        color="#828CAE"
        class="h-5 w-5 ml-1 mt-[1px]"
      />
    </button>
    <div
      class="rounded-full h-11 w-11 bg-[#2D3552] justify-center items-center p-2.5 ml-2.5"
    >
      <!-- Add refresh function here -->
      <button>
        <Icon
          icon="bx:refresh"
          color="#828CAE"
          class="h-6 w-6 mt-[1px] rounded"
        />
      </button>
    </div>
    <!-- <BreadCrumbs /> -->
  </div>
</div>

<!-- Tree view wrapper -->
<div class="flex">
  <div class="min-w-[250px] max-w-sm rounded-[4px] self-start ml-9">
    <FolderListView />
  </div>
  <div
    class="flex flex-col flex-grow h-4/5 rounded-[4px] mx-8 contentWrapper bg-[#2E3654] relative"
  >
    <div class="flex flex-row justify-between px-8 items-center py-6">
      <div class="flex">
        <div class="flex items-center mr-4">
          <h1 class="mr-2 text-4xl">
            {`${$selectedFolder ? $selectedFolder.name : ""}`}
          </h1>
          <button
            class={`bg-[#3F4766] px-4 py-1.5 rounded-full flex justify-center items-center text-[#828CAE] mr-4 ${
              isIconChanged ? "text-[#fff]" : ""
            }`}
            on:click={toggleIcon}
          >
            <Icon icon="tdesign:share" class="h-[14px] w-[14px] mr-2" />
            Share
          </button>
        </div>
        <div class="flex rounded-full searchWrapper justify-between">
          <input
            type="search"
            class="variant-filled-surface border-0 rounded-l-full !bg-[#2E3654] flex-1"
            placeholder="Search..."
            id="search-input"
            on:change={(text) => {
              console.log(text);
            }}
          />
          <div
            class="flex items-center bg-[#2E3654] rounded-r-full px-3 justify-center"
          >
            <Icon icon="ic:baseline-search" class="h-6 w-6" color="#4C598B" />
          </div>
        </div>
      </div>
      {#if !isHidden}
        <div class="flex flex-row">
          <button
            class="bg-[#4E46DC] px-3 py-1.5 rounded-2xl flex justify-center items-center"
            on:click={createSecret}
            >Add new secret
            <Icon icon="ic:round-plus" class="h-5 w-5 ml-1" />
          </button>
        </div>
      {/if}
    </div>

    {#if !isHidden}
      <div class="folders-area mt-6">
        <SecretsCard />
      </div>
    {:else}
      <AccessList />
    {/if}
  </div>
</div>

<style>
  .searchWrapper {
    border: 1px solid #374165;
    width: 306px;
    /* border-radius: 4px; */
  }
  .contentWrapper {
    min-height: 60vh;
  }
</style>
