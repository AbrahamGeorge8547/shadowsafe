import { getPeople, createPeople } from "$lib/server/peopleApi";
import { json } from "@sveltejs/kit";

export async function GET({cookies, fetch}) {
  const token = String(cookies.get("token"));
  const people = await getPeople(fetch,  token);
  return json(people);
}
export async function POST(req) {
  const token = String(req.cookies.get("token"));
  const { request } = req;
  const user = await request.json();
  await createPeople(user, token);
  return json({ success: true });
}
