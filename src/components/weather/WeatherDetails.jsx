
// src/components/weather/WeatherDetails.jsx

export default function WeatherDetails({
  humidity,
  wind_speed,
  visibility,
  pressure,
  lang = "en",
}) {
  const details = [
    {
      label: lang === "vi" ? "Độ ẩm" : "Humidity",
      value: `${humidity}%`,
      icon: "humidity.png",
    },
    {
      label: lang === "vi" ? "Gió" : "Wind",
      value: `${wind_speed} km/h`,
      icon: "wind.png",
    },
    {
      label: lang === "vi" ? "Tầm nhìn" : "Visibility",
      value: `${(visibility / 1000).toFixed(1)} km`,
      icon: "eye.png",
    },
    {
      label: lang === "vi" ? "Áp suất" : "Pressure",
      value: `${pressure} hPa`,
      icon: "barometer.png",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {details.map((item, i) => (
        <div
          key={i}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 text-white flex flex-col items-center text-center"
        >
          <img
            src={`/assets/icons/${item.icon}`}
            alt={item.label}
            className="w-12 h-12 mb-3"
          />

          <p className="text-sm opacity-75">{item.label}</p>

          <p className="text-3xl font-semibold mt-1">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

