import { getFolderStrucure, addFolder } from "$lib/server/secretsApi.js";
import { json } from "@sveltejs/kit";

export async function GET({ fetch, cookies }) {
  const token = String(cookies.get("token"));
  const data = await getFolderStrucure(
    fetch,
    token,
    "650a9fc08d21ba79d1bd5ab5"
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
  return json({
    body: {
      data,
    },
  });
}
