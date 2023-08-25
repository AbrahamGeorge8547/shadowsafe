import { BASE_URL } from "../../config";

export const getSecrets = async (
  offset: number,
  limit: number,
  token: string
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/secrets?_page=${offset}&_limit=${limit}&search=`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const responseData = await response.json();

    return responseData.data.secrets;
  } catch (error) {
    console.log(error);
  }
};

export const getSecretById = async (id: number, token: string) => {
  const response = await fetch(`${BASE_URL}/secrets/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const responseJson = await response.json();
  return responseJson.data;
};

export const updateSecret = async (id, secret, token: string) => {
  const response = await fetch(`${BASE_URL}/secrets/${id}`, {
    method: "PUT",
    body: JSON.stringify(secret),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createSecret = async (secret, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/secrets`, {
      method: "POST",
      body: JSON.stringify({ ...secret, id: "" }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
