import { removeUserFromGroup } from '$lib/server/peopleApi.js';
import { json } from '@sveltejs/kit';
export async function DELETE({ fetch, cookies, params }) {
    const token = String(cookies.get('token'))
    const userId = params.userId;
    const groupId = params.groupId;
    const response = await removeUserFromGroup(fetch, userId, groupId, token)
    return json(response)

}