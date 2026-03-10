// src/services/api.js
const API_KEY = '4128048554025cdba535692ff5e59aae';   // key của bạn

export const weatherAPI = {
  // Lấy lat, lon từ tên thành phố
  getCoordinates: async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error('Không tìm thấy thành phố');
    const data = await res.json();
    if (!data || data.length === 0) throw new Error('Không tìm thấy thành phố');
    return data[0];
  },

  // Current Weather (miễn phí)
  getCurrent: async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error('Lỗi lấy dữ liệu hiện tại');
    return res.json();
  },

  // 5-day Forecast (miễn phí)
  getForecast: async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error('Lỗi lấy dự báo');
    return res.json();
  },
};