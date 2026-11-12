import React from "react";
import {
  Leaf,
  Droplets,
  Thermometer,
  CloudRain,
  FlaskConical,
  Sprout
} from "lucide-react";

interface EnvironmentalInfo {
  N?: number;
  P?: number;
  K?: number;
  temperature?: number;
  humidity?: number;
  ph?: number;
  rainfall?: number;
  soil_type?: string;
}

interface EnvironmentalMetricsProps {
  environmentInfo: EnvironmentalInfo;
}

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  description: string;
  icon: React.ElementType;
}

function MetricCard({
  label,
  value,
  unit,
  description,
  icon: Icon
}: MetricCardProps) {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">

      <div className="flex items-start justify-between gap-3">

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            {label}
          </p>

          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl sm:text-3xl font-bold text-green-950">
              {value}
            </span>

            {unit && (
              <span className="text-sm font-semibold text-gray-400">
                {unit}
              </span>
            )}
          </div>
        </div>

        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
          <Icon className="w-5 h-5 text-green-600" />
        </div>

      </div>

      <p className="text-xs text-gray-500 mt-3">
        {description}
      </p>

    </div>
  );
}

export default function EnvironmentalMetrics({
  environmentInfo
}: EnvironmentalMetricsProps) {
  if (!environmentInfo) {
    return null;
  }

  const formatValue = (
    value: number | undefined,
    decimals = 0
  ) => {
    if (value === undefined || value === null) {
      return "—";
    }

    return value.toFixed(decimals);
  };

  return (
    <section className="w-full max-w-5xl mx-auto mt-10">

      {/* Section Header */}
      <div className="mb-6">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-green-700" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-green-600">
              Environmental Profile
            </p>

            <h2 className="text-2xl font-bold text-green-950">
              Regional Conditions
            </h2>
          </div>

        </div>

        <p className="text-gray-500 text-sm mt-3">
          Key soil and environmental conditions identified for the selected region.
        </p>

      </div>

      {/* Nutrient Metrics */}
      <div className="mb-4">

        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          Soil Nutrients
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <MetricCard
            label="Nitrogen"
            value={formatValue(environmentInfo.N)}
            description="Nitrogen available in the soil."
            icon={Sprout}
          />

          <MetricCard
            label="Phosphorus"
            value={formatValue(environmentInfo.P)}
            description="Phosphorus available in the soil."
            icon={Leaf}
          />

          <MetricCard
            label="Potassium"
            value={formatValue(environmentInfo.K)}
            description="Potassium available in the soil."
            icon={FlaskConical}
          />

        </div>

      </div>

      {/* Climate Metrics */}
      <div className="mt-7">

        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          Climate Conditions
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <MetricCard
            label="Temperature"
            value={formatValue(environmentInfo.temperature, 1)}
            unit="°C"
            description="Average temperature for the region."
            icon={Thermometer}
          />

          <MetricCard
            label="Humidity"
            value={formatValue(environmentInfo.humidity, 1)}
            unit="%"
            description="Average relative humidity."
            icon={Droplets}
          />

          <MetricCard
            label="Soil pH"
            value={formatValue(environmentInfo.ph, 1)}
            description="Measured soil acidity or alkalinity."
            icon={FlaskConical}
          />

          <MetricCard
            label="Rainfall"
            value={formatValue(environmentInfo.rainfall, 1)}
            unit="mm"
            description="Expected rainfall for the region."
            icon={CloudRain}
          />

        </div>

      </div>

      {/* Soil Type */}
      <div className="mt-7">

        <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-700" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-green-600">
                Soil Type
              </p>

              <p className="text-lg font-bold text-green-950">
                {environmentInfo.soil_type || "Not available"}
              </p>
            </div>

          </div>

          <span className="text-xs font-semibold text-green-700 bg-white border border-green-100 px-3 py-2 rounded-full">
            Regional Soil Data
          </span>

        </div>

      </div>

    </section>
  );
}