import API from "./axios";

// Get live weather and agro-advisories by coordinates
export const getLiveWeather = (lat, lon, location) => {
  const params = {};
  if (lat) params.lat = lat;
  if (lon) params.lon = lon;
  if (location) params.location = location;
  return API.get("/weather/live", { params });
};

// Get live weather by farm ID
export const getFarmWeather = (farmId) => API.get(`/weather/farm/${farmId}`);
