import { json } from "@sveltejs/kit";
import { login } from "$lib/server/authApi";

export async function POST(req) {
  const { request } = req;
  const user = await request.json();
  const data = await login(user);
  return json({ success: true, data });
}
