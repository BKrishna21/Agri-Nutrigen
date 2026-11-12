import React from "react";
import {
  BarChart3,
  CheckCircle2,
  Leaf,
  Trophy,
} from "lucide-react";
import { useAnalysis } from "../../context/AnalysisContext";

interface CropData {
  crop?: string;
  name?: string;
  score?: number;
  probability?: number;
}

const CropComparison: React.FC = () => {
  const { analysisData } = useAnalysis();

  if (!analysisData) {
    return null;
  }

  const topCrops: CropData[] = Array.isArray(analysisData.topCrops)
    ? analysisData.topCrops
    : [];

  if (topCrops.length === 0) {
    return (
      <section className="mt-8">
        <div className="mb-5 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100">
            <BarChart3 className="h-5 w-5 text-green-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Crop Comparison
            </h2>

            <p className="text-sm text-gray-500">
              Compare the crops predicted for this region
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Crop comparison data is not available for this analysis.
          </p>
        </div>
      </section>
    );
  }

  const crops = topCrops.slice(0, 5).map((crop, index) => {
    const cropName = crop.crop || crop.name || `Crop ${index + 1}`;

    let score: number | null = null;

    if (typeof crop.score === "number") {
      score = crop.score;
    } else if (typeof crop.probability === "number") {
      score = crop.probability * 100;
    }

    return {
      name: cropName,
      score,
      rank: index + 1,
    };
  });

  const recommendedCrop =
    analysisData.finalRecommendations?.[0]?.crop ||
    analysisData.finalRecommendations?.[0]?.name ||
    analysisData.predictedCrop ||
    crops[0]?.name;

  const maxScore = Math.max(
    ...crops
      .map((crop) => crop.score ?? 0)
      .filter((score) => typeof score === "number"),
    0
  );

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100">
            <BarChart3 className="h-5 w-5 text-green-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Crop Comparison
            </h2>

            <p className="text-sm text-gray-500">
              Compare the top crop recommendations for this region
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Desktop Header */}
        <div className="hidden grid-cols-[70px_1fr_160px_150px] gap-4 border-b border-gray-100 bg-gray-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 md:grid">
          <span>Rank</span>
          <span>Crop</span>
          <span>Suitability</span>
          <span>Status</span>
        </div>

        <div className="divide-y divide-gray-100">
          {crops.map((crop) => {
            const isRecommended =
              crop.name.toLowerCase() ===
              String(recommendedCrop || "").toLowerCase();

            const percentage =
              crop.score !== null
                ? Math.max(0, Math.min(100, crop.score))
                : 0;

            return (
              <div
                key={`${crop.name}-${crop.rank}`}
                className={`p-5 transition ${
                  isRecommended
                    ? "bg-green-50/60"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="grid gap-4 md:grid-cols-[70px_1fr_160px_150px] md:items-center">
                  {/* Rank */}
                  <div className="flex items-center gap-2">
                    {crop.rank === 1 ? (
                      <Trophy className="h-4 w-4 text-amber-500" />
                    ) : (
                      <span className="text-sm font-semibold text-gray-500">
                        #{crop.rank}
                      </span>
                    )}

                    <span className="text-xs text-gray-400 md:hidden">
                      Rank
                    </span>
                  </div>

                  {/* Crop */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {crop.name}
                      </h3>

                      {isRecommended && (
                        <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-green-700">
                          <CheckCircle2 className="h-3 w-3" />
                          Recommended
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Score */}
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs text-gray-500 md:hidden">
                        Suitability
                      </span>

                      {crop.score !== null ? (
                        <span className="text-sm font-bold text-gray-900">
                          {crop.score.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">
                          Not available
                        </span>
                      )}
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      {crop.score !== null && (
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isRecommended
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    {isRecommended ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Best Match
                      </span>
                    ) : crop.score !== null && crop.score >= maxScore * 0.8 ? (
                      <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                        Strong Alternative
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                        Alternative
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <div className="flex items-start gap-3">
          <BarChart3 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />

          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              How to read this comparison
            </h4>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Crops are ordered according to the prediction data generated
              during the regional analysis. The highest-ranked crop is shown
              as the current recommendation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CropComparison;