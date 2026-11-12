import React from "react";
import {
  MapPin,
  Sprout,
  Thermometer,
  Droplets,
  CloudRain,
  FlaskConical,
  Map,
  Star,
  BarChart3,
  Utensils,
} from "lucide-react";

import { useAnalysis } from "../../context/AnalysisContext";

import WhyThisCrop from "./WhyThisCrop";
import ScoreVisualization from "./ScoreVisualization";
import NeedsAttention from "./NeedsAttention";
import EnvironmentalCharts from "./EnvironmentalCharts";
import CropComparison from "./CropComparison";
import DownloadReport from "./DownloadReport";

import type { AnalysisSection } from "./AnalysisSidebar";

interface AnalysisOverviewProps {
  activeSection: AnalysisSection;
}

const AnalysisOverview: React.FC<AnalysisOverviewProps> = ({
  activeSection,
}) => {
  const { analysisData } = useAnalysis();

  if (!analysisData) {
    return null;
  }

  const {
    location,
    coordinates,
    environment,
    predictedCrop,
    topCrops = [],
    finalRecommendations = [],
  } = analysisData;

  const formatValue = (
    value: unknown,
    unit = ""
  ): string => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "N/A";
    }

    return `${value}${unit}`;
  };

  const bestCrop =
    finalRecommendations.length > 0
      ? finalRecommendations[0]?.crop ||
        finalRecommendations[0]?.name ||
        predictedCrop
      : predictedCrop;

  const getCropName = (crop: any) => {
    return (
      crop?.crop ||
      crop?.name ||
      "Unknown Crop"
    );
  };

  const getCropScore = (crop: any) => {
    if (typeof crop?.score === "number") {
      return crop.score;
    }

    if (typeof crop?.probability === "number") {
      return crop.probability * 100;
    }

    return 0;
  };

  /*
   * ============================================================
   * OVERVIEW
   * ============================================================
   */

  const renderOverview = () => {
    return (
      <section className="space-y-6">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-lg bg-green-100 p-2">
              <Map className="h-5 w-5 text-green-700" />
            </div>

            <span className="text-sm font-semibold uppercase tracking-wider text-green-700">
              Regional Analysis
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Analysis Overview
          </h2>

          <p className="mt-2 text-gray-500">
            Environmental and crop recommendation summary for the
            selected region.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Location */}
          <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-green-50 p-3">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Selected Region
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-gray-900">
                    {location?.district || "Unknown District"}
                  </h3>

                  <p className="text-gray-500">
                    {location?.state || "Unknown State"}

                    {location?.country
                      ? `, ${location.country}`
                      : ""}
                  </p>
                </div>
              </div>

              <div className="hidden text-right sm:block">
                <p className="text-xs font-bold uppercase text-gray-400">
                  Coordinates
                </p>

                <p className="mt-1 text-sm font-medium text-gray-700">
                  {coordinates?.lat !== null &&
                  coordinates?.lat !== undefined
                    ? coordinates.lat.toFixed(4)
                    : "N/A"}

                  {" , "}

                  {coordinates?.lng !== null &&
                  coordinates?.lng !== undefined
                    ? coordinates.lng.toFixed(4)
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Crop */}
          <div className="rounded-2xl bg-gradient-to-br from-green-600 to-green-700 p-6 text-white shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-white/15 p-2">
                <Sprout className="h-6 w-6" />
              </div>

              <span className="text-sm font-semibold text-green-100">
                Recommended Crop
              </span>
            </div>

            <h3 className="text-3xl font-bold">
              {bestCrop || "Not Available"}
            </h3>

            <p className="mt-2 text-sm text-green-100">
              Based on the generated regional crop analysis.
            </p>
          </div>
        </div>

        {/* Quick Environment */}
        {environment && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h3 className="text-lg font-bold text-gray-900">
                Environmental Snapshot
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Key environmental conditions used by the crop
                suitability analysis.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <MetricCard
                icon={<Thermometer className="h-5 w-5" />}
                label="Temperature"
                value={formatValue(
                  environment.temperature,
                  "°C"
                )}
                className="bg-orange-50 text-orange-500"
              />

              <MetricCard
                icon={<Droplets className="h-5 w-5" />}
                label="Humidity"
                value={formatValue(
                  environment.humidity,
                  "%"
                )}
                className="bg-blue-50 text-blue-500"
              />

              <MetricCard
                icon={<CloudRain className="h-5 w-5" />}
                label="Rainfall"
                value={formatValue(
                  environment.rainfall,
                  " mm"
                )}
                className="bg-cyan-50 text-cyan-600"
              />

              <MetricCard
                icon={<FlaskConical className="h-5 w-5" />}
                label="Soil pH"
                value={formatValue(environment.ph)}
                className="bg-purple-50 text-purple-600"
              />
            </div>
          </div>
        )}

        {/* Top Crops */}
        {topCrops.length > 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h3 className="text-lg font-bold text-gray-900">
                Top Crop Recommendations
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Crops ranked by the environmental suitability
                model.
              </p>
            </div>

            <CropList crops={topCrops} />
          </div>
        )}

        <DownloadReport />
      </section>
    );
  };

  /*
   * ============================================================
   * LOCATION
   * ============================================================
   */

  const renderLocation = () => {
    return (
      <section className="space-y-6">
        <SectionHeader
          icon={<MapPin className="h-5 w-5" />}
          label="Location"
          title="Location Details"
          description="Geographical information for the selected analysis region."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InfoCard
            label="District"
            value={location?.district || "N/A"}
          />

          <InfoCard
            label="State"
            value={location?.state || "N/A"}
          />

          <InfoCard
            label="Country"
            value={location?.country || "N/A"}
          />

          <InfoCard
            label="Latitude"
            value={
              coordinates?.lat !== null &&
              coordinates?.lat !== undefined
                ? coordinates.lat.toFixed(6)
                : "N/A"
            }
          />

          <InfoCard
            label="Longitude"
            value={
              coordinates?.lng !== null &&
              coordinates?.lng !== undefined
                ? coordinates.lng.toFixed(6)
                : "N/A"
            }
          />
        </div>

        <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-white p-3">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>

            <div>
              <p className="text-sm font-semibold text-green-700">
                Selected Region
              </p>

              <h3 className="mt-1 text-xl font-bold text-gray-900">
                {location?.district || "Unknown District"},{" "}
                {location?.state || "Unknown State"}
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                The environmental and crop analysis is based on
                this selected region.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  /*
   * ============================================================
   * ENVIRONMENT
   * ============================================================
   */

  const renderEnvironment = () => {
    if (!environment) {
      return <EmptyState message="Environmental data is not available." />;
    }

    return (
      <section className="space-y-6">
        <SectionHeader
          icon={<CloudSun className="h-5 w-5" />}
          label="Environment"
          title="Environmental Data"
          description="Environmental conditions used for crop suitability analysis."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={<Thermometer className="h-5 w-5" />}
            label="Temperature"
            value={formatValue(
              environment.temperature,
              "°C"
            )}
            className="bg-orange-50 text-orange-500"
          />

          <MetricCard
            icon={<Droplets className="h-5 w-5" />}
            label="Humidity"
            value={formatValue(
              environment.humidity,
              "%"
            )}
            className="bg-blue-50 text-blue-500"
          />

          <MetricCard
            icon={<CloudRain className="h-5 w-5" />}
            label="Rainfall"
            value={formatValue(
              environment.rainfall,
              " mm"
            )}
            className="bg-cyan-50 text-cyan-600"
          />

          <MetricCard
            icon={<FlaskConical className="h-5 w-5" />}
            label="Soil pH"
            value={formatValue(environment.ph)}
            className="bg-purple-50 text-purple-600"
          />
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-gray-900">
              Soil Information
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Soil properties available for the selected region.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <InfoCard
              label="Soil Type"
              value={environment.soil_type || "N/A"}
            />

            <InfoCard
              label="Nitrogen (N)"
              value={formatValue(environment.N)}
            />

            <InfoCard
              label="Phosphorus (P)"
              value={formatValue(environment.P)}
            />

            <InfoCard
              label="Potassium (K)"
              value={formatValue(environment.K)}
            />

            <InfoCard
              label="Soil pH"
              value={formatValue(environment.ph)}
            />

            <InfoCard
              label="Rainfall"
              value={formatValue(
                environment.rainfall,
                " mm"
              )}
            />
          </div>
        </div>

        <EnvironmentalCharts />
      </section>
    );
  };

  /*
   * ============================================================
   * CROP SUITABILITY
   * ============================================================
   */

  const renderSuitability = () => {
    return (
      <section className="space-y-6">
        <SectionHeader
          icon={<BarChart3 className="h-5 w-5" />}
          label="Agriculture"
          title="Crop Suitability"
          description="Environmental suitability results produced by the crop analysis."
        />

        {topCrops.length > 0 ? (
          <>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">
                Environmental Crop Ranking
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Higher scores indicate stronger environmental
                suitability.
              </p>

              <div className="mt-6">
                <CropList crops={topCrops} />
              </div>
            </div>

            <WhyThisCrop />

            <ScoreVisualization />

            <NeedsAttention />

            <CropComparison />
          </>
        ) : (
          <EmptyState message="Crop suitability data is not available." />
        )}
      </section>
    );
  };

  /*
   * ============================================================
   * RECOMMENDED CROP
   * ============================================================
   */

  const renderRecommended = () => {
    return (
      <section className="space-y-6">
        <SectionHeader
          icon={<Star className="h-5 w-5" />}
          label="Recommendation"
          title="Recommended Crop"
          description="The highest-priority crop from the generated analysis."
        />

        <div className="rounded-3xl bg-gradient-to-br from-green-600 to-green-700 p-8 text-white shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-white/15 p-3">
                  <Sprout className="h-7 w-7" />
                </div>

                <span className="text-sm font-semibold uppercase tracking-wider text-green-100">
                  Best Recommendation
                </span>
              </div>

              <h3 className="text-4xl font-bold capitalize">
                {bestCrop || "Not Available"}
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-6 text-green-100">
                This crop is the highest-priority result from
                the current agricultural analysis.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-100">
                Model Prediction
              </p>

              <p className="mt-2 text-xl font-bold capitalize">
                {predictedCrop || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <WhyThisCrop />

        <ScoreVisualization />
      </section>
    );
  };

  /*
   * ============================================================
   * ALTERNATIVES
   * ============================================================
   */

  const renderAlternatives = () => {
    return (
      <section className="space-y-6">
        <SectionHeader
          icon={<Layers className="h-5 w-5" />}
          label="Alternatives"
          title="Top Crop Alternatives"
          description="Other crops ranked by the environmental suitability model."
        />

        {topCrops.length > 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <CropList crops={topCrops} detailed />
          </div>
        ) : (
          <EmptyState message="No alternative crops are available." />
        )}

        <CropComparison />
      </section>
    );
  };

  /*
   * ============================================================
   * NUTRITION
   * ============================================================
   */

  const renderNutrition = () => {
    return (
      <section className="space-y-6">
        <SectionHeader
          icon={<Utensils className="h-5 w-5" />}
          label="Nutrition"
          title="Nutrition Analysis"
          description="Nutrition-aware crop recommendations generated for the selected region."
        />

        {finalRecommendations.length > 0 ? (
          <>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-gray-900">
                  Nutrition-Aware Recommendations
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Crops returned by the final recommendation
                  pipeline.
                </p>
              </div>

              <div className="space-y-3">
                {finalRecommendations.map(
                  (crop: any, index: number) => {
                    const name = getCropName(crop);
                    const score = getCropScore(crop);

                    return (
                      <div
                        key={`${name}-${index}`}
                        className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                              <span className="text-sm font-bold text-green-700">
                                {index + 1}
                              </span>
                            </div>

                            <p className="truncate font-semibold capitalize text-gray-900">
                              {name}
                            </p>
                          </div>

                          {score > 0 && (
                            <span className="text-sm font-bold text-green-700">
                              {score.toFixed(1)}%
                            </span>
                          )}
                        </div>

                        {score > 0 && (
                          <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full rounded-full bg-green-500"
                              style={{
                                width: `${Math.min(
                                  Math.max(score, 0),
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </>
        ) : (
          <EmptyState message="Nutrition analysis data is not available yet." />
        )}
      </section>
    );
  };

  /*
   * ============================================================
   * SECTION SWITCH
   * ============================================================
   */

  switch (activeSection) {
    case "location":
      return renderLocation();

    case "environment":
      return renderEnvironment();

    case "suitability":
      return renderSuitability();

    case "recommended":
      return renderRecommended();

    case "alternatives":
      return renderAlternatives();

    case "nutrition":
      return renderNutrition();

    case "overview":
    default:
      return renderOverview();
  }
};

/*
 * ==============================================================
 * REUSABLE COMPONENTS
 * ==============================================================
 */

interface SectionHeaderProps {
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  label,
  title,
  description,
}) => {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <div className="rounded-lg bg-green-100 p-2 text-green-700">
          {icon}
        </div>

        <span className="text-sm font-semibold uppercase tracking-wider text-green-700">
          {label}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
        {title}
      </h2>

      <p className="mt-2 text-gray-500">
        {description}
      </p>
    </div>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  label,
  value,
  className = "",
}) => {
  return (
    <div
      className={`rounded-xl p-4 ${className}`}
    >
      <div className="mb-3">{icon}</div>

      <p className="text-xs font-bold uppercase text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
};

interface InfoCardProps {
  label: string;
  value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold capitalize text-gray-900">
        {value}
      </p>
    </div>
  );
};

interface CropListProps {
  crops: any[];
  detailed?: boolean;
}

const CropList: React.FC<CropListProps> = ({
  crops,
  detailed = false,
}) => {
  const getName = (crop: any) => {
    return (
      crop?.crop ||
      crop?.name ||
      "Unknown Crop"
    );
  };

  const getScore = (crop: any) => {
    if (typeof crop?.score === "number") {
      return crop.score;
    }

    if (typeof crop?.probability === "number") {
      return crop.probability * 100;
    }

    return 0;
  };

  return (
    <div className="space-y-3">
      {crops.slice(0, 5).map(
        (crop: any, index: number) => {
          const name = getName(crop);
          const score = getScore(crop);

          return (
            <div
              key={`${name}-${index}`}
              className={`rounded-xl ${
                detailed
                  ? "border border-gray-100 bg-white p-5"
                  : "bg-gray-50 p-4"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                  <span className="text-sm font-bold text-green-700">
                    {index + 1}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate font-semibold capitalize text-gray-900">
                      {name}
                    </p>

                    <span className="flex-shrink-0 text-sm font-bold text-green-700">
                      {score.toFixed(1)}%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all"
                      style={{
                        width: `${Math.min(
                          Math.max(score, 0),
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

const EmptyState: React.FC<{
  message: string;
}> = ({ message }) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50">
        <Sprout className="h-7 w-7 text-gray-400" />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        {message}
      </p>
    </div>
  );
};

export default AnalysisOverview;