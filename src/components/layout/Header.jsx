import { Search, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { mapService } from "../../services/map";

export default function Header({ city, onSearch, unit, setUnit, lang, setLang }) {

  const [query, setQuery] = useState(city || "");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {

    if (!query) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const cities = await mapService.searchCity(query);
        setSuggestions(cities);
      } catch (err) {
        console.error(err);
      }
    }, 500); // delay 500ms

    return () => clearTimeout(timeout);

  }, [query]);

  const handleSelectCity = (city) => {
     setQuery(city.name);
    setSuggestions([]);

    onSearch(city.lat, city.lon, city.name);
  };

  const toggleLang = () => setLang(lang === "en" ? "vi" : "en");

  const toggleUnit = () => {
    setUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  return (
    <div className="flex items-center justify-between text-white px-4 py-3">

      <h1 className="text-lg font-semibold tracking-widest">WEEFORE</h1>

      <div className="flex-1 max-w-md mx-8 relative">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70"
          size={18}
        />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={lang === "vi" ? "Tìm thành phố..." : "Search for cities..."}
          className="w-full bg-white/20 backdrop-blur-md rounded-full py-2.5 pl-10 pr-4 text-white placeholder:text-white/70 focus:outline-none"
        />

        {suggestions.length > 0 && (
          <div className="absolute top-12 w-full bg-black/70 backdrop-blur-md rounded-xl overflow-hidden shadow-lg z-50">
            {suggestions.map((city, i) => (
              <div
                key={i}
                onClick={() => handleSelectCity(city)}
                className="px-4 py-2 hover:bg-white/20 cursor-pointer text-sm"
              >
                {city.name}
              </div>
            ))}
          </div>
        )}

      </div>

      <div className="flex items-center gap-3">

        <div
          onClick={toggleUnit}
          className="flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-1 text-sm font-medium cursor-pointer hover:bg-white/30 transition"
        >
          °{unit}
        </div>

        <div
          onClick={toggleLang}
          className="flex items-center bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-sm cursor-pointer hover:bg-white/30 transition gap-2"
        >
          <Globe size={16} />
          {lang === "vi" ? "VI" : "EN"}
        </div>

      </div>
    </div>
  );
}