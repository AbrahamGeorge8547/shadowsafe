
import { BASE_URL } from "../../config";
export const getPeople = async (fetch: any,
  token: string
) => {
  const response = await fetch(
    `${BASE_URL}/users?_page=0&_limit=100`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const responseJson = await response.json();

  return responseJson.data.users;
};

export const createPeople = async (user, token: string) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getgroups = async (fetch: any, token: string) => {
  const response = await fetch(`${BASE_URL}/users/group`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  console.log('fetching groups...')
  const data = await response.json();
  console.log(data)
  return data;
}


export const addGroups = async (fetch: any, token: string, payload: any) => {
  console.log('Calling AddGroups')
  const response = await fetch(`${BASE_URL}/groups`, {
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

  const response = await fetch(`${BASE_URL}/groups/user/${groupId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return await response.json();
}


export const getUserDetails = async (fetch: any, userId: string, token: string) => {

  const response = await fetch(`${BASE_URL}/users/group?id=${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return await response.json();
}


export const removeUserFromGroup = async (fetch: any, userId: string, groupId: string, token: string) => {
  const response = await fetch(`${BASE_URL}/groups/${groupId}/user/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return await response.json();
}