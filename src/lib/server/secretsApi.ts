import { BASE_URL } from "../../config";

export const getSecrets = async (offset: number, limit: number, fetch: any) => {
  try {
    const response = await fetch(
      `${BASE_URL}/secrets?_page=${offset}&_limit=${limit}&search=`
    );
    const responseData = await response.json();
    console.log(responseData);
    return responseData.data.secrets;
  } catch (error) {
    console.log(error);
  }
};

export const getSecretById = async (id) => {
  console.log();
  console.log(`${BASE_URL}/secrets/${id}`);
  const response = await fetch(`${BASE_URL}/secrets/${id}`);

  const responseJson = await response.json();
  return responseJson.data;
};

export const updateSecret = async (id, secret) => {
  console.log(secret);
  const response = await fetch(`${BASE_URL}/secrets/${id}`, {
    method: "PUT",
    body: JSON.stringify(secret),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createSecret = async (secret) => {
  try {
    const response = await fetch(`${BASE_URL}/secrets`, {
      method: "POST",
      body: JSON.stringify({ ...secret, id: "" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
