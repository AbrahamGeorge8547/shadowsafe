<script>
    import Icon from "@iconify/svelte";
    import { clipboard } from "@skeletonlabs/skeleton";
    import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
    let value = "activity";
    export let selectedSecret;
</script>

<div class="container mx-auto p-4 card rounded-lg h-auto w-full bg-[#2E3654]">
    {#each selectedSecret?.credentials as field, index}
        <div class="relative mb-4">
            <label class="label block mb-2">{field.fieldKey}</label>
            <input
                class="input pr-10 w-full items-center bg-[#2E3654]"
                type={field.sensitive ? "password" : "text"}
                value={field.fieldValue}
            />
            <button
                use:clipboard={field.fieldValue}
                class="right-2 absolute top-[calc(50%+10px)]"
            >
                <Icon icon="solar:copy-bold-duotone" />
            </button>
        </div>
    {/each}
    <p class="mb-4">{selectedSecret.description}</p>
    <div style="border: 1px solid #2A314C;">
        <RadioGroup
            active="bg-[#4C598B]"
            hover="hover:variant-soft-primary"
            padding="px-4 py-1"
            background="bg-[#262C44]"
            class="ml-9"
        >
            <RadioItem
                bind:group={value}
                name="justify"
                value="access"
                id="access"
            >
                <label
                    for="access"
                    class={value === "access"
                        ? "text-[#fff]"
                        : "text-[#828CAE]"}>Access Log</label
                >
            </RadioItem>
            <RadioItem
                bind:group={value}
                name="justify"
                value="activity"
                id="activity"
            >
                <label
                    for="activity"
                    class={value === "activity"
                        ? "text-[#fff]"
                        : "text-[#828CAE]"}>Activity</label
                >
            </RadioItem>
        </RadioGroup>
        <div>
            {#if value == "activity"}
                <h2 class="card p-2">Thanos added Gamora to this folder</h2>
                <h2 class="card p-2">Thanos removed Thor from this folder</h2>
            {:else}
                <h2 class="card p-2">Thanos accessed time stone</h2>
                <h2 class="card p-2">Thanos accessed mind stone</h2>
                <h2 class="card p-2">
                    Thanos accessed mind stone via extension
                </h2>
            {/if}
        </div>
    </div>
</div>
