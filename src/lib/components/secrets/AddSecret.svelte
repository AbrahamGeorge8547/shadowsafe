<script>
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { secretFields, currentParentNode } from "$lib/store/ui";
  import { popup } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
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
        console.log(data, "ADD SECRET")
        const secretData = data.data.secrets.map((ele) => {
          return { ...ele, id: ele._id.timestamp };
        });
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
      { fieldKey: "", fieldValue: "", sensitive: false },
      { fieldKey: "", fieldValue: "", sensitive: false },
    ]);
  });
</script>

<div>
  {#each $secretFields as field, index}
    <div
      class="field-container card-hover p-4 rounded-md shadow hover:shadow-lg transition relative mt-4 mb-4"
    >
      <button
        class="absolute top-0 right-0 p-2"
        on:click={() => removeField(index)}
      >
        <Icon icon="emojione:cross-mark-button" />
      </button>
      <div transition:fade class="flex items-center justify-between mt-4">
        <input
          class="input flex-grow mr-2"
          id={`key-${index}`}
          type="text"
          placeholder="Field Name"
          bind:value={field.fieldKey}
        />
        <input
          class="input flex-grow mr-2"
          id={`value-${index}`}
          type="text"
          placeholder="Field Value"
          bind:value={field.fieldValue}
        />
        <div use:popup={popupHover}>
          <SlideToggle
            class="self-center ml-4"
            name="slide"
            bind:checked={field.sensitive}
          />
        </div>
      </div>
    </div>
  {/each}
  <label class="label m-4 card-hover"
    >Description: <textarea
      class="textarea"
      rows="2"
      bind:value={description}
    /></label
  >
  <div class="flex justify-end mt-4 mr-4">
    <button class="btn variant-filled-secondary ml-2" on:click={addField}
      >Add Field</button
    >
    <button class="btn variant-outline-secondary ml-2" on:click={saveSecret}
      >Save All</button
    >
  </div>
</div>

<div class="card p-4 variant-filled-secondary" data-popup="popupHover">
  <p>toggle if sensitive</p>
  <div class="arrow variant-filled-secondary" />
</div>
