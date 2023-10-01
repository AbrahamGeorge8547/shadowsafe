import { writable, get } from "svelte/store";
import { localStorageStore } from "@skeletonlabs/skeleton";
export const peopleStore = writable([]);
export const selectedPerson = writable(null);
export const peoplePaginationStore = writable({
  offset: 0,
  limit: 10,
  size: 0,
  amounts: [5, 10, 20, 40],
});


export const peopleList = writable([]);
export const userStore = localStorageStore("user", {});
export const groupList = writable(["Avengers", "Tanos"]);
