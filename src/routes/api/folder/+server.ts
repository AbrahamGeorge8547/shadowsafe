import { getFolders, addFolder } from "$lib/server/folderApi";
import { json } from "@sveltejs/kit";

export async function GET({ fetch, cookies }) {
  const token = String(cookies.get("token"));
  const data = await getFolders(
    fetch,
    token,
  );
  return json(data);
}

export async function POST({ fetch, cookies, request }) {
  const token = String(cookies.get("token"));
  const payload = await request.json();
  const data = await addFolder(fetch, token, payload);
  return json(data);
}
