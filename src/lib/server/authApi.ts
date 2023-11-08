import { BASE_URL } from "$env/static/private";
export const login = async (fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>, user: { username: string, password: string }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({
      username: user.username,
      password: user.password,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });
  if (response.status === 401) {
    return {
      success: false,
      message: "incorrect username or password",
    };
  }
  const responseData = await response.json();
  return {
    token: responseData.data.token,
    user: { ...responseData.data.user, token: "" },
  };
};
