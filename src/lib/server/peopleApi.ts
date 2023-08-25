import { BASE_URL } from "../../config";
export const getPeople = async (
  offset: number,
  limit: number,
  token: string
) => {
  const response = await fetch(
    `${BASE_URL}/users?_page=${offset}&_limit=${limit}`,
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
