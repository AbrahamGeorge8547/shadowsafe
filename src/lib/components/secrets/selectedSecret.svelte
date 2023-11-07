<script>
    import Icon from "@iconify/svelte";
    import { clipboard } from "@skeletonlabs/skeleton";
    import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
    let value = "activity";
    export let selectedSecret;
</script>

<div class="container mx-auto p-4 card rounded-lg h-auto w-full !bg-[#262C44]">
    {#each selectedSecret?.credentials as field, index}
        <div class="relative mb-4">
            <label class="label block mb-2">{field.fieldKey}</label>
            <input
                class="input pr-10 w-full items-center !bg-[#262C44] border !border-[#4C598B]"
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
        <div class="flex justify-center items-center">
        <RadioGroup
            active="bg-[#4C598B]"
            hover="hover:variant-soft-primary"
            padding="px-4 py-1"
            background="bg-[#262C44] border !border-[#4C598B]"
            class="mb-2 "
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
                        : "text-[#828CAE]"}>Log</label
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
        </div>
        <div>
            {#if value == "activity"}
                <h2 class="card p-2 !bg-[#262C44] text-sm">
                    Richard Hendricks created folder 'PiedPiper/MainServer'.
                    <span class="block text-[#828CAE] text-xs">Just now</span>
                </h2>
                <h2 class="card p-2 !bg-[#262C44]  text-sm">
                    Dinesh Chugtai added secrets to 'PiedPiper/CompressionAlgorithm'.
                    <span class="block text-[#828CAE] text-xs">35 Minutes ago</span>
                </h2>
                <h2 class="card p-2 !bg-[#262C44]  text-sm">
                    Bertram Gilfoyle shared 'PiedPiper/MainServer' with Dinesh
                    Chugtai.'.r
                    <span class="block text-[#828CAE] text-xs">59 Minutes ago</span>
                </h2>
                <h2 class="card p-2 !bg-[#262C44]  text-sm">
                    Richard Hendricks revoked Dinesh's access to
                    'PiedPiper/MainServer'.
                    <span class="block text-[#828CAE] text-xs">1 hour ago</span>
                </h2>
                <h2 class="card p-2 !bg-[#262C44]  text-sm">
                    Jian-Yang created folder 'NewPiedPiper'.'.
                    <span class="block text-[#828CAE] text-xs">2 hour ago</span>
                </h2>
                <h2 class="card p-2 !bg-[#262C44]  text-sm">
                    Bertram Gilfoyle shared 'PiedPiper/MainServer' with
                    Jian-Yang.
                    <span class="block text-[#828CAE] text-xs">2 hour ago</span>
                </h2>
                <h2 class="card p-2 !bg-[#262C44]  text-sm">
                    Jian-Yang accessed 'PiedPiper/MainServer'.
                    <span class="block text-[#828CAE] text-xs">2 hour ago</span>
                </h2>
                <h2 class="card p-2 !bg-[#262C44]  text-sm">
                    Richard Hendricks created folder 'PiedPiper/MainServer'.
                    <span class="block text-[#828CAE] text-xs">2 hour ago</span>
                </h2>
            {:else}
                <h2 class="card p-2 !bg-[#262C44]  text-sm">Richard accessed
                    <span class="block text-[#828CAE] text-xs">1 hour ago</span>
                </h2>
                <h2 class="card p-2 !bg-[#262C44]  text-sm">Thanos accessed mind stone
                    <span class="block text-[#828CAE] text-xs">1 hour ago</span>
                </h2>
                <h2 class="card p-2 !bg-[#262C44]  text-sm">
                    Thanos accessed mind stone via extension
                    <span class="block text-[#828CAE] text-xs">1 hour ago</span>
                </h2>
            {/if}
        </div>
    </div>
</div>
