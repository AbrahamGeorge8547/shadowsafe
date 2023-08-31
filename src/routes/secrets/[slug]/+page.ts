import { get } from "svelte/store";
import { paginationStore, secretsStore, userStore } from "$lib/store";
import passwordStrength from "$lib/util/password.js";
import { redirect } from "@sveltejs/kit";
export async function load({ params, fetch }) {
  const slug: number = Number(params.slug);
  const limit = get(paginationStore).limit;
  const response = await fetch(
    `/api/secrets?offset=${slug - 1}&limit=${limit}`
  );

  const data = await response.json();
  if (data.status == 401) {
    userStore.set({});
    throw redirect(307, "/");
  }
  console.log(data);
  paginationStore.update((state) => ({
    ...state,
    offset: slug - 1,
    size: 100,
  }));
  const secrets = data.body.secrets;
  secretsStore.set(secrets);
  return { secrets, size: 100, fetch, page: slug };
}
