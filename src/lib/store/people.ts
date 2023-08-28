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

export const loadPeople = async () => {
  const limit = get(peoplePaginationStore).limit;
  const offset = get(peoplePaginationStore).offset;
  console.log("reloading people....");
  const response = await fetch(`/api/people?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  peopleStore.set(data.body.people);
};
export const userStore = localStorageStore("user", {});
