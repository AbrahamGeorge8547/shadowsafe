<script>
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { secretFields, currentParentNode } from "$lib/store/ui";
  import { popup } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import { get } from "svelte/store";
  import { secretsStore } from "$lib/store/secrets";
  const drawerStore = getDrawerStore();

  let description = "";
  const addField = () => {
    let newField = { fieldKey: "", fieldValue: "", sensitive: false };
    secretFields.update((fields) => {
      return [...fields, newField];
    });
  };

  const removeField = (index) => {
    secretFields.update((fields) => {
      fields.splice(index, 1);
      return [...fields];
    });
  };

  const saveSecret = async () => {
    const credentials = get(secretFields);
    let data;
    data = JSON.stringify({
      name: "test",
      credentials,
      parent: get(currentParentNode),
      description,
    });
    const response = await fetch("/api/secrets", {
      method: "POST",
      body: data,
    });
    fetch(`/api/folder/${$currentParentNode}`)
      .then((response) => response.json())
      .then((data) => {
        const secretData = data.data.secrets;
        secretsStore.set(secretData);
      });
    drawerStore.close();
  };
  let popupHover = {
    event: "hover",
    target: "popupHover",
    placement: "top",
  };
  onMount(() => {
    secretFields.set([
      { fieldKey: "Username", fieldValue: "", sensitive: false },
      { fieldKey: "Password", fieldValue: "", sensitive: true },
      { fieldKey: "URL", fieldValue: "", sensitive: false },
    ]);
  });
</script>

<div class="mb-2 p-4 mx-6 mt-6">
  <p class="font-normal text-4xl">Add secret</p>
</div>
<div class="mx-6">
  {#each $secretFields as field, index}
    <div class="field-container rounded-sm transition relative">
      <div class="flex items-center justify-between p-4">
        <input
          class="flex-grow mr-2 bg-[#2E3654] rounded-full w-[256px] h-10"
          id={`key-${index}`}
          type="text"
          placeholder="Username"
          bind:value={field.fieldKey}
        />
        <input
          class="flex-grow mr-2 bg-[#2E3654] rounded-full w-[256px] h-10"
          id={`value-${index}`}
          type="text"
          placeholder="Enter value"
          bind:value={field.fieldValue}
        />
        <div use:popup={popupHover} class="flex justify-center">
          <SlideToggle
            background="bg-[#4C598B]"
            active="bg-[#4E46DC]"
            name="slide"
            size="sm"
            bind:checked={field.sensitive}
          />
        </div>
        <button
          class="rounded-full border border-[#4C598B] w-10 h-10 flex justify-center items-center ml-5"
          on:click={() => removeField(index)}
        >
          <Icon icon="mi:delete" color="#828CAE" />
        </button>
      </div>
    </div>
  {/each}
  <!-- Add secret btn -->
  <div class="flex mr-24">
    <button
      class="py-2 m-4 bg-[#363F61] flex-1 flex justify-center items-center rounded-lg border-dashed border border-[#3D476E]"
      on:click={addField}
    >
      <Icon icon="fa6-solid:plus" color="#828CAE" />
    </button>
  </div>
</div>
<!-- Text Area -->
<div class="mx-6 px-4 py-5 mr-[120px]">
  <textarea
    id="textarea"
    class="textarea"
    rows="2"
    bind:value={description}
    placeholder="Enter description about the secret"
  />
</div>
<div class="flex justify-start mt-4 pl-4 ml-6">
  <button
    class="bg-[#4E46DC] px-[52px] py-2.5 rounded-full mb-6"
    on:click={saveSecret}>Add secret</button
  >
</div>

<div class="card p-4 variant-filled-secondary" data-popup="popupHover">
  <p>toggle if sensitive</p>
  <div class="arrow variant-filled-secondary" />
</div>

<style>
  #textarea {
    background: #2e3654;
  }
</style>
