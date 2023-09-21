<script>
  import Icon from "@iconify/svelte";
  import { clipboard } from "@skeletonlabs/skeleton";
  import { fade } from "svelte/transition";
  import { getToastStore } from "@skeletonlabs/skeleton";

  const toastStore = getToastStore();
  const secretsArray = [
    {
      fields: [
        {
          fieldName: "username",
          fieldValue: "john.doe@gmail.com",
          sensitive: false,
        },
        {
          fieldName: "password",
          fieldValue: "password123",
          sensitive: true,
        },
      ],
      description: "This is a username password secret",
      id: "id1",
    },
    {
      fields: [
        {
          fieldName: "API Key",
          fieldValue: "akjsdhaksjdh123",
          sensitive: true,
        },
      ],
      description: "This is an api key secret",
      id: "id2",
    },
    {
      fields: [
        {
          fieldName: "DB Connection String",
          fieldValue: "mongodb://localhost:27017",
          sensitive: false,
        },
        {
          fieldName: "DB User",
          fieldValue: "dbUser",
          sensitive: false,
        },
        {
          fieldName: "DB Password",
          fieldValue: "dbPassword",
          sensitive: true,
        },
      ],
      description: "This is a db secret",
      id: "id4",
    },
    {
      fields: [
        {
          fieldName: "username",
          fieldValue: "emily_smith@gmail.com",
          sensitive: false,
        },
        {
          fieldName: "password",
          fieldValue: "password456",
          sensitive: true,
        },
        {
          fieldName: "2FA Token",
          fieldValue: "twoFactorAuthToken",
          sensitive: true,
        },
      ],
      description: "This is a 2fa secret",
      id: "id3",
    },
    ,
  ];
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
  {#each secretsArray as secret}
    <div class="w-1/3 px-2 mb-4">
      <div
        class="container mx-auto p-4 relative card card-hover max-w-xs rounded-lg group h-auto"
        on:mouseenter={() => handleMouseEnter(secret.id)}
        on:mouseleave={() => handleMouseLeave(secret.id)}
      >
        {#each secret.fields as field, index}
          <div class="mb-4">
            <div class="relative">
              {#if field.sensitive && showCard[secret.id]}
                <div transition:fade={{ duration: 400 }}>
                  <label class="label block mb-2">{field.fieldName}</label>
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
                <label class="label block mb-2">{field.fieldName}</label>
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
