const WEATHER_KEY = "4128048554025cdba535692ff5e59aae";
const GEO_KEY = "ee7dd6d0201149c584fdc0db7c51a5c4";

export const weatherAPI = {

  searchCity: async (query) => {

    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&limit=5&apiKey=${GEO_KEY}`
    );

    if (!res.ok) throw new Error("Map API error");

    return res.json();
  },

  getCurrent: async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_KEY}`
    );

    return res.json();
  },

  getForecast: async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_KEY}`
    );

    return res.json();
  }
};