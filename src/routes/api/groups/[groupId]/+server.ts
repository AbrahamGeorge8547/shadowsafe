import { json } from "@sveltejs/kit";
import { addUserToGroup, getUsersOfGroup } from "$lib/server/groupApi";

export async function GET({ fetch, cookies, params }) {
  const token = String(cookies.get('token'));
  const groupId = params.groupId;
  const response = await getUsersOfGroup(fetch, groupId, token);
  console.log(response)
  return json(response.data);
}

export async function POST({ fetch, cookies, request, params }) {
  const token = String(cookies.get("token"));
  const groupId = params.groupId;
  const payload = await request.json();
  const data = await addUserToGroup(fetch, token, { ...payload, groupId });
  return json(data);
}

