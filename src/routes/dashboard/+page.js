export const load = async (loadEvent) => {
  const response = await loadEvent.fetch('/api/secrets');
  const data = await response.json();
  return { secrets: data.body.secrets };
};