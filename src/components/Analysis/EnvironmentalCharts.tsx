import React from "react";
import {
  BarChart3,
  Thermometer,
  Droplets,
  CloudRain,
  FlaskConical,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useAnalysis } from "../../context/AnalysisContext";

const EnvironmentalCharts: React.FC = () => {
  const { analysisData } = useAnalysis();

  if (!analysisData) {
    return null;
  }

  const environment = analysisData.environment || {};

  const temperature = Number(environment.temperature);
  const humidity = Number(environment.humidity);
  const rainfall = Number(environment.rainfall);
  const ph = Number(environment.ph);

  const hasTemperature = !Number.isNaN(temperature);
  const hasHumidity = !Number.isNaN(humidity);
  const hasRainfall = !Number.isNaN(rainfall);
  const hasPh = !Number.isNaN(ph);

  const chartData = [
    {
      name: "Temperature",
      value: hasTemperature ? temperature : 0,
      unit: "°C",
    },
    {
      name: "Humidity",
      value: hasHumidity ? humidity : 0,
      unit: "%",
    },
    {
      name: "Rainfall",
      value: hasRainfall ? rainfall : 0,
      unit: "mm",
    },
    {
      name: "Soil pH",
      value: hasPh ? ph : 0,
      unit: "",
    },
  ];

  const availableValues = chartData.filter((item) => {
    return item.value !== 0;
  });

  const metrics = [
    {
      label: "Temperature",
      value: hasTemperature ? `${temperature}°C` : "Not available",
      icon: Thermometer,
    },
    {
      label: "Humidity",
      value: hasHumidity ? `${humidity}%` : "Not available",
      icon: Droplets,
    },
    {
      label: "Rainfall",
      value: hasRainfall ? `${rainfall} mm` : "Not available",
      icon: CloudRain,
    },
    {
      label: "Soil pH",
      value: hasPh ? ph.toFixed(1) : "Not available",
      icon: FlaskConical,
    },
  ];

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Environmental Profile
            </h2>

            <p className="text-sm text-gray-500">
              Visual overview of the detected regional conditions
            </p>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50">
                  <Icon className="h-4 w-4 text-gray-600" />
                </div>

                <span className="text-xs font-medium text-gray-500">
                  {metric.label}
                </span>
              </div>

              <p className="text-xl font-bold text-gray-900">
                {metric.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h3 className="font-semibold text-gray-900">
            Environmental Comparison
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Current values detected for the selected region.
          </p>
        </div>

        {availableValues.length === 0 ? (
          <div className="flex min-h-[280px] items-center justify-center">
            <p className="text-sm text-gray-500">
              Environmental chart data is not available.
            </p>
          </div>
        ) : (
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 10,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tick={{
                    fontSize: 11,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fontSize: 11,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  formatter={(value: number, _name, props: any) => [
                    `${value} ${props?.payload?.unit || ""}`.trim(),
                    "Value",
                  ]}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  }}
                />

                <Bar
                  dataKey="value"
                  fill="#16a34a"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={55}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Soil Information */}
      <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <div className="flex items-start gap-3">
          <FlaskConical className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />

          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Soil Information
            </h4>

            <p className="mt-1 text-sm text-gray-600">
              Soil Type:{" "}
              <span className="font-medium text-gray-900">
                {environment.soil_type ||
                  environment.soilType ||
                  "Not available"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentalCharts;