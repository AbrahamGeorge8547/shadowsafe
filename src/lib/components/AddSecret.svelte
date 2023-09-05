<script>
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { secretFields } from "$lib/store/ui";
  import { popup } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  let newField = { fieldName: "", fieldValue: "", sensitive: false };

  const addField = () => {
    secretFields.update((fields) => {
      return [...fields, newField];
    });
  };

  const removeField = (index) => {
    secretFields.update((fields) => {
      fields.splice(index, 1);
      return fields;
    });
  };
  let popupHover = {
    event: "hover",
    target: "popupHover",
    placement: "top",
  };
  onMount(() => {
    console.log("Mounting...");
  });
</script>

<div>
  {#each $secretFields as field, index}
    <div
      class="field-container card-hover p-4 rounded-md shadow hover:shadow-lg transition"
    >
      <div class="flex items-start justify-between">
        <div class="flex flex-col">
          <label class="label mb-2" for={`key-${index}`}>Field Name:</label>
          <input
            class="input mb-4"
            id={`key-${index}`}
            type="text"
            bind:value={field.key}
          />
          <label class="label mb-2" for={`value-${index}`}>Field Value:</label>
          <div class="flex justify-between mt-4">
            <input
              class="input"
              id={`value-${index}`}
              type="text"
              bind:value={field.value}
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
      </div>
      <button
        class="btn btn-outline-secondary mt-4"
        on:click={() => removeField(index)}>Remove</button
      >
    </div>
  {/each}
  <div class="flex justify-between mt-4">
    <button class="btn btn-outline-primary" on:click={addField}
      >Add Field</button
    >
    <button class="btn btn-outline-success">Save All</button>
  </div>
</div>

<div class="card p-4 variant-filled-secondary" data-popup="popupHover">
  <p>toggle if sensitive</p>
  <div class="arrow variant-filled-secondary" />
</div>
