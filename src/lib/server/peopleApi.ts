import { json } from "@sveltejs/kit";
export const getPeople = async (offset: number, limit: number) => {
  const response = await fetch(
    `http://localhost:3000/people?_page=${offset + 1}&_limit=${limit}`
  );
  const people = await response.json();
  return people;
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

export const createPeople = async (user) => {
  console.log(user);
  const response = await fetch(`http://localhost:3000/people`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
