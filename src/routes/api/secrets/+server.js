import { getSecrets } from '$lib/server/secretsApi';
import { json } from '@sveltejs/kit';
export async function GET(req) {
  const secrets = await getSecrets();
  return json({
    body: {
      secrets
    }
  });
}

