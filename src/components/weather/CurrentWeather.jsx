
// src/components/weather/CurrentWeather.jsx

export default function CurrentWeather({
  temp,
  feels_like,
  condition,
  city,
  country = "VN",
  unit = "C",
  lang = "vi",
}) {
  const now = new Date();

  const dateStr = now.toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const timeStr = now.toLocaleTimeString(lang === "vi" ? "vi-VN" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Convert temperature
  let displayTemp = temp;
  let displayFeels = feels_like;

  if (unit === "F") {
    displayTemp = (temp * 9) / 5 + 32;
    displayFeels = (feels_like * 9) / 5 + 32;
  }

  displayTemp = Math.round(displayTemp);
  displayFeels = Math.round(displayFeels);

  // Translate weather condition
  const conditionMap = {
    "clear sky": "Trời quang",
    "few clouds": "Ít mây",
    "scattered clouds": "Mây rải rác",
    "broken clouds": "Nhiều mây",
    "overcast clouds": "U ám",
  };

  const displayCondition =
    lang === "vi"
      ? conditionMap[condition.toLowerCase()] || condition
      : condition;

  return (
    <div className="text-white">
      <div className="flex items-center gap-3">
        <img src="/assets/icons/pin.png" alt="location" className="w-14 h-14" />
        <h1 className="text-5xl font-semibold tracking-wide">{city}</h1>
      </div>

      <p className="text-lg text-white/80 mt-2 ml-11">
        {dateStr} | {timeStr}
      </p>

      <div className="flex items-end gap-6 mt-6">
        <p className="text-[110px] font-light leading-none">
          {displayTemp}°{unit}
        </p>

        <p className="text-4xl font-medium mb-3">{displayCondition}</p>
      </div>

      <p className="text-xl text-white/80 mt-2">
        {lang === "vi" ? "Cảm giác như" : "Feels like"} {displayFeels}°{unit}
      </p>
    </div>
  );
}

