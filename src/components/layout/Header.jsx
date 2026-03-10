// src/components/layout/Header.jsx
import { Search, Moon, ThermometerSun, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header({ city, onSearch, unit, setUnit, lang, setLang }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.currentTarget.elements[0].value.trim();
    if (input) onSearch(input);
  };

  const toggleLang = () => setLang(lang === 'en' ? 'vi' : 'en');
  const toggleUnit = () => {
  console.log("Trước toggle:", unit);
  setUnit(prev => {
    const newUnit = prev === 'C' ? 'F' : 'C';
    console.log("Sau toggle:", newUnit);
    return newUnit;
  });
};
  return (
    <div className="flex items-center justify-between text-white px-4 py-3">
      <h1 className="text-lg font-semibold tracking-widest">WEEFORE</h1>

      <form onSubmit={handleSubmit} className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
          <input
            type="text"
            defaultValue={city}
            placeholder={lang === 'vi' ? "Tìm thành phố..." : "Search for cities..."}
            className="w-full bg-white/20 backdrop-blur-md rounded-full py-2.5 pl-10 pr-4 text-white placeholder:text-white/70 focus:outline-none"
          />
        </div>
      </form>

      <div className="flex items-center gap-3">
        {/* Unit toggle */}
        <div
  onClick={toggleUnit}
  className="flex bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-sm cursor-pointer hover:bg-white/30 transition select-none"
>
  <span className={`px-2 font-medium ${unit === 'C' ? 'text-white' : 'opacity-60'}`}>
    °C
  </span>
  <span className="px-1 opacity-50">|</span>
  <span className={`px-2 font-medium ${unit === 'F' ? 'text-white' : 'opacity-60'}`}>
    °F
  </span>
</div>

        {/* Language toggle - hiển thị cờ hoặc text */}
        <div
          onClick={toggleLang}
          className="flex bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-sm cursor-pointer hover:bg-white/30 transition items-center gap-2"
        >
          <Globe size={16} />
          <span className="font-medium">{lang === 'vi' ? 'VI' : 'EN'}</span>
        </div>

        <Moon size={22} className="cursor-pointer hover:text-white/70 transition" />
      </div>
    </div>
  );
}