import { getSecretById, updateSecret } from "$lib/server/secretsApi";
import { json } from "@sveltejs/kit";
export async function GET(req) {
  const { params } = req;
  const { secretId } = params;
  const token = String(req.cookies.get("token"));
  const secret = await getSecretById(secretId, token);
  return json({ secret });
}

export async function PUT(req) {
  const { secretId } = req.params;
  const { request } = req;
  const token = String(req.cookies.get("token"));
  const secret = await request.json();
  delete secret.id;
  await updateSecret(secretId, secret, token);
  // Code to update the secret in your database
  // e.g., using fetch to make a request to your backend service

  return json({ success: true });
}
