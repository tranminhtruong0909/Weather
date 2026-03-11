// src/components/weather/SuggestionCard.jsx

export default function SuggestionCard({
  condition,
  humidity,
  visibility,
  city,
  lang = "en",
}) {
  const lower = condition.toLowerCase();

  const today = new Date();
  const date = today.toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", {
    month: "long",
    day: "numeric",
  });

  const suggestions = [];

  // Clear sky → sunglasses
  if (lower.includes("clear")) {
    suggestions.push({
      label: lang === "vi" ? "Đeo kính râm" : "Wear sunglasses",
      icon: "sunglasses.png",
    });
  }

  // Rain → umbrella
  if (lower.includes("rain")) {
    suggestions.push({
      label: lang === "vi" ? "Mang theo ô" : "Bring umbrella",
      icon: "umbrella.png",
    });
  }

  // Low humidity → drink water
  if (humidity <= 50) {
    suggestions.push({
      label: lang === "vi" ? "Uống nước" : "Drink water",
      icon: "water.png",
    });
  }

  // High humidity → mask
  if (humidity >= 70) {
    suggestions.push({
      label: lang === "vi" ? "Đeo khẩu trang" : "Wear mask",
      icon: "mask.png",
    });
  }

  // Low visibility → mask
  if (visibility < 5000) {
    suggestions.push({
      label: lang === "vi" ? "Tầm nhìn thấp, cẩn thận khi ra ngoài" : "Low visibility outside",
      icon: "mask.png",
    });
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 text-white">

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-lg font-semibold">
            {lang === "vi" ? "Gợi ý cho" : "Suggestions for"}
          </p>
          <p className="text-2xl font-bold text-green-400">{city}</p>
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold">
            {lang === "vi" ? "Hôm nay" : "Today"}
          </p>
          <p className="text-white/80">{date}</p>
        </div>
      </div>

      <div className="border-t border-white/30 my-4"></div>

      <div className="grid grid-cols-2 gap-4">
        {suggestions.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-white/10 rounded-xl"
          >
            <p className="text-lg">{item.label}</p>

            <img
              src={`/assets/icons/${item.icon}`}
              alt={item.label}
              className="w-12 h-12"
            />
          </div>
        ))}
      </div>

    </div>
  );
}