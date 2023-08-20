import { json } from "@sveltejs/kit";
export const getSecrets = async (offset: number, limit: number) => {
  const response = await fetch(
    `http://localhost:3000/secrets?_page=${offset + 1}&_limit=${limit}`
  );
  const secrets = await response.json();
  return secrets;
};

export const getSecretById = async (id) => {
  const response = await fetch(`http://localhost:3000/secrets/${id}`);
  const secret = await response.json();
  return secret;
};

export const updateSecret = async (id, secret) => {
  console.log(secret);
  const response = await fetch(`http://localhost:3000/secrets/${id}`, {
    method: "PUT",
    body: JSON.stringify(secret),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
