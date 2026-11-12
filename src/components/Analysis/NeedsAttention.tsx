import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Thermometer,
  CloudRain,
  FlaskConical,
  Leaf,
} from "lucide-react";
import { useAnalysis } from "../../context/AnalysisContext";

interface AttentionItem {
  title: string;
  value: string;
  message: string;
  severity: "high" | "medium" | "good";
  icon: React.ElementType;
}

const NeedsAttention: React.FC = () => {
  const { analysisData } = useAnalysis();

  if (!analysisData) {
    return null;
  }

  const environment = analysisData.environment || {};

  const items: AttentionItem[] = [];

  const temperature = Number(environment.temperature);
  const humidity = Number(environment.humidity);
  const rainfall = Number(environment.rainfall);
  const ph = Number(environment.ph);

  /*
   * These thresholds are only used as general environmental
   * indicators. Crop-specific thresholds should come from the
   * agricultural ML/data pipeline when available.
   */

  if (!Number.isNaN(temperature)) {
    if (temperature < 15 || temperature > 35) {
      items.push({
        title: "Temperature",
        value: `${temperature}°C`,
        message:
          "Temperature is outside a broad comfortable range and may require attention.",
        severity: "high",
        icon: Thermometer,
      });
    } else if (temperature < 18 || temperature > 32) {
      items.push({
        title: "Temperature",
        value: `${temperature}°C`,
        message:
          "Temperature is slightly outside the preferred general range.",
        severity: "medium",
        icon: Thermometer,
      });
    }
  }

  if (!Number.isNaN(humidity)) {
    if (humidity < 30 || humidity > 85) {
      items.push({
        title: "Humidity",
        value: `${humidity}%`,
        message:
          "Humidity is at an extreme level and may affect crop growth.",
        severity: "high",
        icon: Droplets,
      });
    } else if (humidity < 40 || humidity > 75) {
      items.push({
        title: "Humidity",
        value: `${humidity}%`,
        message:
          "Humidity is somewhat outside a generally comfortable range.",
        severity: "medium",
        icon: Droplets,
      });
    }
  }

  if (!Number.isNaN(rainfall)) {
    if (rainfall < 400 || rainfall > 2500) {
      items.push({
        title: "Rainfall",
        value: `${rainfall} mm`,
        message:
          "Annual rainfall may require additional water-management attention.",
        severity: "high",
        icon: CloudRain,
      });
    } else if (rainfall < 600 || rainfall > 2000) {
      items.push({
        title: "Rainfall",
        value: `${rainfall} mm`,
        message:
          "Rainfall is somewhat outside a broad general range.",
        severity: "medium",
        icon: CloudRain,
      });
    }
  }

  if (!Number.isNaN(ph)) {
    if (ph < 5 || ph > 8.5) {
      items.push({
        title: "Soil pH",
        value: ph.toFixed(1),
        message:
          "Soil pH is outside a broad range suitable for many crops.",
        severity: "high",
        icon: FlaskConical,
      });
    } else if (ph < 5.5 || ph > 8) {
      items.push({
        title: "Soil pH",
        value: ph.toFixed(1),
        message:
          "Soil pH may require attention depending on the selected crop.",
        severity: "medium",
        icon: FlaskConical,
      });
    }
  }

  const severityStyles = {
    high: {
      container: "border-red-100 bg-red-50",
      icon: "bg-red-100 text-red-600",
      badge: "bg-red-100 text-red-700",
      label: "High Attention",
    },
    medium: {
      container: "border-amber-100 bg-amber-50",
      icon: "bg-amber-100 text-amber-600",
      badge: "bg-amber-100 text-amber-700",
      label: "Monitor",
    },
    good: {
      container: "border-green-100 bg-green-50",
      icon: "bg-green-100 text-green-600",
      badge: "bg-green-100 text-green-700",
      label: "Good",
    },
  };

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Needs Attention
            </h2>

            <p className="text-sm text-gray-500">
              Environmental conditions that may require monitoring
            </p>
          </div>
        </div>
      </div>

      {/* No issues */}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                No major environmental concerns detected
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                The available environmental values are within the broad
                monitoring ranges used by this dashboard.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;
            const styles = severityStyles[item.severity];

            return (
              <div
                key={item.title}
                className={`rounded-2xl border p-5 ${styles.container}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${styles.icon}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-lg font-bold text-gray-900">
                        {item.value}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}
                  >
                    {styles.label}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {item.message}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Informational note */}
      <div className="mt-4 flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <Leaf className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />

        <p className="text-xs leading-5 text-gray-500">
          These are broad environmental indicators, not crop-specific
          diagnoses. Final suitability should be interpreted together with
          the agricultural recommendation.
        </p>
      </div>
    </section>
  );
};

export default NeedsAttention;