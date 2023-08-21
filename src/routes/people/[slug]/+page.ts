import { get } from "svelte/store";
import { peopleStore, peoplePaginationStore } from "$lib/store";
export async function load({ params, fetch }) {
  const slug: number = Number(params.slug);
  const limit = get(peoplePaginationStore).limit;
  const response = await fetch(`/api/people?offset=${slug - 1}&limit=${limit}`);
  const data = await response.json();
  peoplePaginationStore.update((state) => ({
    ...state,
    offset: slug - 1,
    size: 100,
  }));
  peopleStore.set(data.body.people);
  return { people: data.body.people, size: 100, fetch, page: slug };
}
