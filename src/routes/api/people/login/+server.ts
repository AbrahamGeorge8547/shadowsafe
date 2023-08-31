import { json } from "@sveltejs/kit";
import { login } from "$lib/server/authApi";

export async function POST(req) {
  const token = String(req.cookies.get("token"));
  const { request } = req;
  const user = await request.json();
  const data = await login(user);
  if (data.success == false) {
    return json(data);
  }
  return json({ success: true, data });
}
