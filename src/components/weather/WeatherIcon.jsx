// src/components/weather/WeatherIcon.jsx

const iconMap = {
  "clear sky": "/assets/weather_icon/Clear sky.png",
  "few clouds": "/assets/weather_icon/Few clouds.png",
  "scattered clouds": "/assets/weather_icon/Scattered clouds.png",
  "broken clouds": "/assets/weather_icon/Broken clouds.png",
  "overcast clouds": "/assets/weather_icon/Overcast clouds.png",
  "light rain": "/assets/weather_icon/light rain.png",
  "moderate rain": "/assets/weather_icon/Moderate rain.png",
  "mist": "/assets/weather_icon/mist.png",
  "fog": "/assets/weather_icon/foggy.png",
  "snow": "/assets/weather_icon/snow.png",
};

export default function WeatherIcon({ description, size = 80 }) {
  const iconSrc =
    iconMap[description?.toLowerCase()] ||
    "/assets/weather_icon/Scattered clouds.png";

  return (
    <img
      src={iconSrc}
      alt="weather icon"
      width={size}
      height={size}
      className="drop-shadow-lg"
    />
  );
}