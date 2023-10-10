import { writable, get } from "svelte/store";
import { localStorageStore } from "@skeletonlabs/skeleton";
export const peopleStore = writable([]);
export const selectedPerson = writable(null);
export const peopleList = writable([]);
export const userStore = localStorageStore("user", {});
export const groupList = writable([]);
export const accessList = writable([]);
