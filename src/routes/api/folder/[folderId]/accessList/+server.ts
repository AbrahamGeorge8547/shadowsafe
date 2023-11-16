
import { getAccessList } from "$lib/server/secretsApi";
import { json } from "@sveltejs/kit";


export async function GET({ fetch, cookies, params, request }) {

    const { folderId } = params;
    const token = String(cookies.get("token"));
    const response = await getAccessList(fetch, folderId, token);
    return json({ data: response.data });
}