// src/services/weatherService.js
import { weatherAPI } from './api.js';

export const weatherService = {
  async getFullWeather(city = 'Hanoi') {
    try {
      const coord = await weatherAPI.getCoordinates(city);
      const { lat, lon, name, country } = coord;

      if (!lat || !lon) {
        throw new Error('Không lấy được tọa độ');
      }

      const [currentData, forecastData] = await Promise.all([
        weatherAPI.getCurrent(lat, lon),
        weatherAPI.getForecast(lat, lon),
      ]);

      // Current Weather
      const current = {
        temp: Math.round(currentData.main.temp),
        feels_like: Math.round(currentData.main.feels_like),
        humidity: currentData.main.humidity,
        wind_speed: Math.round((currentData.wind?.speed || 0) * 3.6), // m/s → km/h
        pressure: currentData.main.pressure,
        condition: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        city: name || city,
        country: country || 'Unknown',
        
      };

      // Hourly (8 giờ tiếp theo)
      const hourly = forecastData.list
        .slice(0, 8)
        .map(item => ({
          dt: item.dt,
          temp: Math.round(item.main.temp),
          condition: item.weather[0].description,
          icon: item.weather[0].icon,
        }));

      // Daily (gom nhóm theo ngày - tối đa 7 ngày)
      const dailyMap = new Map();

      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();

        if (!dailyMap.has(dateKey)) {
          dailyMap.set(dateKey, {
            day: new Intl.DateTimeFormat('vi-VN', { weekday: 'short', day: 'numeric', month: 'short' }).format(date),
            temps: [item.main.temp],
            icons: [item.weather[0].icon],
            conditions: [item.weather[0].description],
          });
        } else {
          const d = dailyMap.get(dateKey);
          d.temps.push(item.main.temp);
          d.icons.push(item.weather[0].icon);
          d.conditions.push(item.weather[0].description);
        }
      });

      const daily = Array.from(dailyMap.values())
        .slice(0, 7)
        .map(d => ({
          day: d.day,
          max_temp: Math.round(Math.max(...d.temps)),
          min_temp: Math.round(Math.min(...d.temps)),
          condition: d.conditions[0] || 'Không rõ',
          icon: d.icons[0],
        }));

      return { current, hourly, daily };
    } catch (error) {
      console.error('Weather Service Error:', error.message);
      throw error;
    }
  },
};