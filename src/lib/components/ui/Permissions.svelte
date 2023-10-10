<script>
    import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
    import { droppedItem, selectedPermission } from "$lib/store/ui";
    import { getDrawerStore } from "@skeletonlabs/skeleton";

    const drawerStore = getDrawerStore();
    let value = "MEMBER";
    const confirmPermission = () => {
        selectedPermission.set(value);
        drawerStore.close();
    };

    const cancelDrop = () => {
        selectedPermission.set("Cancelled");
        drawerStore.close();
    };
</script>


<div class="p-2 bg-[#3A4468]">

    <div class="mb-6 mt-3 ml-3">
    <svg width="36" height="30" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.9987 0C18.9695 0 19.8651 0.502232 20.3573 1.32589L35.124 25.9687C35.623 26.7991 35.623 27.8237 35.1377 28.654C34.6523 29.4844 33.743 30 32.7654 30H3.23205C2.25444 30 1.34519 29.4844 0.859807 28.654C0.374421 27.8237 0.381257 26.7924 0.87348 25.9687L15.6402 1.32589C16.1324 0.502232 17.028 0 17.9987 0ZM17.9987 8.57143C17.0895 8.57143 16.358 9.28795 16.358 10.1786V17.6786C16.358 18.5692 17.0895 19.2857 17.9987 19.2857C18.908 19.2857 19.6395 18.5692 19.6395 17.6786V10.1786C19.6395 9.28795 18.908 8.57143 17.9987 8.57143ZM20.1864 23.5714C20.1864 23.0031 19.9559 22.4581 19.5456 22.0562C19.1354 21.6543 18.5789 21.4286 17.9987 21.4286C17.4185 21.4286 16.8621 21.6543 16.4518 22.0562C16.0416 22.4581 15.8111 23.0031 15.8111 23.5714C15.8111 24.1397 16.0416 24.6848 16.4518 25.0867C16.8621 25.4885 17.4185 25.7143 17.9987 25.7143C18.5789 25.7143 19.1354 25.4885 19.5456 25.0867C19.9559 24.6848 20.1864 24.1397 20.1864 23.5714Z" fill="white"/>
        </svg>
    </div> 

    <h1 class="mb-3 ml-3 font-normal text-2xl">Assign Role</h1>

    <h2 class="w-[250px] mb-2 ml-3 font-light text-sm">
        Select the role you want to assign to {$droppedItem.name}
    </h2>

    <div class="mb-4 mt-4">
        <RadioGroup border="border border-[#4C598B4D]" rounded="rounded-container-token" display="flex-col"
        background="bg-[#3A4468]" class="px-4">
           
            <RadioItem bind:group={value} name="justify" value="MEMBER" rounded="rounded-2xl" class="flex flex-start text-sm my-2 py-[6px]"
                >View Only</RadioItem
            >
            <RadioItem bind:group={value} name="justify" value="MANAGER"  rounded="rounded-2xl" class="flex flex-start text-sm my-2 py-[6px]"
                >Manage</RadioItem
            >
            <RadioItem bind:group={value} name="justify" value="OWNER"  rounded="rounded-2xl"
            class="flex flex-start text-sm my-2 py-[6px]">Owner</RadioItem>
    
           </RadioGroup>
    </div>

    <div class="flex flex-col ml-3">
        <button class="btn-md bg-[#4E46DC] rounded-3xl w-[70%] mb-4 text-sm" on:click={confirmPermission}>
            Confirm
        </button>

        <button class="btn-md bg-[#828CAE]  rounded-3xl w-[70%] mb-2 text-sm" on:click={cancelDrop}>
            Cancel
        </button>
   </div> 

</div>