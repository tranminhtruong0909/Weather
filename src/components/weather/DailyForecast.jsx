
// src/components/weather/DailyForecast.jsx
import WeatherIcon from "./WeatherIcon";

const weekDaysEN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weekDaysVI = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

// Map dịch condition
const conditionMap = {
  "clear sky": "Trời quang",
  "few clouds": "Ít mây",
  "scattered clouds": "Mây rải rác",
  "broken clouds": "Nhiều mây",
  "overcast clouds": "U ám",
  "light rain": "Mưa nhẹ",
  "moderate rain": "Mưa vừa",
  "mist": "Sương mù",
  "snow": "Tuyết rơi"
};

export default function DailyForecast({
  daily,
  unit = "C",
  lang = "en",
  setUnit,
  setLang,
}) {
  const weekDays = lang === "vi" ? weekDaysVI : weekDaysEN;

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">
          {lang === "vi" ? "Dự báo 7 ngày" : "7-Day Forecast"}
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

      {/* Forecast list */}
      <div className="space-y-4">
        {daily.map((day, i) => {

          let temp = day.max_temp;

          if (unit === "F") {
            temp = (temp * 9) / 5 + 32;
          }

          temp = Math.round(temp);

          // dịch condition
          const displayCondition =
            lang === "vi"
              ? conditionMap[day.condition?.toLowerCase()] || day.condition
              : day.condition;

          return (
            <div
              key={i}
              className="flex items-center justify-between border-b border-white/20 pb-3"
            >
              {/* Day */}
              <p className="w-16 text-lg font-medium">
                {i === 0
                  ? lang === "vi"
                    ? "Hôm nay"
                    : "Today"
                  : weekDays[(new Date().getDay() + i) % 7]}
              </p>

              {/* Icon */}
              <div className="w-16 flex justify-center">
                <WeatherIcon icon={day.icon} size={50} />
              </div>

              {/* Condition */}
              <p className="flex-1 text-lg font-medium text-white/90">
                {displayCondition}
              </p>

              {/* Temperature */}
              <p className="text-lg font-semibold">
                {temp}°{unit}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

