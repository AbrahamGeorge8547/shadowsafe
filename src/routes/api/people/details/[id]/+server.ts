import { getUserDetails } from "$lib/server/peopleApi";
import { json } from "@sveltejs/kit";

export async function GET({ cookies, fetch, params }) {
    const token = String(cookies.get("token"));
    const id = params.id
    const responseData = await getUserDetails(fetch, id, token);
    return json(responseData);
}

