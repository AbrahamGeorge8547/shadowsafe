export async function load({ params, fetch }) {
  const response = await fetch(`/api/folder`);
  const data = await response.json();
  return { folders: data.body.data.folders };
}
