import React from "react";

import {
  X,
  MapPin,
  Thermometer,
  BarChart3,
  Trophy,
  Sprout,
  Apple,
  Droplets,
  FlaskConical,
  CloudRain,
  Waves,
  Mountain,
} from "lucide-react";

interface AnalysisDataModalProps {
  section: string;

  onClose: () => void;

  locationData: {
    district: string;
    state: string;
    country: string;
  };

  coordinates: {
    lat: number | null;
    lng: number | null;
  };

  environmentInfo: any;

  predictedCrop: string;

  topCrops: any[];

  nutritionCrops: any[];

  agriculturalScore: number;

  recommendedCropScore: number;
}

const AnalysisDataModal: React.FC<
  AnalysisDataModalProps
> = ({
  section,
  onClose,
  locationData,
  coordinates,
  environmentInfo,
  predictedCrop,
  topCrops,
  nutritionCrops,
  agriculturalScore,
  recommendedCropScore,
}) => {

  // ==========================================================
  // MODAL INFORMATION
  // ==========================================================

  const sectionInfo: Record<
    string,
    {
      title: string;
      description: string;
      icon: React.ReactNode;
    }
  > = {

    location: {
      title: "Location Details",
      description:
        "Geographic information for the selected region.",
      icon: (
        <MapPin className="h-6 w-6" />
      ),
    },

    environment: {
      title: "Environmental Data",
      description:
        "Environmental and soil conditions detected for the region.",
      icon: (
        <Thermometer className="h-6 w-6" />
      ),
    },

    agriculture: {
      title: "Agricultural Suitability",
      description:
        "Environmental suitability calculated by the crop prediction model.",
      icon: (
        <BarChart3 className="h-6 w-6" />
      ),
    },

    recommended: {
      title: "Recommended Crop",
      description:
        "The highest-ranked crop based on environmental suitability.",
      icon: (
        <Trophy className="h-6 w-6" />
      ),
    },

    "top-crops": {
      title: "Top Crop Alternatives",
      description:
        "Other crops ranked by the environmental ML model.",
      icon: (
        <Sprout className="h-6 w-6" />
      ),
    },

    nutrition: {
      title: "Nutrition Analysis",
      description:
        "Nutrition-aware crop recommendations and nutrient contribution.",
      icon: (
        <Apple className="h-6 w-6" />
      ),
    },
  };

  const info =
    sectionInfo[section];

  // ==========================================================
  // ENVIRONMENT VALUE
  // ==========================================================

  const getValue = (
    value: any,
    fallback = "—"
  ) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return fallback;
    }

    return value;
  };

  // ==========================================================
  // SCORE BAR
  // ==========================================================

  const ScoreBar = ({
    score,
  }: {
    score: number;
  }) => {

    const safeScore = Math.max(
      0,
      Math.min(100, score)
    );

    return (
      <div className="mt-3">

        <div className="mb-1 flex justify-between text-xs text-gray-500">
          <span>Suitability</span>

          <span className="font-bold text-green-700">
            {safeScore.toFixed(1)}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-gray-100">

          <div
            className="h-full rounded-full bg-green-600 transition-all"
            style={{
              width: `${safeScore}%`,
            }}
          />

        </div>

      </div>
    );
  };

  // ==========================================================
  // LOCATION
  // ==========================================================

  const renderLocation = () => (
    <div className="space-y-6">

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <InfoCard
          icon={
            <MapPin className="h-5 w-5" />
          }
          label="District"
          value={
            locationData.district
          }
        />

        <InfoCard
          icon={
            <MapPin className="h-5 w-5" />
          }
          label="State"
          value={
            locationData.state
          }
        />

        <InfoCard
          icon={
            <MapPin className="h-5 w-5" />
          }
          label="Country"
          value={
            locationData.country
          }
        />

      </div>

      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">

        <p className="mb-4 font-bold text-gray-900">
          Selected Coordinates
        </p>

        <div className="grid grid-cols-2 gap-5">

          <div>
            <p className="text-xs text-gray-500">
              Latitude
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {getValue(
                coordinates.lat
              )}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Longitude
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {getValue(
                coordinates.lng
              )}
            </p>
          </div>

        </div>

      </div>

    </div>
  );

  // ==========================================================
  // ENVIRONMENT
  // ==========================================================

  const renderEnvironment = () => {

    if (!environmentInfo) {
      return (
        <EmptyState
          message="Environmental data is not available."
        />
      );
    }

    const metrics = [
      {
        label: "Temperature",
        value: `${getValue(
          environmentInfo.temperature
        )} °C`,
        icon: (
          <Thermometer className="h-5 w-5" />
        ),
      },

      {
        label: "Humidity",
        value: `${getValue(
          environmentInfo.humidity
        )} %`,
        icon: (
          <Droplets className="h-5 w-5" />
        ),
      },

      {
        label: "Rainfall",
        value: `${getValue(
          environmentInfo.rainfall
        )} mm`,
        icon: (
          <CloudRain className="h-5 w-5" />
        ),
      },

      {
        label: "Soil pH",
        value: getValue(
          environmentInfo.ph
        ),
        icon: (
          <FlaskConical className="h-5 w-5" />
        ),
      },

      {
        label: "Soil Type",
        value: getValue(
          environmentInfo.soil_type
        ),
        icon: (
          <Mountain className="h-5 w-5" />
        ),
      },

      {
        label: "Nitrogen",
        value: getValue(
          environmentInfo.N
        ),
        icon: (
          <Waves className="h-5 w-5" />
        ),
      },

      {
        label: "Phosphorus",
        value: getValue(
          environmentInfo.P
        ),
        icon: (
          <FlaskConical className="h-5 w-5" />
        ),
      },

      {
        label: "Potassium",
        value: getValue(
          environmentInfo.K
        ),
        icon: (
          <Sprout className="h-5 w-5" />
        ),
      },
    ];

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {metrics.map(
          (metric) => (

            <div
              key={
                metric.label
              }

              className="rounded-2xl border border-green-100 bg-green-50 p-5"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-600">

                  {metric.icon}

                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {metric.label}
                  </p>

                  <p className="mt-1 text-lg font-bold text-green-950">
                    {metric.value}
                  </p>

                </div>

              </div>

            </div>

          )
        )}

      </div>
    );
  };

  // ==========================================================
  // AGRICULTURAL SUITABILITY
  // ==========================================================

  const renderAgriculture = () => (
    <div className="space-y-6">

      <div className="rounded-2xl border border-green-100 bg-green-50 p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Recommended environmental crop
            </p>

            <h3 className="mt-1 text-2xl font-bold capitalize text-green-950">
              {getValue(
                predictedCrop
              )}
            </h3>

          </div>

          <div className="text-right">

            <p className="text-xs text-gray-500">
              Suitability
            </p>

            <p className="text-3xl font-bold text-green-600">
              {agriculturalScore.toFixed(
                1
              )}
              %
            </p>

          </div>

        </div>

        <ScoreBar
          score={
            agriculturalScore
          }
        />

      </div>

      <div className="rounded-xl bg-gray-50 p-5">

        <p className="text-sm leading-6 text-gray-600">
          This score currently represents the
          environmental ML probability used by
          the Planner as agricultural suitability.
        </p>

      </div>

    </div>
  );

  // ==========================================================
  // RECOMMENDED CROP
  // ==========================================================

  const renderRecommended = () => (
    <div className="space-y-6">

      <div className="rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-8 text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">

          <Trophy className="h-8 w-8 text-green-600" />

        </div>

        <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-green-600">
          Best Environmental Match
        </p>

        <h3 className="mt-3 text-4xl font-bold capitalize text-green-950">
          {getValue(
            predictedCrop
          )}
        </h3>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
          This crop received the highest
          environmental suitability score from
          the current crop prediction model.
        </p>

        <div className="mx-auto mt-6 max-w-sm">

          <ScoreBar
            score={
              recommendedCropScore
            }
          />

        </div>

      </div>

    </div>
  );

  // ==========================================================
  // TOP CROPS
  // ==========================================================

  const renderTopCrops = () => {

    if (
      !topCrops ||
      topCrops.length === 0
    ) {
      return (
        <EmptyState
          message="No alternative crops are available."
        />
      );
    }

    return (
      <div className="space-y-4">

        {topCrops.map(
          (
            crop: any,
            index: number
          ) => {

            const score =
              Number(
                crop.probability || 0
              ) * 100;

            return (
              <div
                key={`${crop.crop}-${index}`}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >

                <div className="flex items-center justify-between gap-4">

                  <div className="flex items-center gap-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 font-bold text-green-700">
                      #{index + 1}
                    </div>

                    <div>

                      <h3 className="text-lg font-bold capitalize text-gray-900">
                        {crop.crop}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Environmental suitability
                      </p>

                    </div>

                  </div>

                  <p className="text-xl font-bold text-green-600">
                    {score.toFixed(
                      1
                    )}
                    %
                  </p>

                </div>

                <ScoreBar
                  score={
                    score
                  }
                />

              </div>
            );
          }
        )}

      </div>
    );
  };

  // ==========================================================
  // NUTRITION ANALYSIS
  // ==========================================================

  const renderNutrition = () => {

    if (
      !nutritionCrops ||
      nutritionCrops.length === 0
    ) {
      return (
        <EmptyState
          message="Nutrition-aware recommendations are not available yet."
        />
      );
    }

    return (
      <div className="space-y-5">

        <div className="rounded-2xl border border-green-100 bg-green-50 p-5">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white text-green-600">

              <Apple className="h-5 w-5" />

            </div>

            <div>

              <h3 className="font-bold text-green-950">
                Nutrition-Aware Recommendations
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Crops are ranked using regional nutrient
                priorities and the average population
                nutritional reference.
              </p>

            </div>

          </div>

        </div>

        {nutritionCrops.map(
          (
            crop: any,
            index: number
          ) => (

            <div
              key={`${crop.crop}-${index}`}
              className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <div className="flex items-center gap-3">

                    <span className="font-bold text-green-600">
                      #{index + 1}
                    </span>

                    <h3 className="text-lg font-bold capitalize text-green-950">
                      {getValue(
                        crop.crop
                      )}
                    </h3>

                  </div>

                  {crop.agriculturalScore !==
                    undefined && (
                    <p className="mt-2 text-sm text-gray-500">
                      Agricultural suitability:{" "}
                      {(
                        Number(
                          crop.agriculturalScore
                        ) * 100
                      ).toFixed(1)}
                      %
                    </p>
                  )}

                </div>

                {crop.nutritionScore !==
                  undefined && (

                  <div className="text-right">

                    <p className="text-xs text-gray-500">
                      Nutrition Score
                    </p>

                    <p className="text-2xl font-bold text-green-600">
                      {crop.nutritionScore}
                    </p>

                  </div>
                )}

              </div>

              {/* Nutrient details */}

              {crop.nutrientDetails &&
                crop.nutrientDetails.length >
                  0 && (

                  <div className="mt-5 border-t border-gray-100 pt-4">

                    <p className="mb-3 font-semibold text-gray-900">
                      Nutrient Contribution
                    </p>

                    <div className="space-y-2">

                      {crop.nutrientDetails.map(
                        (
                          nutrient: any,
                          nutrientIndex: number
                        ) => (

                          <div
                            key={`${nutrient.nutrient}-${nutrientIndex}`}
                            className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm"
                          >

                            <span className="capitalize text-gray-600">
                              {nutrient.nutrient}
                            </span>

                            <span className="font-semibold text-gray-900">

                              {nutrient.adequacy !==
                              undefined
                                ? `${(
                                    Number(
                                      nutrient.adequacy
                                    ) * 100
                                  ).toFixed(
                                    1
                                  )}%`
                                : getValue(
                                    nutrient.cropValue
                                  )}

                            </span>

                          </div>

                        )
                      )}

                    </div>

                  </div>
                )}

              {crop.nutritionDataAvailable ===
                false && (

                <p className="mt-4 text-sm text-orange-600">
                  Nutrition data is not available
                  for this crop.
                </p>

              )}

            </div>

          )
        )}

      </div>
    );
  };

  // ==========================================================
  // SELECT CONTENT
  // ==========================================================

  const renderContent = () => {

    switch (section) {

      case "location":
        return renderLocation();

      case "environment":
        return renderEnvironment();

      case "agriculture":
        return renderAgriculture();

      case "recommended":
        return renderRecommended();

      case "top-crops":
        return renderTopCrops();

      case "nutrition":
        return renderNutrition();

      default:
        return (
          <EmptyState
            message="Analysis data is not available."
          />
        );
    }
  };

  // ==========================================================
  // MODAL
  // ==========================================================

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >

      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="flex flex-shrink-0 items-start justify-between border-b border-gray-100 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">

              {info?.icon}

            </div>

            <div>

              <h2 className="text-2xl font-bold text-gray-900">
                {info?.title ||
                  "Analysis"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {info?.description}
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >

            <X className="h-5 w-5" />

          </button>

        </div>

        {/* CONTENT */}

        <div className="overflow-y-auto p-6">

          {renderContent()}

        </div>

      </div>

    </div>
  );
};

// ============================================================
// SMALL INFO CARD
// ============================================================

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: any;
}) {
  return (
    <div className="rounded-2xl border border-green-100 bg-green-50 p-5">

      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-600">
        {icon}
      </div>

      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-bold text-gray-900">
        {value || "—"}
      </p>

    </div>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

function EmptyState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-10 text-center">

      <p className="text-sm text-gray-500">
        {message}
      </p>

    </div>
  );
}

export default AnalysisDataModal;