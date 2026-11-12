import React from "react";
import {
  Wheat,
  MapPin,
  Sparkles,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";

interface RecommendedCropHeroProps {
  crop: string;
  score: number;
  district?: string;
  state?: string;
  onViewReason?: () => void;
}

export default function RecommendedCropHero({
  crop,
  score,
  district,
  state,
  onViewReason
}: RecommendedCropHeroProps) {
  const safeScore = Math.min(
    Math.max(Number(score) || 0, 0),
    100
  );

  const getMatchLabel = () => {
    if (safeScore >= 85) {
      return "Excellent Match";
    }

    if (safeScore >= 70) {
      return "Strong Match";
    }

    if (safeScore >= 50) {
      return "Moderate Match";
    }

    return "Low Match";
  };

  const matchLabel = getMatchLabel();

  const formattedCrop =
    crop && crop.length > 0
      ? crop.charAt(0).toUpperCase() + crop.slice(1)
      : "Recommended Crop";

  return (
    <section className="w-full max-w-5xl mx-auto mt-10">

      {/* Section heading */}
      <div className="mb-6">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-green-600">
              Your Recommendation
            </p>

            <h2 className="text-2xl font-bold text-green-950">
              Top Recommended Crop
            </h2>
          </div>

        </div>

      </div>

      {/* Hero card */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 text-white shadow-xl">

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        <div className="absolute -bottom-32 -left-20 w-72 h-72 rounded-full bg-emerald-300/10 blur-3xl pointer-events-none" />

        <div className="relative p-7 sm:p-10">

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">

            {/* Left content */}
            <div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-sm">

                <TrendingUp className="w-4 h-4" />

                <span className="text-xs font-bold uppercase tracking-wider">
                  {matchLabel}
                </span>

              </div>

              {/* Crop name */}
              <h3 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight">
                {formattedCrop}
              </h3>

              <p className="mt-3 text-green-50 text-base sm:text-lg max-w-xl leading-relaxed">
                This crop has been identified as the strongest environmental
                match for your selected region.
              </p>

              {/* Location */}
              {(district || state) && (
                <div className="flex items-center gap-2 mt-5 text-green-50">

                  <MapPin className="w-4 h-4" />

                  <span className="text-sm font-medium">
                    {[district, state]
                      .filter(Boolean)
                      .join(", ")}
                  </span>

                </div>
              )}

              {/* Action */}
              {onViewReason && (
                <button
                  type="button"
                  onClick={onViewReason}
                  className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-green-700 font-bold hover:bg-green-50 transition-all shadow-sm"
                >
                  Why this crop?
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}

            </div>

            {/* Score */}
            <div className="flex justify-center md:justify-end">

              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">

                {/* Inner circle */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white flex flex-col items-center justify-center shadow-xl">

                  <span className="text-4xl sm:text-5xl font-extrabold text-green-700">
                    {Math.round(safeScore)}%
                  </span>

                  <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">
                    Match Score
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Bottom information */}
          <div className="mt-9 pt-6 border-t border-white/15">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Wheat className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-xs text-green-100">
                    Recommendation
                  </p>

                  <p className="font-bold">
                    Top Crop
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-xs text-green-100">
                    Suitability
                  </p>

                  <p className="font-bold">
                    {Math.round(safeScore)} / 100
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-xs text-green-100">
                    Analysis Type
                  </p>

                  <p className="font-bold">
                    Regional Analysis
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}

