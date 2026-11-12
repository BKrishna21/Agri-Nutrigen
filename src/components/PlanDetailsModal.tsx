
import React from "react";
import { X, MapPin, Wheat, Calendar, Sprout } from "lucide-react";

interface PlanDetailsModalProps {
  plan: any;
  onClose: () => void;
}

export default function PlanDetailsModal({
  plan,
  onClose
}: PlanDetailsModalProps) {
  if (!plan) return null;

  const environment = plan.environmentInfo || {};

  const details = [
    { label: "Nitrogen (N)", value: environment.N },
    { label: "Phosphorus (P)", value: environment.P },
    { label: "Potassium (K)", value: environment.K },
    { label: "Temperature", value: environment.temperature, unit: "°C" },
    { label: "Humidity", value: environment.humidity, unit: "%" },
    { label: "Soil pH", value: environment.ph },
    { label: "Rainfall", value: environment.rainfall, unit: "mm" },
    { label: "Soil Type", value: environment.soil_type }
  ];

  const displayValue = (value: any, unit = "") => {
    if (value === undefined || value === null || value === "") {
      return "Not available";
    }

    return `${value}${unit}`;
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-details-title"
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-green-600">
              AgriNutrigen
            </p>
            <h2
              id="plan-details-title"
              className="text-2xl font-bold text-green-950 mt-1"
            >
              Plan Details
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
            aria-label="Close details"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Recommended Crop */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <Wheat className="w-7 h-7 text-green-700" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                  Recommended Crop
                </p>
                <h3 className="text-2xl font-bold text-green-950 capitalize">
                  {plan.recommendedCrop || "Not available"}
                </h3>
              </div>
            </div>
          </div>

          {/* Location */}
          <section>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              Location Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 rounded-2xl p-4">
              <div>
                <p className="text-xs text-gray-400">District</p>
                <p className="font-semibold text-gray-800">
                  {plan.district || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">State</p>
                <p className="font-semibold text-gray-800">
                  {plan.state || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Country</p>
                <p className="font-semibold text-gray-800">
                  {plan.country || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Latitude</p>
                <p className="font-semibold text-gray-800">
                  {displayValue(plan.latitude)}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Longitude</p>
                <p className="font-semibold text-gray-800">
                  {displayValue(plan.longitude)}
                </p>
              </div>
            </div>
          </section>

          {/* Environmental Information */}
          <section>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-green-600" />
              Environmental Parameters
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="bg-gray-50 border border-gray-100 rounded-xl p-4"
                >
                  <p className="text-xs text-gray-500 mb-1">
                    {item.label}
                  </p>

                  <p className="font-bold text-gray-900 break-words">
                    {displayValue(item.value, item.unit)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Plan Information */}
          <section className="border-t border-gray-100 pt-4">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Plan Information
            </h3>

            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <span className="font-semibold">Saved by:</span>{" "}
                {plan.name || "Not available"}
              </p>

              <p>
                <span className="font-semibold">Email:</span>{" "}
                {plan.email || "Not available"}
              </p>

              <p>
                <span className="font-semibold">Created:</span>{" "}
                {plan.createdAt
                  ? new Date(plan.createdAt).toLocaleString()
                  : "Just now"}
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-5 text-right">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}