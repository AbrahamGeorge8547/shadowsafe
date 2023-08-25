import { getPeople, createPeople } from "$lib/server/peopleApi";
import { json } from "@sveltejs/kit";

export async function GET(req) {
  console.log(req.cookies.get("token"));
  const offset = Number(req.url.searchParams.get("offset"));
  const limit = Number(req.url.searchParams.get("limit"));
  const people = await getPeople(offset, limit);
  return json({
    body: {
      people,
    },
  });
}
export async function POST(req) {
  const { request } = req;
  const user = await request.json();
  await createPeople(user);
  return json({ success: true });
}
