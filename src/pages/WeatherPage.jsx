// src/pages/WeatherPage.jsx
import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import WeatherBackground from '../components/weather/WeatherBackground';
import CurrentWeather from '../components/weather/CurrentWeather';
import HourlyForecast from '../components/weather/HourlyForecast';
import DailyForecast from '../components/weather/DailyForecast';
import WeatherDetails from '../components/weather/WeatherDetails';
import SuggestionCard from '../components/weather/SuggestionCard';
import { weatherService } from '../services/weatherService';

export default function WeatherPage() {
  const [current, setCurrent] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Hà Nội');
  const [unit, setUnit] = useState('C');     
  const [lang, setLang] = useState('vi');

  const convertTemp = (tempC) => {
    if (unit === 'F') {
      return Math.round((tempC * 9 / 5) + 32);
    }
    return Math.round(tempC);
  };
  const fetchWeather = async (searchCity = 'Hà Nội') => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherService.getFullWeather(searchCity);
      setCurrent(data.current);
      setHourly(data.hourly);
      setDaily(data.daily);
      setCity(data.current.city);
    } catch (err) {
      setError(err.message || 'Không thể tải dữ liệu thời tiết');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  fetchWeather('Hà Nội');
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center">
        <div className="text-white text-2xl flex items-center gap-3">
          <svg
            className="animate-spin h-8 w-8 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          Đang tải thời tiết...
        </div>
      </div>
    );
  }
  if (error || !current) {
    return (
      <div className="min-h-screen bg-red-950 flex items-center justify-center text-white">
        <div className="text-center px-6">
          <p className="text-xl mb-6">{error || 'Không thể tải dữ liệu thời tiết'}</p>
          <button
            onClick={() => fetchWeather(city)}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-medium transition"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }
  const isDay = new Date().getHours() >= 6 && new Date().getHours() < 18;
  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      <WeatherBackground condition={current.condition} isDay={isDay}/>
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 py-8">
        <Header city={city} onSearch={fetchWeather} lang={lang} setLang={setLang} unit={unit}  setUnit={setUnit} />
        <div className="mt-10 flex flex-col gap-8">
          <CurrentWeather
            temp={current.temp}
            feels_like={current.feels_like}
            condition={current.condition}
            icon={current.icon}
            city={current.city}
            country={current.country}
            unit={unit}        
            lang={lang}
          />
          <HourlyForecast hourly={hourly} current={current} lang={lang} setLang={setLang} unit={unit}  setUnit={setUnit}/>
        </div>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Cột trái */}
          <div className="lg:col-span-5 space-y-6">
            <DailyForecast daily={daily} lang={lang} setLang={setLang} unit={unit}  setUnit={setUnit}  />
          </div>
          {/* Cột phải - Dự báo */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8">
            <WeatherDetails
              humidity={current.humidity}
              wind_speed={current.wind_speed}
              pressure={current.pressure}
              visibility={current.visibility ?? 'N/A'}
              lang={lang}
              setLang={setLang}

            />
            <SuggestionCard condition={current.condition}
              humidity={current.humidity}
              visibility={current.visibility}
              city={current.city}
              lang={lang} 
              setLang={setLang}/>
          </div>
        </div>
      </div>

    </div>
  );
}