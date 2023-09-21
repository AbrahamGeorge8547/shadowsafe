import { getFolderStrucure, addFolder } from "$lib/server/secretsApi.js";
import { json } from "@sveltejs/kit";

export async function GET(req) {
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcmlzaCIsImF1dGgiOlsiQWRtaW4iXSwiZXhwIjoxNjk1NTgwMDQ1fQ.e-jy_6IAh06RvlA7eZOlTgfvedTALT2vR2e5oskUNLsZEgJmUvV76rdcNvt6pIYSVnG4PhVbcMPjBTx90M4ZMg";
  console.log(token);
  const data = await getFolderStrucure(token, "650a9fc08d21ba79d1bd5ab5");
  return json({
    body: {
      data,
    },
  });
}

export async function POST(req) {
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcmlzaCIsImF1dGgiOlsiQWRtaW4iXSwiZXhwIjoxNjk1NTgwMDQ1fQ.e-jy_6IAh06RvlA7eZOlTgfvedTALT2vR2e5oskUNLsZEgJmUvV76rdcNvt6pIYSVnG4PhVbcMPjBTx90M4ZMg";
  console.log(token);
  const { request } = req;
  const payload = await request.json();
  const data = await addFolder(token, payload);
  return json({
    body: {
      data,
    },
  });
}
