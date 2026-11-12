
import React from "react";
import {
  CheckCircle2,
  Leaf,
  MapPin,
  Droplets,
  Thermometer,
  FlaskConical,
  CloudRain,
  Info,
} from "lucide-react";
import { useAnalysis } from "../../context/AnalysisContext";

const WhyThisCrop: React.FC = () => {
  const { analysisData } = useAnalysis();

  if (!analysisData) {
    return null;
  }

  const {
    location,
    environment,
    predictedCrop,
    topCrops,
    finalRecommendations,
  } = analysisData;

  const recommendedCrop =
    finalRecommendations?.[0]?.crop ||
    finalRecommendations?.[0]?.name ||
    predictedCrop ||
    "Recommended Crop";

  const cropData =
    finalRecommendations?.find(
      (crop: any) =>
        crop?.crop === recommendedCrop || crop?.name === recommendedCrop
    ) ||
    topCrops?.find(
      (crop: any) =>
        crop?.crop === recommendedCrop || crop?.name === recommendedCrop
    );

  const score =
    typeof cropData?.score === "number"
      ? cropData.score
      : typeof cropData?.probability === "number"
      ? cropData.probability * 100
      : null;

  const factors = [
    {
      icon: Thermometer,
      title: "Temperature",
      value:
        environment?.temperature !== undefined
          ? `${environment.temperature}°C`
          : "Available",
      description:
        "The current regional temperature is considered for crop suitability.",
    },
    {
      icon: Droplets,
      title: "Humidity",
      value:
        environment?.humidity !== undefined
          ? `${environment.humidity}%`
          : "Available",
      description:
        "Humidity conditions are used to evaluate environmental compatibility.",
    },
    {
      icon: CloudRain,
      title: "Rainfall",
      value:
        environment?.rainfall !== undefined
          ? `${environment.rainfall} mm`
          : "Available",
      description:
        "Regional rainfall helps determine whether the crop can grow effectively.",
    },
    {
      icon: FlaskConical,
      title: "Soil Conditions",
      value:
        environment?.soil_type ||
        environment?.soilType ||
        "Regional soil",
      description:
        "Soil characteristics and nutrient availability influence crop suitability.",
    },
  ];

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100">
            <Leaf className="h-5 w-5 text-green-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Why This Crop?
            </h2>
            <p className="text-sm text-gray-500">
              Key environmental factors behind the recommendation
            </p>
          </div>
        </div>
      </div>

      {/* Main Recommendation */}
      <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-green-600">
                Best Environmental Match
              </p>

              <h3 className="text-3xl font-bold text-gray-900">
                {recommendedCrop}
              </h3>

              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-green-600" />

                <span>
                  {location?.district}, {location?.state}
                </span>
              </div>
            </div>

            {score !== null && (
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-8 border-green-200 bg-white">
                <span className="text-xl font-bold text-green-700">
                  {score.toFixed(1)}
                </span>
                <span className="text-[10px] font-medium uppercase text-gray-500">
                  Score
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Explanation */}
        <div className="p-6">
          <div className="mb-5 flex items-start gap-3 rounded-xl bg-gray-50 p-4">
            <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />

            <p className="text-sm leading-6 text-gray-600">
              <span className="font-semibold text-gray-900">
                {recommendedCrop}
              </span>{" "}
              was selected because its environmental suitability matches the
              conditions detected for this region.
            </p>
          </div>

          {/* Factors */}
          <div className="grid gap-4 sm:grid-cols-2">
            {factors.map((factor) => {
              const Icon = factor.icon;

              return (
                <div
                  key={factor.title}
                  className="rounded-xl border border-gray-100 bg-white p-4 transition hover:border-green-200 hover:shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                        <Icon className="h-4 w-4 text-green-600" />
                      </div>

                      <span className="text-sm font-semibold text-gray-800">
                        {factor.title}
                      </span>
                    </div>

                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>

                  <p className="mb-1 text-lg font-bold text-gray-900">
                    {factor.value}
                  </p>

                  <p className="text-xs leading-5 text-gray-500">
                    {factor.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Agricultural basis */}
      <div className="mt-4 rounded-xl border border-green-100 bg-green-50/60 p-4">
        <div className="flex items-start gap-3">
          <Leaf className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />

          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Agricultural Suitability
            </h4>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              The crop recommendation is primarily based on the environmental
              conditions detected for the selected region and the crop
              suitability predictions generated by the agricultural ML model.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyThisCrop;
