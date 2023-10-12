import { getSecretsByFolder, addUsersToFolder, getAccessList } from "$lib/server/secretsApi";
import { json } from "@sveltejs/kit";
export async function GET({ fetch, cookies, params, request }) {
  const { folderId } = params;
  const queryParams = new URL(request.url).searchParams;
  const secrets = queryParams.get("access");
  const token = String(cookies.get("token"));
  if (secrets) {
    const response = await getAccessList(fetch, folderId, token)
    console.log(response);
    return json({ users: response.data.users })
  }
  const response = await getSecretsByFolder(fetch, folderId, token);
  return json({ data: response.data });
}

// export async function PUT(req) {
//   const { secretId } = req.params;
//   const { request } = req;
//   const token = String(req.cookies.get("token"));
//   const secret = await request.json();
//   delete secret.id;
//   await updateSecret(secretId, secret, token);
//   // Code to update the secret in your database
//   // e.g., using fetch to make a request to your backend service

//   return json({ success: true });
// }

export async function POST({ fetch, cookies, request }) {
  const token = String(cookies.get("token"));
  const payload = await request.json();
  console.log(payload, 'SERVER')
  const response = await addUsersToFolder(fetch, payload, token)
  return json({ success: true })
}
