import { get } from "svelte/store";
import { paginationStore } from "$lib/store";
export async function load({ params, fetch }) {
  const slug: number = Number(params.slug);
  const limit = get(paginationStore).limit;
  const offset = get(paginationStore).offset;
  paginationStore.update((state) => ({ ...state, offset: slug }));
  const response = await fetch(`/api/secrets?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  return { secrets: data.body.secrets, size: 100, fetch, page: slug };
}
