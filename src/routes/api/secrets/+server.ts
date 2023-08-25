import { getSecrets, createSecret } from "$lib/server/secretsApi";
import { json } from "@sveltejs/kit";
export async function GET(req) {
  const token = String(req.cookies.get("token"));
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
