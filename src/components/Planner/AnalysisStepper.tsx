import React from "react";
import {
  Check,
  MapPin,
  Database,
  Sprout,
  BarChart3,
  Loader2
} from "lucide-react";

interface AnalysisStepperProps {
  currentStep: number;
  isAnalyzing: boolean;
}

const steps = [
  {
    title: "Location Identified",
    description: "Your selected region has been identified.",
    icon: MapPin
  },
  {
    title: "Environmental Data",
    description: "Loading soil and environmental conditions.",
    icon: Database
  },
  {
    title: "Crop Suitability",
    description: "Evaluating suitable crops for this region.",
    icon: Sprout
  },
  {
    title: "Generating Recommendation",
    description: "Preparing your final crop recommendation.",
    icon: BarChart3
  }
];

export default function AnalysisStepper({
  currentStep,
  isAnalyzing
}: AnalysisStepperProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="rounded-3xl border border-green-100 bg-white shadow-lg p-6 sm:p-8">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-100 mb-4">
            {isAnalyzing ? (
              <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
            ) : (
              <Check className="w-6 h-6 text-green-600" />
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-green-950">
            {isAnalyzing
              ? "Analyzing Your Region"
              : "Analysis Complete"}
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            {isAnalyzing
              ? "We are evaluating environmental conditions and crop suitability."
              : "Your regional analysis is ready."}
          </p>

        </div>

        {/* Steps */}
        <div className="space-y-5">

          {steps.map((step, index) => {

            const stepNumber = index + 1;

            const isCompleted = currentStep > stepNumber;
            const isCurrent = currentStep === stepNumber;

            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative flex items-start gap-4"
              >

                {/* Vertical connector */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-5 top-11 w-0.5 h-10 ${
                      isCompleted
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  />
                )}

                {/* Step icon */}
                <div
                  className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? "bg-green-600 text-white"
                      : isCurrent
                      ? "bg-green-100 text-green-700 ring-4 ring-green-50"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >

                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : isCurrent && isAnalyzing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}

                </div>

                {/* Step content */}
                <div className="flex-1 pb-2">

                  <div className="flex items-center justify-between gap-3">

                    <h3
                      className={`font-bold transition-colors ${
                        isCompleted || isCurrent
                          ? "text-green-900"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </h3>

                    {isCompleted && (
                      <span className="text-xs font-bold text-green-600">
                        Completed
                      </span>
                    )}

                    {isCurrent && isAnalyzing && (
                      <span className="text-xs font-bold text-green-600">
                        Processing
                      </span>
                    )}

                  </div>

                  <p
                    className={`text-sm mt-1 ${
                      isCompleted || isCurrent
                        ? "text-gray-500"
                        : "text-gray-300"
                    }`}
                  >
                    {step.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

        {/* Progress */}
        <div className="mt-8">

          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-gray-500">
              Analysis Progress
            </span>

            <span className="text-green-600">
              {Math.min(
                Math.round(
                  (currentStep / steps.length) * 100
                ),
                100
              )}
              %
            </span>
          </div>

          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">

            <div
              className="h-full bg-green-600 rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(
                  (currentStep / steps.length) * 100,
                  100
                )}%`
              }}
            />

          </div>

        </div>

      </div>
    </div>
  );
}