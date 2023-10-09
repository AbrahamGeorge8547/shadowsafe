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

export const createSecret = async (fetch: any, secret, token: string) => {
  try {
    console.log('Create Secret', secret)
    const response = await fetch(`${BASE_URL}/secrets`, {
      method: "POST",
      body: JSON.stringify({ ...secret, id: "" }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(await response.json());
  } catch (error) {
    console.log(error);
  }
};

export const getFolderStrucure = async (
  fetch: any,
  token: string,
) => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers,
      redirect: "follow",
    };

    const response = await fetch(
      `${BASE_URL}/folders/structure`,
      requestOptions
    );

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error, "ERR");
  }
};

export const addFolder = async (fetch: any, token: string, body: any) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers,
  };

  const response = await fetch(`${BASE_URL}/folders`, options);
  const data = await response.json();
  return data.data;
};

export const getSecretsByFolder = async (
  fetch: any,
  folderId: string,
  token: string
) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const response = await fetch(`${BASE_URL}/folders/${folderId}`, { headers });
  const data = await response.json();
  return data;
};
