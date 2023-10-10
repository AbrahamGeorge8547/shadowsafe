import { getFolderStrucure, addFolder } from "$lib/server/secretsApi.js";
import { json } from "@sveltejs/kit";

export async function GET({ fetch, cookies }) {
  const token = String(cookies.get("token"));
  const data = await getFolderStrucure(
    fetch,
    token,
  );
  return json({
    body: {
      data,
    },
  });
}

export async function POST({ fetch, cookies, request }) {
  const token = String(cookies.get("token"));
  const payload = await request.json();
  const data = await addFolder(fetch, token, payload);
  return json(data);
}
