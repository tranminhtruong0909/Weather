// src/services/weatherService.js
import { weatherAPI } from "./api.js";

export const weatherService = {
  async getFullWeather(lat, lon, cityName = "") {
    try {

      if (lat === undefined || lon === undefined) {
        throw new Error("Thiếu tọa độ");
      }

      const [currentData, forecastData] = await Promise.all([
        weatherAPI.getCurrent(lat, lon),
        weatherAPI.getForecast(lat, lon),
      ]);

      const current = {
        temp: Math.round(currentData.main?.temp || 0),
        feels_like: Math.round(currentData.main?.feels_like || 0),
        humidity: currentData.main?.humidity || 0,
        wind_speed: Math.round((currentData.wind?.speed || 0) * 3.6), // m/s → km/h
        pressure: currentData.main?.pressure || 0,
        visibility: currentData.visibility || 0,
        condition: currentData.weather?.[0]?.description || "",
        icon: currentData.weather?.[0]?.icon || "01d",
        city: cityName || currentData.name || "",
        country: currentData.sys?.country || "Unknown",
      };

      const hourly =
        forecastData.list?.slice(0, 8).map((item) => ({
          dt: item.dt,
          temp: Math.round(item.main?.temp || 0),
          condition: item.weather?.[0]?.description || "",
          icon: item.weather?.[0]?.icon || "01d",
        })) || [];

      const dailyMap = new Map();

      forecastData.list?.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();

        if (!dailyMap.has(dateKey)) {
          dailyMap.set(dateKey, {
            day: new Intl.DateTimeFormat("vi-VN", {
              weekday: "short",
              day: "numeric",
              month: "short",
            }).format(date),
            temps: [item.main?.temp || 0],
            icons: [item.weather?.[0]?.icon || "01d"],
            conditions: [item.weather?.[0]?.description || ""],
          });
        } else {
          const d = dailyMap.get(dateKey);
          d.temps.push(item.main?.temp || 0);
          d.icons.push(item.weather?.[0]?.icon || "01d");
          d.conditions.push(item.weather?.[0]?.description || "");
        }
      });

      const daily = Array.from(dailyMap.values())
        .slice(0, 5)
        .map((d) => ({
          day: d.day,
          max_temp: Math.round(Math.max(...d.temps)),
          min_temp: Math.round(Math.min(...d.temps)),
          condition: d.conditions[0] || "",
          icon: d.icons[0] || "01d",
        }));

      return {
        current,
        hourly,
        daily,
      };

    } catch (error) {
      console.error("Weather Service Error:", error.message);
      throw error;
    }
  },
};