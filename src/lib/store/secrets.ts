import { writable, get } from "svelte/store";

export const secretsStore = writable([]);
export const selectedSecret = writable(null);
export const paginationStore = writable({
  offset: 0,
  limit: 5,
  size: 0,
  amounts: [1, 2, 5, 10],
});

export const loadSecrets = async () => {
  const limit = get(paginationStore).limit;
  const offset = get(paginationStore).offset;
  console.log("reloading secrets....");
  const response = await fetch(`/api/secrets?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  secretsStore.set(data.body.secrets);
};
