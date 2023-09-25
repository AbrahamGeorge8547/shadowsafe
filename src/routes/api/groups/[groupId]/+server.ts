import { json } from "@sveltejs/kit";
import { addUserToGroup } from "$lib/server/peopleApi";

export async function GET({ fetch, cookies }) {
}

 export async function POST({ fetch, cookies, request, params }) {
   const token = String(cookies.get("token"));
   const groupId = params.groupId;
   const payload = await request.json();
   const data = await addUserToGroup(fetch, token, {...payload, groupId});
   console.log(data);
   return json(data);
 }
