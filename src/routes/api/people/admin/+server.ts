import { json } from "@sveltejs/kit";

export async function POST(req) {
  const { request } = req;
  const admin = await request.json();
  return json({ success: true });
}
