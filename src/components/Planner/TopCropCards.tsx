import React from "react";
import {
  Trophy,
  Sprout,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";

interface CropRecommendation {
  crop: string;
  score: number;
}

interface TopCropCardsProps {
  crops: CropRecommendation[];
  onSelectCrop?: (crop: CropRecommendation) => void;
}

export default function TopCropCards({
  crops,
  onSelectCrop
}: TopCropCardsProps) {
  if (!crops || crops.length === 0) {
    return null;
  }

  const formatCropName = (crop: string) => {
    if (!crop) return "Unknown Crop";

    return crop
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  };

  const getMatchLabel = (score: number) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Strong";
    if (score >= 50) return "Moderate";
    return "Low";
  };

  const getRankStyle = (index: number) => {
    if (index === 0) {
      return {
        badge: "bg-amber-100 text-amber-700",
        number: "text-amber-600"
      };
    }

    if (index === 1) {
      return {
        badge: "bg-gray-100 text-gray-600",
        number: "text-gray-500"
      };
    }

    if (index === 2) {
      return {
        badge: "bg-orange-100 text-orange-700",
        number: "text-orange-600"
      };
    }

    return {
      badge: "bg-green-50 text-green-700",
      number: "text-green-600"
    };
  };

  return (
    <section className="w-full max-w-5xl mx-auto mt-10">

      {/* Section Header */}
      <div className="mb-6">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <Sprout className="w-5 h-5 text-green-700" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-green-600">
              Crop Options
            </p>

            <h2 className="text-2xl font-bold text-green-950">
              Top Suitable Crops
            </h2>
          </div>

        </div>

        <p className="text-sm text-gray-500 mt-3">
          Other crops that show strong environmental suitability for your region.
        </p>

      </div>

      {/* Crop Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {crops.map((crop, index) => {

          const safeScore = Math.min(
            Math.max(Number(crop.score) || 0, 0),
            100
          );

          const rankStyle = getRankStyle(index);

          return (
            <div
              key={`${crop.crop}-${index}`}
              className="group relative overflow-hidden bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >

              {/* Decorative Background */}
              <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-green-50 blur-2xl opacity-70 pointer-events-none" />

              <div className="relative p-5">

                {/* Rank + Score */}
                <div className="flex items-center justify-between">

                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${rankStyle.badge}`}
                  >
                    {index === 0 ? (
                      <Trophy className="w-5 h-5" />
                    ) : (
                      `#${index + 1}`
                    )}
                  </div>

                  <div className="text-right">

                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Match Score
                    </p>

                    <p className={`text-xl font-extrabold ${rankStyle.number}`}>
                      {Math.round(safeScore)}%
                    </p>

                  </div>

                </div>

                {/* Crop Name */}
                <div className="mt-6">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                      <Sprout className="w-5 h-5 text-green-600" />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                        Crop
                      </p>

                      <h3 className="text-xl font-bold text-green-950">
                        {formatCropName(crop.crop)}
                      </h3>
                    </div>

                  </div>

                </div>

                {/* Suitability */}
                <div className="mt-5">

                  <div className="flex items-center justify-between mb-2">

                    <span className="text-sm font-semibold text-gray-600">
                      Environmental Match
                    </span>

                    <span className="text-xs font-bold text-green-600">
                      {getMatchLabel(safeScore)}
                    </span>

                  </div>

                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-green-600 rounded-full transition-all duration-700"
                      style={{
                        width: `${safeScore}%`
                      }}
                    />

                  </div>

                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">

                  <div className="flex items-center gap-2 text-gray-500">

                    <TrendingUp className="w-4 h-4 text-green-600" />

                    <span className="text-xs font-medium">
                      Suitable for region
                    </span>

                  </div>

                  {onSelectCrop && (
                    <button
                      type="button"
                      onClick={() => onSelectCrop(crop)}
                      className="inline-flex items-center gap-1 text-sm font-bold text-green-700 hover:text-green-800 transition-colors"
                    >
                      Details
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  )}

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}