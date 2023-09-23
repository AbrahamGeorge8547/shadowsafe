import { getSecrets, createSecret } from "$lib/server/secretsApi";
import { json } from "@sveltejs/kit";
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
export async function POST({ fetch, cookies, request }) {
  const token = String(cookies.get("token"));
  const secret = await request.json();
  await createSecret(fetch, { ...secret }, token);
  return json({ success: true });
}
