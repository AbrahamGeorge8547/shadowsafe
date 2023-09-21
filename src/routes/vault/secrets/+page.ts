export async function load({ params, fetch }) {
  console.log("LOAD FUNC");
  const response = await fetch(`/api/folder`);
  const data = await response.json();

  return { folder: data.body.data };
}
