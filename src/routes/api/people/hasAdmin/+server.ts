import { getPeople, createPeople } from "$lib/server/peopleApi";
import { json } from "@sveltejs/kit";

export async function GET(req) {
  return json({ body: { isAdmin: true } });
}
