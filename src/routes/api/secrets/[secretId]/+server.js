import { getSecretById } from '$lib/server/secretsApi';
import { json } from '@sveltejs/kit';
export async function GET(req) {
    const { params } = req;
    const { secretId } = params;
    const secret = await getSecretById(secretId);
    return json({ secret });
}

