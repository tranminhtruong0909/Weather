// src/components/weather/WeatherIcon.jsx



const iconMap = {
  '01d': '/assets/icons/sun.png',
  '02d': '/assets/icons/sun.png',
  '03d': '/assets/icons/clouds.png',
  '04d': '/assets/icons/cloudy.png',
  '09d': '/assets/icons/rain.png',
  '10d': '/assets/icons/rain.png',
  '11d': '/assets/icons/thunder.png',
  '13d': '/assets/icons/snow.png',
  '50d': '/assets/icons/mist.png',

  '01n': '/assets/icons/sun.png',
  '02n': '/assets/icons/sun.png',
  '03n': '/assets/icons/clouds.png',
  '04n': '/assets/icons/cloudy.png',
  '09n': '/assets/icons/rain.png',
  '10n': '/assets/icons/rain.png',
  '11n': '/assets/icons/thunder.png',
  '13n': '/assets/icons/snow.png',
  '50n': '/assets/icons/mist.png',
};

export default function WeatherIcon({ icon, size = 80 }) {
  const iconSrc = iconMap[icon] || '/assets/icons/clouds.png'; // fallback

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