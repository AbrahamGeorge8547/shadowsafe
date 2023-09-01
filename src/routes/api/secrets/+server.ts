import { login } from "$lib/server/authApi.js";
import { getSecrets, createSecret } from "$lib/server/secretsApi";
import { userStore } from "$lib/store/people.js";
import { json, redirect } from "@sveltejs/kit";
export async function GET(req) {
  const token = req.cookies.get("token");
  if (!token) {
    return json({
      status: 401,
      body: { success: false, message: "token not found" },
    });
  }
  const offset = Number(req.url.searchParams.get("offset"));
  const limit = Number(req.url.searchParams.get("limit"));
  const secrets = await getSecrets(offset, limit, token);
  return json({
    body: {
      secrets,
    },
  });
}
export async function POST(req) {
  const token = String(req.cookies.get("token"));
  const { request } = req;
  const secret = await request.json();
  await createSecret({ ...secret }, token);
  return json({ success: true });
}
