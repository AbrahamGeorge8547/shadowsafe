import { json } from "@sveltejs/kit";
import { addUserToGroup, getUsersOfGroup } from "$lib/server/peopleApi";

export async function GET({ fetch, cookies, params }) {
  const token = String(cookies.get('token'));
  const groupId = params.groupId;
  const response = await getUsersOfGroup(fetch, groupId, token);
  return json(response);
}

export async function POST({ fetch, cookies, request, params }) {
  const token = String(cookies.get("token"));
  const groupId = params.groupId;
  const payload = await request.json();
  const data = await addUserToGroup(fetch, token, { ...payload, groupId });
  console.log(data);
  return json(data);
}
