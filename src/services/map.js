// src/services/map.js
import { weatherAPI } from "./api";

export const mapService = {
  async searchCity(query) {

    if (!query) return [];

    const data = await weatherAPI.searchCity(query);

    return data.features.map((city) => ({
  name: city.properties.formatted.split(",")[0],
  lat: city.properties.lat,
  lon: city.properties.lon
}));

  },
};