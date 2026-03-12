
// src/components/weather/HourlyForecast.jsx
import WeatherIcon from "./WeatherIcon";

export default function HourlyForecast({
  hourly,
  current,
  lang = "en",
  unit = "C",
  setLang,
  setUnit,
  condition
}) {

 const data = [
  {
    dt: Date.now() / 1000,
    temp: current.temp,
    condition: current.condition,
    label: lang === "vi" ? "Bây giờ" : "Now",
  },
  ...hourly.slice(0, 24),
];
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl px-6 py-5 text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {lang === "vi" ? "Dự báo theo giờ" : "Hourly Forecast"}
        </h3>

        <div className="flex gap-2">
          <button
            onClick={() => setUnit(unit === "C" ? "F" : "C")}
            className="bg-white/20 px-3 py-1 rounded-lg text-sm"
          >
            °{unit}
          </button>

          <button
            onClick={() => setLang(lang === "en" ? "vi" : "en")}
            className="bg-white/20 px-3 py-1 rounded-lg text-sm"
          >
            {lang.toUpperCase()}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-evenly gap-8 overflow-x-auto scrollbar-hide">
        {data.map((hour, i) => {

          const time =
            hour.label ||
            new Date(hour.dt * 1000).toLocaleTimeString(
              lang === "vi" ? "vi-VN" : "en-US",
              {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }
            );

          let temp = hour.temp;

          if (unit === "F") {
            temp = (temp * 9) / 5 + 32;
          }

          temp = Math.round(temp);

          return (
            <div key={i} className="flex flex-col items-center min-w-[70px]">

              {/* Time */}
              <p className="text-sm text-white/80 mb-2">{time}</p>

              {/* Icon */}
             
                <WeatherIcon description={hour.condition} size={55} />
              {/* Temperature */}
              <p className="text-lg font-semibold mt-2">
                {temp}°{unit}
              </p>

            </div>
          );
        })}
      </div>
    </div>
  );
}

