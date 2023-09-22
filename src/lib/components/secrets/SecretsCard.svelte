<script>
  import Icon from "@iconify/svelte";
  import { clipboard } from "@skeletonlabs/skeleton";
  import { fade } from "svelte/transition";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { currentParentNode } from "$lib/store/ui";
  import { secretsStore } from "$lib/store/secrets";
  import { onMount } from "svelte";
  const toastStore = getToastStore();

  let secretData = [];
  onMount(() => {
    const unsubscribe = currentParentNode.subscribe((value) => {
      if (value !== undefined && value !== null) {
        fetch(`/api/folder/${value}`)
          .then((response) => response.json())
          .then((data) => {
            secretData = data.data.secrets.map((ele) => {
              return { ...ele, id: ele._id.timestamp };
            });
            secretsStore.set(secretData);
            console.log(secretData);
            // Do something with the data
          });
      }
    });

    // Don't forget to unsubscribe when the component is destroyed
    return () => {
      unsubscribe();
    };
  });
  let timeoutID;
  let showCard = {};
  let hoveredCard;
  const toggleCard = (id) => {
    showCard = { ...showCard, [id]: !showCard[id] };
    hoveredCard = hoveredCard === id ? null : id;
  };
  const handleMouseEnter = (id) => {
    // Set up the timer
    timeoutID = setTimeout(() => {
      toggleCard(id);
    }, 500);
  };

  const handleMouseLeave = (id) => {
    // Clear the timer
    clearTimeout(timeoutID);
    if (showCard[id]) {
      // if the card is currently shown (expanded)
      toggleCard(id); // hide (collapse) it
    }
  };

  let showSensitive = {};

  const toggleVisibility = (id, index) => {
    showSensitive = {
      ...showSensitive,
      [`${id}_${index}`]: !showSensitive[`${id}_${index}`],
    };
  };
</script>

<div class="flex flex-wrap transition-all duration-500">
  {#each $secretsStore as secret}
    <div class="w-1/3 px-2 mb-4">
      <div
        class="container mx-auto p-4 relative card card-hover max-w-xs rounded-lg group h-auto"
        on:mouseenter={() => handleMouseEnter(secret.id)}
        on:mouseleave={() => handleMouseLeave(secret.id)}
      >
        {#each secret?.credentials as field, index}
          <div class="mb-4">
            <div class="relative">
              {#if field.sensitive && showCard[secret.id]}
                <div transition:fade={{ duration: 400 }}>
                  <label class="label block mb-2">{field.fieldKey}</label>
                  <input
                    class="input pr-16"
                    type={showSensitive[`${secret.id}_${index}`]
                      ? "text"
                      : "password"}
                    value={showSensitive[`${secret.id}_${index}`]
                      ? field.fieldValue
                      : "****"}
                  />
                  <button
                    on:click={() => toggleVisibility(secret.id, index)}
                    class="right-10 absolute top-[calc(50%+10px)]"
                  >
                    <Icon icon="emojione:eye" />
                  </button>
                  <button
                    use:clipboard={field.fieldValue}
                    class="right-2 absolute top-[calc(50%+10px)]"
                  >
                    <Icon icon="solar:copy-bold-duotone" />
                  </button>
                </div>
              {:else if !field.sensitive}
                <label class="label block mb-2">{field.fieldKey}</label>
                <input
                  class="input pr-10 w-full items-center"
                  type="text"
                  value={field.fieldValue}
                />
                <button
                  use:clipboard={field.fieldValue}
                  class="right-2 absolute top-[calc(50%+10px)]"
                >
                  <Icon icon="solar:copy-bold-duotone" />
                </button>
              {/if}
            </div>
          </div>
        {/each}
        <p class="mb-4">{secret.description}</p>
      </div>
    </div>
  {/each}
</div>
