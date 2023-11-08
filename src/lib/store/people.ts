import { writable, get } from "svelte/store";
import { localStorageStore } from "@skeletonlabs/skeleton";
import type { User } from "$lib/dtos/user.dto";
export const peopleStore = writable([]);
export const selectedPerson = writable(null);
export const peopleList = writable<User[]>([]);
export const userStore = localStorageStore("user", {});
export const accessList = writable([]);
