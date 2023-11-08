
import { localStorageStore } from "@skeletonlabs/skeleton";
import { writable, get } from "svelte/store";
import type { Group } from "$lib/dtos/group.dto";
export const groupList = writable<Group[]>([]);
export const selectedGroup = localStorageStore<Group>("selectedGroup", { id: 'allUsers', name: 'AllUsers' });