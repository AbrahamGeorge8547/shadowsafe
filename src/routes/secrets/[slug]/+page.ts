import { get } from "svelte/store";
import { paginationStore, secretsStore } from "$lib/store";
import passwordStrength from "$lib/util/password.js";
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
  const secrets = data.body.secrets.map((secret) => {
    const strength = passwordStrength(secret.password);
    return { ...secret, strength };
  });
  secretsStore.set(secrets);
  return { secrets, size: 100, fetch, page: slug };
}
