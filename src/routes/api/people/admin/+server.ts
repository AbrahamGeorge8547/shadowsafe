import { json } from "@sveltejs/kit";

export async function POST(req) {
  const token = String(req.cookies.get("token"));
  const { request } = req;
  const admin = await request.json();
  return json({ success: true });
}
