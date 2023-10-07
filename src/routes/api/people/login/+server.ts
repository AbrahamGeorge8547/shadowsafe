import { json } from "@sveltejs/kit";
import { login } from "$lib/server/authApi";

export async function POST(req) {
  const token = String(req.cookies.get("token"));
  console.log('Trying to login')
  const { request, fetch } = req;
  const user = await request.json();
  const data = await login(fetch, user);
  if (data.success == false) {
    return json(data);
  }
  return json({ success: true, data });
}
