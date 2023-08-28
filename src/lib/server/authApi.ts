import { BASE_URL } from "$env/static/private";
export const login = async (user) => {
  console.log(user);
  console.log(`${BASE_URL}/authenticate`);
  const response = await fetch(`${BASE_URL}/authenticate`, {
    method: "POST",
    body: JSON.stringify({
      userName: user.username,
      password: user.password,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });
  const responseData = await response.json();
  return {
    token: responseData.data.token,
    user: { ...responseData.data, token: "" },
  };
};
