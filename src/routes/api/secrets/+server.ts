import { getSecrets, createSecret } from "$lib/server/secretsApi";
import { json } from "@sveltejs/kit";
export async function GET(req) {
  const offset = Number(req.url.searchParams.get("offset"));
  const limit = Number(req.url.searchParams.get("limit"));
  const secrets = await getSecrets(offset, limit);
  return json({
    body: {
      secrets,
    },
  });
}
export async function POST(req) {
  const { request } = req;
  const secret = await request.json();
  await createSecret({ ...secret, id: 32 });
  return json({ success: true });
}
