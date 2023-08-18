export const getSecrets = async () => {
  const response = await fetch('http://localhost:3000/secrets');
  const secrets = await response.json();
  return secrets;
};

export const getSecretById = async (id) => {
  const response = await fetch(`http://localhost:3000/secrets/${id}`);
  const secret = await response.json();
  return secret;
};
