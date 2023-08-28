import { writable, get } from "svelte/store";

export const secretsStore = writable([]);
export const selectedSecret = writable(null);
export const paginationStore = writable({
  offset: 0,
  limit: 10,
  size: 0,
  amounts: [5, 10, 20, 40],
});

export const loadSecrets = async () => {
  const limit = get(paginationStore).limit;
  const offset = get(paginationStore).offset;
  console.log("reloading secrets....");
  const response = await fetch(`/api/secrets?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  const secrets = data.body.secrets;
  secretsStore.set(secrets);
};
