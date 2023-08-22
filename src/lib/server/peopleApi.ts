import { BASE_URL } from "../../config";
export const getPeople = async (offset: number, limit: number) => {
  const response = await fetch(
    `${BASE_URL}/users?_page=${offset}&_limit=${limit}`
  );
  const responseJson = await response.json();
  console.log(responseJson.data.users);
  return responseJson.data.users;
};

export const createPeople = async (user) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
};
