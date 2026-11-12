import React from "react";
import {
  LayoutDashboard,
  MapPin,
  CloudSun,
  Sprout,
  Star,
  Layers,
  Utensils,
} from "lucide-react";

export type AnalysisSection =
  | "overview"
  | "location"
  | "environment"
  | "suitability"
  | "recommended"
  | "alternatives"
  | "nutrition";

interface AnalysisSidebarProps {
  activeSection: AnalysisSection;
  onSectionChange: (section: AnalysisSection) => void;
}

const menuItems = [
  {
    id: "overview" as AnalysisSection,
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    id: "location" as AnalysisSection,
    label: "Location Details",
    icon: MapPin,
  },
  // {
  //   id: "environment" as AnalysisSection,
  //   label: "Environmental Data",
  //   icon: CloudSun,
  // },
  {
    id: "suitability" as AnalysisSection,
    label: "Crop Suitability",
    icon: Sprout,
  },
  {
    id: "recommended" as AnalysisSection,
    label: "Recommended Crop",
    icon: Star,
  },
  // {
  //   id: "alternatives" as AnalysisSection,
  //   label: "Top Crop Alternatives",
  //   icon: Layers,
  // },
  {
    id: "nutrition" as AnalysisSection,
    label: "Nutrition Analysis",
    icon: Utensils,
  },
];

const AnalysisSidebar: React.FC<AnalysisSidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  return (
    <aside className="w-full lg:w-64 lg:flex-shrink-0">
      <div className="sticky top-6 rounded-2xl border border-green-100 bg-white p-3 shadow-sm">
        <div className="mb-3 px-3 py-3">
          <p className="text-xs font-bold uppercase tracking-wider text-green-600">
            Analysis Menu
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            Explore each part of your agricultural analysis.
          </p>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                  isActive
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                <Icon
                  className={`h-4 w-4 flex-shrink-0 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-green-600"
                  }`}
                />

                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default AnalysisSidebar;