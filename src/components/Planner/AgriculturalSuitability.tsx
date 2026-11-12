import React from "react";
import {
  Sprout,
  TrendingUp,
  CheckCircle2,
  Leaf
} from "lucide-react";

interface AgriculturalSuitabilityProps {
  score: number;
  cropName?: string;
}

export default function AgriculturalSuitability({
  score,
  cropName
}: AgriculturalSuitabilityProps) {

  // Keep score between 0 and 100
  const safeScore = Math.min(
    Math.max(Number(score) || 0, 0),
    100
  );

  // Determine suitability label
  const getSuitabilityInfo = () => {
    if (safeScore >= 85) {
      return {
        label: "Excellent",
        description:
          "Environmental conditions show a very strong match for crop cultivation."
      };
    }

    if (safeScore >= 70) {
      return {
        label: "Good",
        description:
          "Environmental conditions are generally favorable for crop cultivation."
      };
    }

    if (safeScore >= 50) {
      return {
        label: "Moderate",
        description:
          "The region shows moderate agricultural suitability."
      };
    }

    return {
      label: "Low",
      description:
        "Environmental conditions show limited suitability for the predicted crop."
    };
  };

  const suitability = getSuitabilityInfo();

  // Circular progress calculation
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const progressOffset =
    circumference -
    (safeScore / 100) * circumference;

  return (
    <section className="w-full max-w-5xl mx-auto mt-10">

      {/* Section Header */}
      <div className="mb-6">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-700" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-green-600">
              Agricultural Analysis
            </p>

            <h2 className="text-2xl font-bold text-green-950">
              Agricultural Suitability
            </h2>
          </div>

        </div>

        <p className="text-sm text-gray-500 mt-3">
          Overall environmental suitability based on the crop prediction analysis.
        </p>

      </div>

      {/* Main Card */}
      <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-white shadow-lg">

        {/* Decorative Background */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-80 pointer-events-none" />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">

          {/* LEFT SIDE - Score */}
          <div className="flex items-center justify-center">

            <div className="relative w-52 h-52">

              {/* Circular Progress */}
              <svg
                className="w-full h-full -rotate-90"
                viewBox="0 0 180 180"
              >

                {/* Background Circle */}
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="14"
                  className="text-green-50"
                />

                {/* Progress Circle */}
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={progressOffset}
                  className="text-green-600 transition-all duration-1000 ease-out"
                />

              </svg>

              {/* Score inside circle */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <span className="text-4xl font-bold text-green-950">
                  {Math.round(safeScore)}%
                </span>

                <span className="text-sm font-bold text-green-600 mt-1">
                  {suitability.label}
                </span>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE - Explanation */}
          <div className="flex flex-col justify-center">

            <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 bg-green-50 border border-green-100 rounded-full mb-4">

              <CheckCircle2 className="w-4 h-4 text-green-600" />

              <span className="text-xs font-bold text-green-700">
                Suitability Analysis Complete
              </span>

            </div>

            <h3 className="text-2xl font-bold text-green-950">

              {cropName
                ? `${cropName} shows ${suitability.label.toLowerCase()} suitability`
                : `${suitability.label} agricultural suitability`}

            </h3>

            <p className="text-gray-500 mt-3 leading-relaxed">
              {suitability.description}
            </p>

            {/* Score explanation */}
            <div className="mt-6 space-y-4">

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-green-50 flex items-center justify-center">
                  <Sprout className="w-4 h-4 text-green-600" />
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    Crop Suitability
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Represents how well the predicted crop matches the regional environmental conditions.
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-green-50 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-green-600" />
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    Environmental Match
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    The prediction considers soil nutrients, climate conditions and other environmental inputs.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Score Bar */}
        <div className="border-t border-green-50 bg-green-50/40 px-6 sm:px-8 py-5">

          <div className="flex items-center justify-between mb-2">

            <span className="text-sm font-semibold text-gray-600">
              Suitability Score
            </span>

            <span className="text-sm font-bold text-green-700">
              {Math.round(safeScore)} / 100
            </span>

          </div>

          <div className="w-full h-2.5 bg-green-100 rounded-full overflow-hidden">

            <div
              className="h-full bg-green-600 rounded-full transition-all duration-1000"
              style={{
                width: `${safeScore}%`
              }}
            />

          </div>

        </div>

      </div>

    </section>
  );
}