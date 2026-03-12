// src/components/weather/WeatherBackground.jsx
import { useEffect, useState } from 'react';

export default function WeatherBackground({ condition, isDay }) {
  const [bgImage, setBgImage] = useState('/assets/backgrounds/pexels-arts-1496373.jpg');

  useEffect(() => {
  const lower = condition.toLowerCase();

  if (lower.includes('rain') || lower.includes('storm')) {
    setBgImage('/assets/backgrounds/pexels-veeterzy-39811.jpg');

  } else if (lower.includes('cloud')) {
    setBgImage('/assets/backgrounds/pexels-jaymantri-4827.jpg');
  } else if (lower.includes('mist')) {
    setBgImage('/assets/backgrounds/pexels-tracehudson-2529973.jpg');
} else if (lower.includes('snow')) {
    setBgImage('/assets/backgrounds/pexels-eberhardgross-19780238.jpg');

  } else {
    setBgImage('/assets/backgrounds/pexels-arts-1496373.jpg');
  }
}, [condition]);

  return (
    <div
      className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      {/* lớp tối để chữ dễ đọc */}
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
  );
}