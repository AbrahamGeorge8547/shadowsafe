
import { BASE_URL } from "../../config";
export const getPeople = async (fetch:any,
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
  const response = await fetch(`${BASE_URL}/groups`, {
    headers: {
      Authorization:  `Bearer ${token}`
    }
  })
  const data = await response.json();
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

