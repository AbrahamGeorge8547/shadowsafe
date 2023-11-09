import { getSecretById, updateSecret } from "$lib/server/secretsApi";
import { json } from "@sveltejs/kit";
export async function GET(req) {
  const { params, fetch } = req;
  const { secretId } = params;
  const token = String(req.cookies.get("token"));
  const credential = await getSecretById(fetch, secretId, token);
  return json({ ...credential });
}

export async function PUT(req) {
  const { secretId } = req.params;
  const { request } = req;
  const token = String(req.cookies.get("token"));
  const secret = await request.json();
  delete secret.id;
  await updateSecret(secretId, secret, token);

  return json({ success: true });
}
