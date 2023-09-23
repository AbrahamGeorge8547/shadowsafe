import { getgroups, addGroups } from "$lib/server/peopleApi.js";
import { json } from "@sveltejs/kit";

export async function GET({ fetch, cookies }) {
  const token = String(cookies.get("token"));
  const data = await getgroups(
    fetch,
    token,
  );
  return json(data);
}

 export async function POST({ fetch, cookies, request }) {
   const token = String(cookies.get("token"));
   const payload = await request.json();
   console.log(payload)
   const data = await addGroups(fetch, token, payload);
   return json({
     body: {
       data,
     },
   });
 }
