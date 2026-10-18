const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = import.meta.env.VITE_WEATHER_API_URL;

export async function getCurrentWeather(location) {
  const response = await fetch(
    `${API_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(
      location
    )}&aqi=no`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch current weather");
  }

  return response.json();
}

export async function getWeatherForecast(location, days = 5) {
  const response = await fetch(
    `${API_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
      location
    )}&days=${days}&aqi=no&alerts=yes`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch weather forecast");
  }

  return response.json();
}