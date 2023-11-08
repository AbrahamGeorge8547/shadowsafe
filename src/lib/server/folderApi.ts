import { BASE_URL } from "../../config";

export const getFolders = async (
    fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
    token: string,
) => {
    try {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);

        const requestOptions: RequestInit = {
            method: "GET",
            headers,
            redirect: "follow",
        };

        const response = await fetch(
            `${BASE_URL}/folders/`,
            requestOptions
        );

        const responseJson = await response.json();
        return responseJson.data;
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

    const response = await fetch(`${BASE_URL}/folder/`, options);
    const data = await response.json();
    return data.data;
};