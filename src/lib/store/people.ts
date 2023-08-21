import { writable, get } from "svelte/store";

export const peopleStore = writable([]);
export const selectedPerson = writable(null);
export const peoplePaginationStore = writable({
  offset: 0,
  limit: 5,
  size: 0,
  amounts: [1, 2, 5, 10],
});

export const loadPeople = async (fetch: any) => {
  const limit = get(peoplePaginationStore).limit;
  const offset = get(peoplePaginationStore).offset;
  console.log("reloading people....");
  const response = await fetch(`/api/people?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  peopleStore.set(data.body.people);
};
