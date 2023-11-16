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

export const getSecretById = async (fetch: any, id: string, token: string) => {
  const response = await fetch(`${BASE_URL}/credential/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const responseJson = await response.json();
  return responseJson.data;
};

export const updateSecret = async (id: string, secret, token: string) => {
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




export const getSecretsByFolder = async (
  fetch: any,
  folderId: string,
  token: string
) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const response = await fetch(`${BASE_URL}/secrets?folderId=${folderId}`, { headers });
  const data = await response.json();
  return data;
};


export const addUsersToFolder = async (fetch: any, payload: any, token: string) => {

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const response = await fetch(`${BASE_URL}/access`, { headers, method: 'POST', body: JSON.stringify(payload) });
  const responseJson = await response.json();
  return responseJson;
}

export const getAccessList = async (fetch: any, folderId: string, token: string) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");
  const response = await fetch(`${BASE_URL}/folder/${folderId}`, { headers });
  return response.json();

}

export const getEncryptedSecretsByFolder = async (fetch: any, folderId: string, token: string) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");
  const response = await fetch(`${BASE_URL}/credentials/encrypted/${folderId}`, { headers });
  return response.json();
}