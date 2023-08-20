import { getSecretById, updateSecret } from "$lib/server/secretsApi";
import { json } from "@sveltejs/kit";
export async function GET(req) {
  const { params } = req;
  const { secretId } = params;
  const secret = await getSecretById(secretId);
  return json({ secret });
}

export async function PUT(req) {
  const { secretId } = req.params;
  const { request } = req;
  const secret = await request.json();
  delete secret.id;
  await updateSecret(secretId, secret);
  // Code to update the secret in your database
  // e.g., using fetch to make a request to your backend service

  return json({ success: true });
}
