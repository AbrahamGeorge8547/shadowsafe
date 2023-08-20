import { getSecrets } from "$lib/server/secretsApi";
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
