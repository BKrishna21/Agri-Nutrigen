import React from "react";

import {
  MapPin,
  Thermometer,
  BarChart3,
  Trophy,
  Sprout,
  Apple,
  ArrowRight,
} from "lucide-react";

interface AnalysisOptionsProps {
  onSelect: (section: string) => void;
}

const AnalysisOptions: React.FC<
  AnalysisOptionsProps
> = ({ onSelect }) => {

  const options = [
    {
      id: "location",
      title: "Location Details",
      description:
        "View the selected region, district, state and coordinates.",
      icon: MapPin,
    },

    {
      id: "environment",
      title: "Environmental Data",
      description:
        "View temperature, humidity, rainfall, soil and NPK.",
      icon: Thermometer,
    },

    {
      id: "agriculture",
      title: "Crop Suitability",
      description:
        "View how suitable the region is for crop cultivation.",
      icon: BarChart3,
    },

    {
      id: "recommended",
      title: "Recommended Crop",
      description:
        "View the highest-ranked crop for this region.",
      icon: Trophy,
    },

    {
      id: "top-crops",
      title: "Top Crop Alternatives",
      description:
        "Compare other crops identified by the ML model.",
      icon: Sprout,
    },

    {
      id: "nutrition",
      title: "Nutrition Analysis",
      description:
        "View nutrition scores and nutrient contributions.",
      icon: Apple,
    },
  ];

  return (
    <section className="w-full">

      {/* HEADER */}

      <div className="mb-6">

        <p className="text-sm font-bold uppercase tracking-widest text-green-600">
          Analysis Complete
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-950">
          Explore Regional Analysis
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
          Select any category below to view detailed
          information about the selected region.
        </p>

      </div>

      {/* OPTIONS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {options.map((option) => {

          const Icon =
            option.icon;

          return (

            <button
              key={
                option.id
              }

              onClick={() =>
                onSelect(
                  option.id
                )
              }

              className="group rounded-2xl border border-green-100 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
            >

              {/* ICON + ARROW */}

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-colors group-hover:bg-green-100">

                  <Icon className="h-6 w-6" />

                </div>

                <ArrowRight
                  className="h-5 w-5 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-green-600"
                />

              </div>

              {/* TITLE */}

              <h3 className="mt-5 font-bold text-gray-900">
                {option.title}
              </h3>

              {/* DESCRIPTION */}

              <p className="mt-2 min-h-[40px] text-sm leading-5 text-gray-500">
                {option.description}
              </p>

              {/* ACTION */}

              <div className="mt-5 text-xs font-bold text-green-600">
                View details →
              </div>

            </button>

          );
        })}

      </div>

    </section>
  );
};

export default AnalysisOptions;