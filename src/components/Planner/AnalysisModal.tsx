import React from "react";
import {
  MapPin,
  Database,
  Sprout,
  BarChart3,
  Check,
  Loader2,
  X,
  Sparkles
} from "lucide-react";

interface AnalysisModalProps {
  isOpen: boolean;
  currentStep: number;
  isAnalyzing: boolean;
  onClose: () => void;
}

const steps = [
  {
    id: 1,
    title: "Location Identified",
    description:
      "Identifying and validating the selected region.",
    icon: MapPin
  },
  {
    id: 2,
    title: "Environmental Data",
    description:
      "Loading soil and regional environmental conditions.",
    icon: Database
  },
  {
    id: 3,
    title: "Crop Suitability",
    description:
      "Evaluating crop suitability using environmental data.",
    icon: Sprout
  },
  {
    id: 4,
    title: "Generating Recommendation",
    description:
      "Preparing the best crop recommendation for your region.",
    icon: BarChart3
  }
];

export default function AnalysisModal({
  isOpen,
  currentStep,
  isAnalyzing,
  onClose
}: AnalysisModalProps) {

  if (!isOpen) {
    return null;
  }

  const completedSteps = Math.max(
    0,
    Math.min(currentStep - 1, steps.length)
  );

  const progress =
    currentStep >= steps.length
      ? 100
      : Math.round(
          ((currentStep - 1) /
            (steps.length - 1)) *
            100
        );

  const isComplete =
    currentStep >= steps.length &&
    !isAnalyzing;

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        p-4
        bg-black/50
        backdrop-blur-sm
      "
    >

      {/* ======================================================
          MODAL
      ====================================================== */}

      <div
        className="
          relative
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          rounded-[2rem]
          bg-white
          shadow-2xl
          border
          border-green-100
        "
      >

        {/* ====================================================
            TOP DECORATION
        ==================================================== */}

        <div
          className="
            absolute
            top-0
            left-0
            right-0
            h-1.5
            bg-gradient-to-r
            from-green-500
            via-emerald-500
            to-green-600
          "
        />

        {/* ====================================================
            CLOSE BUTTON
        ==================================================== */}

        {!isAnalyzing && (
          <button
            type="button"
            onClick={onClose}
            className="
              absolute
              top-5
              right-5
              z-20
              w-9
              h-9
              rounded-full
              bg-gray-100
              hover:bg-gray-200
              flex
              items-center
              justify-center
              text-gray-500
              hover:text-gray-700
              transition-all
            "
            aria-label="Close analysis"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="px-6 sm:px-8 pt-8 pb-6">

          <div className="flex items-center gap-4">

            {/* Animated Icon */}

            <div
              className={`
                relative
                w-14
                h-14
                rounded-2xl
                flex
                items-center
                justify-center
                ${
                  isComplete
                    ? "bg-green-100"
                    : "bg-green-50"
                }
              `}
            >

              {isComplete ? (

                <Check
                  className="
                    w-7
                    h-7
                    text-green-600
                  "
                />

              ) : (

                <>
                  <div
                    className="
                      absolute
                      inset-0
                      rounded-2xl
                      bg-green-200
                      animate-ping
                      opacity-30
                    "
                  />

                  <Sparkles
                    className="
                      relative
                      w-7
                      h-7
                      text-green-600
                    "
                  />
                </>

              )}

            </div>


            <div>

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-widest
                  text-green-600
                "
              >
                AgriNutrigen Analysis
              </p>

              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  font-bold
                  text-green-950
                  mt-1
                "
              >
                {isComplete
                  ? "Analysis Complete"
                  : "Analyzing Your Region"}
              </h2>

            </div>

          </div>


          <p
            className="
              text-sm
              text-gray-500
              mt-4
              leading-relaxed
            "
          >
            {isComplete
              ? "Your environmental and crop suitability analysis has been completed successfully."
              : "Our analysis pipeline is processing your regional data step by step."}
          </p>

        </div>


        {/* ====================================================
            PROGRESS BAR
        ==================================================== */}

        <div className="px-6 sm:px-8">

          <div className="
            flex
            items-center
            justify-between
            mb-2
          ">

            <span
              className="
                text-xs
                font-semibold
                text-gray-500
              "
            >
              Analysis Progress
            </span>

            <span
              className="
                text-xs
                font-bold
                text-green-600
              "
            >
              {isComplete
                ? "100%"
                : `${Math.max(
                    5,
                    progress
                  )}%`}
            </span>

          </div>


          <div
            className="
              w-full
              h-2
              rounded-full
              bg-gray-100
              overflow-hidden
            "
          >

            <div
              className="
                h-full
                rounded-full
                bg-gradient-to-rfrom-green-500 to-emerald-500
                transition-all
                duration-700
                ease-out
              "
              style={{
                width: `${
                  isComplete
                    ? 100
                    : Math.max(
                        5,
                        progress
                      )
                }%`
              }}
            />

          </div>

        </div>


        {/* ====================================================
            LIVE STEP TRACKER
        ==================================================== */}

        <div className="px-6 sm:px-8 py-8">

          <div className="space-y-0">

            {steps.map(
              (step, index) => {

                const isCompleted =
                  step.id <=
                  completedSteps;

                const isCurrent =
                  step.id ===
                  currentStep &&
                  isAnalyzing;

                const isUpcoming =
                  step.id >
                  currentStep;

                const Icon =
                  step.icon;


                return (
                  <div
                    key={step.id}
                    className="
                      relative
                      flex
                      items-start
                      gap-4
                    "
                  >

                    {/* ==================================================
                        CONNECTOR
                    ================================================== */}

                    {index <
                      steps.length - 1 && (

                      <div
                        className="
                          absoluteleft-[21px]top-[44px]
                          w-0.5h-[68px]
                          bg-gray-200
                          overflow-hidden
                        "
                      >

                        <div
                          className="
                            w-full
                            bg-green-500
                            transition-all
                            duration-700
                            ease-out
                          "
                          style={{
                            height:
                              step.id <
                              currentStep
                                ? "100%"
                                : "0%"
                          }}
                        />

                      </div>

                    )}


                    {/* ==================================================
                        STEP ICON
                    ================================================== */}

                    <div
                      className={`
                        relative
                        z-10
                        flex
                       -shrink-0
                        items-center
                        justify-center
                        w-11
                        h-11
                        rounded-full
                        border-2
                        transition-all
                        duration-500

                        ${
                          isCompleted
                            ? `
                              bg-green-600
                              border-green-600
                              text-white
                              shadow-md
                            `
                            : isCurrent
                            ? `
                              bg-green-50
                              border-green-500
                              text-green-600
                              ring-4
                              ring-green-100
                            `
                            : `
                              bg-gray-50
                              border-gray-200
                              text-gray-400
                            `
                        }
                      `}
                    >

                      {isCompleted ? (

                        <Check
                          className="
                            w-5
                            h-5
                          "
                        />

                      ) : isCurrent ? (

                        <Loader2
                          className="
                            w-5
                            h-5
                            animate-spin
                          "
                        />

                      ) : (

                        <Icon
                          className="
                            w-5
                            h-5
                          "
                        />

                      )}

                    </div>


                    {/* ==================================================
                        STEP CONTENT
                    ================================================== */}

                    <div
                      className="
                        flex-1min-h-[88px]
                        pb-5
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >

                        <h3
                          className={`
                            font-bold
                            transition-colors
                            duration-300

                            ${
                              isCompleted
                                ? "text-green-800"
                                : isCurrent
                                ? "text-green-900"
                                : "text-gray-400"
                            }
                          `}
                        >
                          {step.title}
                        </h3>


                        {/* STATUS */}

                        {isCompleted && (

                          <span
                            className="
                              flex
                              items-center
                              gap-1
                              px-2.5
                              py-1
                              rounded-full
                              bg-green-50
                              text-green-700
                              text-[11px]
                              font-bold
                            "
                          >
                            <Check
                              className="
                                w-3
                                h-3
                              "
                            />

                            Completed
                          </span>

                        )}


                        {isCurrent && (

                          <span
                            className="
                              flex
                              items-center
                              gap-1.5
                              px-2.5
                              py-1
                              rounded-full
                              bg-green-50
                              text-green-600
                              text-[11px]
                              font-bold
                            "
                          >

                            <span
                              className="
                                w-1.5
                                h-1.5
                                rounded-full
                                bg-green-500
                                animate-pulse
                              "
                            />

                            Processing

                          </span>

                        )}

                      </div>


                      <p
                        className={`
                          text-sm
                          mt-1
                          transition-colors
                          duration-300

                          ${
                            isCompleted ||
                            isCurrent
                              ? "text-gray-500"
                              : "text-gray-300"
                          }
                        `}
                      >
                        {step.description}
                      </p>


                      {/* LIVE OPERATION MESSAGE */}

                      {isCurrent && (

                        <div
                          className="
                            mt-3
                            flex
                            items-center
                            gap-2
                            text-xs
                            font-medium
                            text-green-600
                          "
                        >

                          <span
                            className="
                              inline-block
                              w-2
                              h-2
                              rounded-full
                              bg-green-500
                              animate-pulse
                            "
                          />

                          Processing regional data...

                        </div>

                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>


        {/* ====================================================
            BOTTOM STATUS
        ==================================================== */}

        <div
          className={`
            mx-6
            sm:mx-8
            mb-8
            rounded-2xl
            p-4
            border

            ${
              isComplete
                ? `
                  bg-green-50
                  border-green-100
                `
                : `
                  bg-gray-50
                  border-gray-100
                `
            }
          `}
        >

          <div className="flex items-center gap-3">

            <div
              className={`
                w-9
                h-9
                rounded-xl
                flex
                items-center
                justify-center

                ${
                  isComplete
                    ? "bg-green-100"
                    : "bg-white"
                }
              `}
            >

              {isComplete ? (

                <Check
                  className="
                    w-5
                    h-5
                    text-green-600
                  "
                />

              ) : (

                <Loader2
                  className="
                    w-5
                    h-5
                    text-green-600
                    animate-spin
                  "
                />

              )}

            </div>


            <div>

              <p
                className={`
                  text-sm
                  font-bold

                  ${
                    isComplete
                      ? "text-green-800"
                      : "text-gray-700"
                  }
                `}
              >
                {isComplete
                  ? "All analysis operations completed"
                  : "Analysis pipeline is running"}
              </p>


              <p
                className="
                  text-xs
                  text-gray-500
                  mt-0.5
                "
              >
                {isComplete
                  ? "Your crop recommendations are ready to view."
                  : "Please wait while we complete the regional analysis."}
              </p>

            </div>

          </div>

        </div>


        {/* ====================================================
            COMPLETION BUTTON
        ==================================================== */}

        {isComplete && (

          <div className="
            px-6
            sm:px-8
            pb-8
          ">

            <button
              type="button"
              onClick={onClose}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                px-6
                py-3.5
                rounded-2xl
                bg-green-600
                text-white
                font-bold
                hover:bg-green-700
                hover:shadow-lg
                transition-all
              "
            >

              <Check
                className="
                  w-5
                  h-5
                "
              />

              View Analysis Results

            </button>

          </div>

        )}

      </div>

    </div>
  );
}