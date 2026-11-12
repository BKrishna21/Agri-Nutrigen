import React from "react";

import {
  MapPin,
  CheckCircle2,
  Navigation,
  RefreshCcw,
  ArrowRight
} from "lucide-react";

interface LocationData {
  district: string;
  state: string;
  country: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationAnalysisCardProps {
  locationData: LocationData;
  coordinates: Coordinates;
  isMatched: boolean;
  isAnalyzing?: boolean;
  onAnalyze: () => void;
  onChangeLocation: () => void;
}

export default function LocationAnalysisCard({
  locationData,
  coordinates,
  isMatched,
  isAnalyzing = false,
  onAnalyze,
  onChangeLocation
}: LocationAnalysisCardProps) {
  const hasLocation =
    locationData?.district ||
    locationData?.state ||
    locationData?.country;

  if (!hasLocation) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-white shadow-lg">

        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-green-50 rounded-full blur-3xl opacity-70 pointer-events-none" />

        <div className="relative p-6 sm:p-8">

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">

            <div className="flex items-start gap-4">

              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-700" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-1">
                  Selected Location
                </p>

                <h3 className="text-xl sm:text-2xl font-bold text-green-950">
                  {locationData.district || "Selected Region"}
                </h3>

                <p className="text-gray-500 mt-1">
                  {[
                    locationData.state,
                    locationData.country
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>

            </div>

            {/* Match Status */}
            {isMatched && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-bold whitespace-nowrap">
                <CheckCircle2 className="w-4 h-4" />
                Region Matched
              </div>
            )}

          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-3 mb-6">

            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Navigation className="w-4 h-4 text-green-600" />

                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Latitude
                </p>
              </div>

              <p className="text-sm sm:text-base font-bold text-gray-800">
                {typeof coordinates?.lat === "number"
                  ? coordinates.lat.toFixed(5)
                  : "Not available"}
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Navigation className="w-4 h-4 text-green-600 rotate-90" />

                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Longitude
                </p>
              </div>

              <p className="text-sm sm:text-base font-bold text-gray-800">
                {typeof coordinates?.lng === "number"
                  ? coordinates.lng.toFixed(5)
                  : "Not available"}
              </p>
            </div>

          </div>

          {/* Status message */}
          <div
            className={`rounded-2xl p-4 mb-6 ${
              isMatched
                ? "bg-green-50 border border-green-100"
                : "bg-yellow-50 border border-yellow-100"
            }`}
          >

            <div className="flex items-start gap-3">

              {isMatched ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              ) : (
                <MapPin className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              )}

              <div>
                <p
                  className={`font-semibold ${
                    isMatched
                      ? "text-green-800"
                      : "text-yellow-800"
                  }`}
                >
                  {isMatched
                    ? "Your region is ready for analysis"
                    : "Location selected"}
                </p>

                <p
                  className={`text-sm mt-1 ${
                    isMatched
                      ? "text-green-700"
                      : "text-yellow-700"
                  }`}
                >
                  {isMatched
                    ? "Environmental data is available for this region."
                    : "Select a region with matching environmental data to continue."}
                </p>
              </div>

            </div>

          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">

            <button
              type="button"
              onClick={onAnalyze}
              disabled={!isMatched || isAnalyzing}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold transition-all ${
                isMatched && !isAnalyzing
                  ? "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCcw className="w-5 h-5 animate-spin" />
                  Analyzing Region...
                </>
              ) : (
                <>
                  Analyze Region
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onChangeLocation}
              disabled={isAnalyzing}
              className="px-6 py-3.5 rounded-2xl font-semibold border border-green-200 text-green-700 bg-white hover:bg-green-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Change Location
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}