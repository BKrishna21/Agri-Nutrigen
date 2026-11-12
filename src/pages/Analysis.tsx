



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   MapPin,
//   Leaf,
//   ArrowLeft,
//   Sprout,
// } from "lucide-react";

// import { useAnalysis } from "../context/AnalysisContext";
// import AnalysisOverview from "../components/Analysis/AnalysisOverview";

// const Analysis: React.FC = () => {
//   const navigate = useNavigate();
//   const { analysisData } = useAnalysis();

//   /*
//    * No analysis has been generated yet.
//    */
//   if (!analysisData) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

//           <button
//             onClick={() => navigate("/planner")}
//             className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-600"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Go to Planner
//           </button>

//           <div className="rounded-2xl border border-green-100 bg-white p-10 text-center shadow-sm">
//             <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50">
//               <Sprout className="h-8 w-8 text-green-600" />
//             </div>

//             <h1 className="text-2xl font-bold text-gray-900">
//               No Analysis Available
//             </h1>

//             <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
//               Select a location in the Planner and generate a regional
//               analysis. Your agricultural analysis will appear here.
//             </p>

//             <button
//               onClick={() => navigate("/planner")}
//               className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
//             >
//               <MapPin className="h-4 w-4" />
//               Select Location
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const location = analysisData.location;

//   const recommendedCrop =
//     analysisData.finalRecommendations?.[0]?.crop ||
//     analysisData.finalRecommendations?.[0]?.name ||
//     analysisData.predictedCrop ||
//     "Not available";

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

//         {/* =========================================================
//             HEADER
//         ========================================================= */}
//         <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

//           <div>
//             <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-600">
//               Agricultural Intelligence
//             </p>

//             <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
//               Analysis Dashboard
//             </h1>

//             <div className="mt-3 flex items-center gap-2 text-gray-600">
//               <MapPin className="h-5 w-5 text-green-600" />

//               <span>
//                 {location?.district || "Unknown District"},{" "}
//                 {location?.state || "Unknown State"}
//               </span>
//             </div>
//           </div>

//           <button
//             onClick={() => navigate("/planner")}
//             className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
//           >
//             <MapPin className="h-4 w-4" />
//             Analyze Another Location
//           </button>
//         </div>

//         {/* =========================================================
//             ANALYSIS SUMMARY
//         ========================================================= */}
//         <div className="mb-8 overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm">

//           <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">

//             <div className="flex items-start gap-4">

//               <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-50">
//                 <Leaf className="h-6 w-6 text-green-600" />
//               </div>

//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">
//                   Analysis Generated
//                 </h2>

//                 <p className="mt-1 text-sm leading-6 text-gray-500">
//                   Your regional analysis has been generated successfully.
//                   Detailed agricultural insights are shown below.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 self-start rounded-lg bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 sm:self-auto">
//               <Sprout className="h-4 w-4" />
//               <span>
//                 Recommended Crop:{" "}
//                 <span className="capitalize">
//                   {recommendedCrop}
//                 </span>
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* =========================================================
//             FULL ANALYSIS
//         ========================================================= */}
//         <AnalysisOverview />

//       </div>
//     </div>
//   );
// };

// export default Analysis;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Sprout,
  ArrowLeft,
} from "lucide-react";

import { useAnalysis } from "../context/AnalysisContext";

import AnalysisOverview from "../components/Analysis/AnalysisOverview";
import AnalysisSidebar, {
  type AnalysisSection,
} from "../components/Analysis/AnalysisSidebar";

const Analysis: React.FC = () => {
  const navigate = useNavigate();

  const { analysisData } = useAnalysis();

  const [activeSection, setActiveSection] =
    useState<AnalysisSection>("overview");

  /*
   * ============================================================
   * NO ANALYSIS STATE
   * ============================================================
   */

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/planner")}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Go to Planner
          </button>

          <div className="rounded-2xl border border-green-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50">
              <Sprout className="h-8 w-8 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              No Analysis Available
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
              Select a location in the Planner and generate a
              regional analysis. Your agricultural analysis will
              appear here.
            </p>

            <button
              onClick={() => navigate("/planner")}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              <MapPin className="h-4 w-4" />
              Select Location
            </button>
          </div>
        </div>
      </div>
    );
  }

  const location = analysisData.location;

  const recommendedCrop =
    analysisData.finalRecommendations?.[0]?.crop ||
    analysisData.finalRecommendations?.[0]?.name ||
    analysisData.predictedCrop ||
    "Not available";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-600">
              Agricultural Intelligence
            </p>

            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Analysis Dashboard
            </h1>

            <div className="mt-3 flex items-center gap-2 text-gray-600">
              <MapPin className="h-5 w-5 text-green-600" />

              <span>
                {location?.district ||
                  "Unknown District"}
                ,{" "}
                {location?.state ||
                  "Unknown State"}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/planner")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
          >
            <MapPin className="h-4 w-4" />
            Analyze Another Location
          </button>
        </div>

        {/* =====================================================
            ANALYSIS STATUS
        ====================================================== */}

        <div className="mb-6 overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm">
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-green-50">
                <Sprout className="h-6 w-6 text-green-600" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Analysis Generated
                </h2>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Explore the generated agricultural analysis
                  using the sections below.
                </p>
              </div>
            </div>

            <div className="self-start rounded-lg bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 sm:self-auto">
              Recommended Crop:{" "}
              <span className="capitalize">
                {recommendedCrop}
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            DASHBOARD
        ====================================================== */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Sidebar */}
          <AnalysisSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          {/* Main Content */}
          <main className="min-w-0 flex-1">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
              <AnalysisOverview
                activeSection={activeSection}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Analysis;