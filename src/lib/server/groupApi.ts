
import { BASE_URL } from "../../config";
export const addGroups = async (fetch: any, token: string, payload: any) => {
    const response = await fetch(`${BASE_URL}/group`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await response.json();
    return data;
}

export const addUserToGroup = async (fetch: any, token: string, payload: any) => {
    const response = await fetch(`${BASE_URL}/groups/user`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    return await response.json()
}

export const getUsersOfGroup = async (fetch: any, groupId: string, token: string) => {

    const response = await fetch(`${BASE_URL}/group/${groupId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return await response.json();
}



export const getgroups = async (fetch: any, token: string) => {
    const response = await fetch(`${BASE_URL}/groups`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const data = await response.json();
    return data;
}