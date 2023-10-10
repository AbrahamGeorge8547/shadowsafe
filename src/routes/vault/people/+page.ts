export async function load({ fetch }) {
  const response = await fetch(`/api/groups`);
  const responseJson = await response.json();
  console.log(responseJson);
  return { folder: responseJson.data.groups || [] };
}
