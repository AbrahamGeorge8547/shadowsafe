import { get } from "svelte/store";
import { paginationStore, secretsStore } from "$lib/store";
export async function load({ params, fetch }) {
  const slug: number = Number(params.slug);
  const limit = get(paginationStore).limit;
  const response = await fetch(
    `/api/secrets?offset=${slug - 1}&limit=${limit}`
  );
  const data = await response.json();
  paginationStore.update((state) => ({
    ...state,
    offset: slug - 1,
    size: 100,
  }));
  secretsStore.set(data.body.secrets);
  return { secrets: data.body.secrets, size: 100, fetch, page: slug };
}
