
import React from "react";
import { Leaf, Apple, Dna, Trophy } from "lucide-react";
import { useAnalysis } from "../../context/AnalysisContext";

interface ScoreItemProps {
  label: string;
  score: number | null;
  icon: React.ElementType;
  description: string;
}

const ScoreItem: React.FC<ScoreItemProps> = ({
  label,
  score,
  icon: Icon,
  description,
}) => {
  const hasScore = typeof score === "number";

  const normalizedScore = hasScore
    ? Math.max(0, Math.min(100, score))
    : 0;

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
            <Icon className="h-5 w-5 text-green-600" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">{label}</h3>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>

        {hasScore ? (
          <span className="text-xl font-bold text-gray-900">
            {normalizedScore.toFixed(1)}
          </span>
        ) : (
          <span className="text-sm font-medium text-gray-400">
            Not available
          </span>
        )}
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-100">
        {hasScore && (
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-700"
            style={{
              width: `${normalizedScore}%`,
            }}
          />
        )}
      </div>

      <div className="mt-2 flex justify-between text-xs text-gray-400">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  );
};

const ScoreVisualization: React.FC = () => {
  const { analysisData } = useAnalysis();

  if (!analysisData) {
    return null;
  }

  const data = analysisData as any;

  const agriculturalScore =
    typeof data.agriculturalScore === "number"
      ? data.agriculturalScore
      : null;

  const nutritionScore =
    typeof data.nutritionScore === "number"
      ? data.nutritionScore
      : null;

  const genomicScore =
    typeof data.genomicScore === "number"
      ? data.genomicScore
      : null;

  const finalScore =
    typeof data.finalScore === "number"
      ? data.finalScore
      : null;

  const availableScores = [
    agriculturalScore,
    nutritionScore,
    genomicScore,
  ].filter((score): score is number => typeof score === "number");

  const calculatedAverage =
    availableScores.length > 0
      ? availableScores.reduce((sum, score) => sum + score, 0) /
        availableScores.length
      : null;

  const displayedFinalScore = finalScore ?? calculatedAverage;

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100">
            <Trophy className="h-5 w-5 text-green-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Suitability Scores
            </h2>

            <p className="text-sm text-gray-500">
              Breakdown of the factors used in the recommendation
            </p>
          </div>
        </div>
      </div>

      {/* Final Score */}
      <div className="mb-5 overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div>
            <p className="text-sm font-medium text-green-600">
              Overall Suitability
            </p>

            <h3 className="mt-1 text-2xl font-bold text-gray-900">
              Final Recommendation Score
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Combined score from the available recommendation factors.
            </p>
          </div>

          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-8 border-green-200 bg-white">
            {displayedFinalScore !== null ? (
              <>
                <span className="text-2xl font-bold text-green-700">
                  {displayedFinalScore.toFixed(1)}
                </span>

                <span className="text-[10px] font-medium uppercase text-gray-500">
                  / 100
                </span>
              </>
            ) : (
              <span className="px-2 text-center text-xs font-medium text-gray-400">
                Pending
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <ScoreItem
          label="Agricultural"
          score={agriculturalScore}
          icon={Leaf}
          description="Environmental and crop suitability"
        />

        <ScoreItem
          label="Nutrition"
          score={nutritionScore}
          icon={Apple}
          description="Nutritional relevance of crops"
        />

        <ScoreItem
          label="Genomic"
          score={genomicScore}
          icon={Dna}
          description="Genomic relevance to nutrients"
        />
      </div>

      {/* Availability Notice */}
      {availableScores.length === 0 && (
        <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-4">
          <p className="text-sm leading-6 text-amber-800">
            Nutrition and genomic scoring are not available in the current
            analysis data yet. The visualization will automatically display
            those scores when they are added to the analysis pipeline.
          </p>
        </div>
      )}
    </section>
  );
};

export default ScoreVisualization;