const API_URL = import.meta.env.VITE_MANDI_API_URL;

export async function getMandiPrices(state) {
  const response = await fetch(
    `${API_URL}/prices?state=${encodeURIComponent(state)}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch mandi prices");
  }

  const result = await response.json();

  return result.data;
}