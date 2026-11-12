

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import PlanDetailsModal from "../components/PlanDetailsModal";

import {
  RefreshCcw,
  Save,
  Check,
} from "lucide-react";

import Card from "../components/Card";
import { useAuth } from "../lib/AuthContext";
import { useAnalysis } from "../context/AnalysisContext";
import axios from "axios";

import MapSelector from "../components/MapSelector";
import CoordinateCard from "../components/CoordinateCard";

import environmentData from "../data/india_district_environment_dataset.json";

// Planner UI
import LocationAnalysisCard from "../components/Planner/LocationAnalysisCard";
import AnalysisOptions from "../components/Planner/AnalysisOptions";
import AnalysisDataModal from "../components/Planner/AnalysisDataModal";

// Analysis loading popup
import AnalysisModal from "../components/Planner/AnalysisModal";

export default function Planner() {
  const { user } = useAuth();
  const { analysisData, setAnalysisData } = useAnalysis();

  // ============================================================
  // LOCATION / COORDINATES
  // ============================================================

  const [coordinates, setCoordinates] = useState({
    lat: null as number | null,
    lng: null as number | null,
  });

  const [locationData, setLocationData] = useState({
    district: "",
    state: "",
    country: "",
  });

  // ============================================================
  // ENVIRONMENTAL DATA
  // ============================================================

  const [environmentInfo, setEnvironmentInfo] =
    useState<any>(null);

  // ============================================================
  // ML RESULTS
  // ============================================================

  const [topCrops, setTopCrops] =
    useState<any[]>([]);

  const [nutritionCrops, setNutritionCrops] =
    useState<any[]>([]);

  const [predictedCrop, setPredictedCrop] =
    useState("");

  // ============================================================
  // UI STATES
  // ============================================================

  const [loadingPrediction, setLoadingPrediction] =
    useState(false);

  const [loadingNutrition, setLoadingNutrition] =
    useState(false);

  const [isSaving, setIsSaving] =
    useState(false);

  const [savedSuccess, setSavedSuccess] =
    useState(false);

  const [regionError, setRegionError] =
    useState("");

  const [savedPlan, setSavedPlan] =
    useState<any>(null);

  const [showSavedDetails, setShowSavedDetails] =
    useState(false);

  // ============================================================
  // ANALYSIS DATA POPUP
  // ============================================================

  const [showAnalysisDataModal, setShowAnalysisDataModal] =
    useState(false);

  const [selectedAnalysisSection, setSelectedAnalysisSection] =
    useState("");

  // ============================================================
  // LIVE ANALYSIS STEPPER
  // ============================================================

  const [analysisStep, setAnalysisStep] =
    useState(1);

  // ============================================================
  // ANALYSIS LOADING MODAL
  // ============================================================

  const [showAnalysisModal, setShowAnalysisModal] =
    useState(false);

  // ============================================================
  // LOCATION CARD REF
  // ============================================================

  const locationAnalysisRef =
    useRef<HTMLDivElement | null>(null);

    const isRestoringAnalysis = useRef(false);

  // ============================================================
  // FETCH LOCATION DETAILS
  // ============================================================

  const fetchLocationDetails = async (
    lat: number,
    lng: number
  ) => {
    setRegionError("");

    // Reset previous analysis

    setAnalysisData(null);
    setEnvironmentInfo(null);
    setTopCrops([]);
    setNutritionCrops([]);
    setPredictedCrop("");

    setSavedSuccess(false);
    setSavedPlan(null);

    setShowAnalysisDataModal(false);
    setSelectedAnalysisSection("");

    setAnalysisStep(1);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/location/reverse-geocode",
        {
          lat,
          lng,
        }
      );

      const detectedLocation =
        response.data?.data;

      if (!detectedLocation) {
        throw new Error(
          "Location information not found."
        );
      }

      setLocationData({
        district:
          detectedLocation.district || "",
        state:
          detectedLocation.state || "",
        country:
          detectedLocation.country || "",
      });

      setAnalysisStep(1);
    } catch (error) {
      console.log(
        "Location error:",
        error
      );

      setLocationData({
        district: "",
        state: "",
        country: "",
      });

      setEnvironmentInfo(null);
      setTopCrops([]);
      setNutritionCrops([]);
      setPredictedCrop("");

      setRegionError(
        "Unable to identify this location. Please select another location."
      );
    }
  };

  // ============================================================
  // MATCH ENVIRONMENT DATA
  // ============================================================

  const fetchEnvironmentalData = () => {
    if (
      !locationData.state ||
      !locationData.district
    ) {
      return;
    }

    console.log(
      "Searching environment data for:",
      locationData.state,
      locationData.district
    );

    const matchedRegion =
      environmentData.find(
        (item: any) =>
          item.state?.toLowerCase() ===
            locationData.state.toLowerCase() &&
          item.district?.toLowerCase() ===
            locationData.district.toLowerCase()
      );

    if (matchedRegion) {
      setEnvironmentInfo(
        matchedRegion
      );

      setRegionError("");

      // Environmental data is ready.
      // ML does NOT start automatically.
      setAnalysisStep(2);
    } else {
      setEnvironmentInfo(null);
      setTopCrops([]);
      setNutritionCrops([]);
      setPredictedCrop("");

      setAnalysisStep(1);

      setRegionError(
        "No matching environmental data found for the selected location."
      );

      console.log(
        "No matching environmental data found."
      );
    }
  };

  // ============================================================
  // RUN ML CROP PREDICTION
  // ============================================================

  const getCropPrediction = async () => {
    if (!environmentInfo) {
      return;
    }

    setLoadingPrediction(true);
    setSavedSuccess(false);
    setSavedPlan(null);

    // Open live analysis popup
    setShowAnalysisModal(true);

    try {
      // --------------------------------------------------------
      // STEP 1
      // --------------------------------------------------------

      setAnalysisStep(1);

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      // --------------------------------------------------------
      // STEP 2
      // --------------------------------------------------------

      setAnalysisStep(2);

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      // --------------------------------------------------------
      // STEP 3
      // --------------------------------------------------------

      setAnalysisStep(3);

      const response = await axios.post(
        "http://localhost:5000/api/ml/predict-crop",
        {
          N: environmentInfo.N,
          P: environmentInfo.P,
          K: environmentInfo.K,

          temperature:
            environmentInfo.temperature,

          humidity:
            environmentInfo.humidity,

          ph: environmentInfo.ph,

          rainfall:
            environmentInfo.rainfall,

          state:
            locationData.state,
        }
      );

      console.log(
        "ML Response:",
        response.data
      );

      // --------------------------------------------------------
      // ENVIRONMENTAL TOP CROPS
      // --------------------------------------------------------

      const crops =
        response.data?.top_crops || [];

      setTopCrops(crops);

      // --------------------------------------------------------
      // HYBRID / NUTRITION-AWARE RESULTS
      // --------------------------------------------------------

      const finalRecommendations =
        response.data?.final_recommendations ||
        [];

      setNutritionCrops(
        finalRecommendations
      );

      // --------------------------------------------------------
      // HIGHEST ENVIRONMENTAL CROP
      // --------------------------------------------------------

      if (crops.length > 0) {
        setPredictedCrop(
          crops[0].crop
        );
      } else {
        setPredictedCrop("");
      }

      // --------------------------------------------------------
      // STORE COMPLETED ANALYSIS
      // --------------------------------------------------------

      setAnalysisData({
        location: {
          district:
            locationData.district,

          state:
            locationData.state,

          country:
            locationData.country,
        },

        coordinates: {
          lat: coordinates.lat,
          lng: coordinates.lng,
        },

        environment:
          environmentInfo,

        predictedCrop:
          crops.length > 0
            ? crops[0].crop
            : null,

        topCrops:
          crops,

        finalRecommendations:
          finalRecommendations,

        createdAt:
          new Date().toISOString(),
      });

      // --------------------------------------------------------
      // STEP 4
      // --------------------------------------------------------

      setAnalysisStep(4);

      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      // Close loading popup
      setShowAnalysisModal(false);
    } catch (error) {
      console.log(
        "Crop prediction error:",
        error
      );

      setTopCrops([]);
      setNutritionCrops([]);
      setPredictedCrop("");

      setShowAnalysisModal(false);
    } finally {
      setLoadingPrediction(false);
    }
  };

  // ============================================================
  // SAVE PLAN
  // ============================================================

  const handleSavePlan = async () => {
    if (
      !predictedCrop ||
      !environmentInfo
    ) {
      return;
    }

    setIsSaving(true);

    try {
      const planData = {
        name:
          user?.displayName,

        email:
          user?.email,

        state:
          locationData.state,

        district:
          locationData.district,

        country:
          locationData.country,

        latitude:
          coordinates.lat,

        longitude:
          coordinates.lng,

        environmentInfo,

        recommendedCrop:
          predictedCrop,
      };

      const response =
        await axios.post(
          "http://localhost:5000/api/savedplans/soildata",
          planData
        );

      console.log(
        response.data
      );

      setSavedPlan({
        ...planData,
        createdAt:
          new Date(),
      });

      setSavedSuccess(true);
    } catch (error) {
      console.log(
        "Save plan error:",
        error
      );
    } finally {
      setIsSaving(false);
    }
  };

  // ============================================================
  // FETCH LOCATION WHEN COORDINATES CHANGE
  // ============================================================

  // useEffect(() => {
  //   if (
  //     coordinates.lat !== null &&
  //     coordinates.lng !== null
  //   ) {
  //     fetchLocationDetails(
  //       coordinates.lat,
  //       coordinates.lng
  //     );
  //   }
  // }, [coordinates]);



  useEffect(() => {

      if (
        coordinates.lat === null ||
        coordinates.lng === null
      ) {
        return;
      }

      // ============================================================
      // DO NOT FETCH LOCATION AGAIN WHEN RESTORING OLD ANALYSIS
      // ============================================================

      if (isRestoringAnalysis.current) {
        isRestoringAnalysis.current = false;
        return;
      }

      fetchLocationDetails(
        coordinates.lat,
        coordinates.lng
      );

    }, [coordinates]);



  // ============================================================
  // MATCH ENVIRONMENT WHEN LOCATION CHANGES
  // ============================================================

  useEffect(() => {
    if (
      locationData.state &&
      locationData.district
    ) {
      fetchEnvironmentalData();
    }
  }, [locationData]);

  // ============================================================
  // AUTOMATICALLY SCROLL TO LOCATION ANALYSIS
  // ============================================================

  useEffect(() => {
    if (
      locationData.district &&
      locationData.state
    ) {
      const timer =
        setTimeout(() => {
          locationAnalysisRef.current?.scrollIntoView(
            {
              behavior: "smooth",
              block: "center",
            }
          );
        }, 250);

      return () =>
        clearTimeout(timer);
    }
  }, [
    locationData.district,
    locationData.state,
  ]);



  // ============================================================
  // RESTORE PREVIOUS ANALYSIS
  // ============================================================

  useEffect(() => {

    if (!analysisData) {
      return;
    }

    // ============================================================
    // IMPORTANT
    // Tell the coordinates effect that these coordinates are
    // being restored from existing analysis data.
    // ============================================================

    isRestoringAnalysis.current = true;

    // ============================================================
    // RESTORE LOCATION
    // ============================================================

    setLocationData({
      district:
        analysisData.location?.district || "",

      state:
        analysisData.location?.state || "",

      country:
        analysisData.location?.country || ""
    });

    // ============================================================
    // RESTORE COORDINATES
    // ============================================================

    setCoordinates({
      lat:
        analysisData.coordinates?.lat ?? null,

      lng:
        analysisData.coordinates?.lng ?? null
    });

    // ============================================================
    // RESTORE ENVIRONMENT
    // ============================================================

    setEnvironmentInfo(
      analysisData.environment || null
    );

    // ============================================================
    // RESTORE TOP CROPS
    // ============================================================

    setTopCrops(
      analysisData.topCrops || []
    );

    // ============================================================
    // RESTORE NUTRITION / FINAL RECOMMENDATIONS
    // ============================================================

    setNutritionCrops(
      analysisData.finalRecommendations || []
    );

    // ============================================================
    // RESTORE RECOMMENDED CROP
    // ============================================================

    setPredictedCrop(
      analysisData.predictedCrop || ""
    );

    // ============================================================
    // MARK ANALYSIS AS COMPLETED
    // ============================================================

    if (
      analysisData.predictedCrop &&
      analysisData.topCrops?.length > 0
    ) {
      setAnalysisStep(4);
    }

  }, [analysisData]);

    const handleChangeLocation = () => {

    // Clear the global analysis
    setAnalysisData(null);

    // Clear local Planner state
    setCoordinates({
      lat: null,
      lng: null
    });

    setLocationData({
      district: "",
      state: "",
      country: ""
    });

    setEnvironmentInfo(null);

    setTopCrops([]);

    setNutritionCrops([]);

    setPredictedCrop("");

    setRegionError("");

    setSavedSuccess(false);

    setSavedPlan(null);

    setShowAnalysisModal(false);

    setAnalysisStep(1);

    setShowAnalysisDataModal(false);

    setSelectedAnalysisSection("");
  };



  // ============================================================
  // OPEN ANALYSIS DATA
  // ============================================================

  const handleAnalysisSection = (
    section: string
  ) => {
    setSelectedAnalysisSection(
      section
    );

    setShowAnalysisDataModal(true);
  };

  // ============================================================
  // CLOSE ANALYSIS DATA POPUP
  // ============================================================

  const closeAnalysisDataModal = () => {
    setShowAnalysisDataModal(false);

    setSelectedAnalysisSection("");
  };

  // ============================================================
  // DERIVED VALUES
  // ============================================================

  const hasCoordinates =
    coordinates.lat !== null &&
    coordinates.lng !== null;

  const isRegionMatched =
    !!environmentInfo;

  /*
   * Current ML probability is used as the
   * agricultural suitability percentage.
   */
  const agriculturalScore =
    topCrops.length > 0
      ? Number(
          topCrops[0]?.probability || 0
        ) * 100
      : 0;

  const recommendedCropScore =
    agriculturalScore;

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="min-h-screen bg-[#fdfdfb] py-12">

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <header className="mb-12 text-center">

          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-green-600">
            AgriNutrigen
          </p>

          <h1 className="mb-4 text-4xl font-bold text-green-950 sm:text-5xl">
            Agricultural Decision Support
          </h1>

          <p className="mx-auto max-w-2xl leading-relaxed text-gray-600">
            Select a location to analyze environmental
            conditions and identify suitable crops for
            your region.
          </p>

        </header>

        <div className="space-y-8">

          {/* ==================================================
              MAP
          ================================================== */}

          <Card title="Select Location">

            <div className="space-y-6">

              <MapSelector
                setCoordinates={
                  setCoordinates
                }
              />

              <CoordinateCard
                lat={coordinates.lat}
                lng={coordinates.lng}
              />

              {/* LOCATION ERROR */}

              {regionError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                  <p className="text-sm font-semibold text-red-700">
                    {regionError}
                  </p>

                </div>
              )}

            </div>

          </Card>

          {/* ==================================================
              LOCATION ANALYSIS CARD
          ================================================== */}

          {hasCoordinates &&
            locationData.district &&
            locationData.state && (

              <div
                ref={
                  locationAnalysisRef
                }
              >

                <LocationAnalysisCard
                  locationData={
                    locationData
                  }

                  coordinates={{
                    lat:
                      coordinates.lat as number,

                    lng:
                      coordinates.lng as number,
                  }}

                  isMatched={
                    isRegionMatched
                  }

                  isAnalyzing={
                    loadingPrediction
                  }

                  onAnalyze={
                    getCropPrediction
                  }

                  onChangeLocation={
                    handleChangeLocation
                  }
                />

              </div>
            )}

          {/* ==================================================
              ANALYSIS RESULTS OPTIONS
              
              IMPORTANT:
              No detailed result components are rendered here.
              User chooses what they want to see.
          ================================================== */}

          {!loadingPrediction &&
            environmentInfo &&
            predictedCrop &&
            topCrops.length > 0 && (

              <AnalysisOptions
                onSelect={
                  handleAnalysisSection
                }
              />
            )}

          {/* ==================================================
              SAVE PLAN
          ================================================== */}

          {predictedCrop &&
            environmentInfo &&
            !loadingPrediction && (

              <div className="pb-8 text-center">

                <button
                  onClick={
                    handleSavePlan
                  }

                  disabled={
                    isSaving ||
                    savedSuccess
                  }

                  className={`mx-auto flex items-center rounded-2xl px-6 py-3 font-bold transition-all ${
                    savedSuccess
                      ? "bg-green-100 text-green-700"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >

                  {isSaving ? (
                    <RefreshCcw
                      className="mr-2 h-5 w-5 animate-spin"
                    />
                  ) : savedSuccess ? (
                    <Check
                      className="mr-2 h-5 w-5"
                    />
                  ) : (
                    <Save
                      className="mr-2 h-5 w-5"
                    />
                  )}

                  {savedSuccess
                    ? "Saved"
                    : "Save Plan"}

                </button>

                {/* VIEW SAVED DETAILS */}

                {savedSuccess &&
                  savedPlan && (

                    <button
                      onClick={() =>
                        setShowSavedDetails(
                          true
                        )
                      }

                      className="mx-auto mt-4 rounded-2xl border border-green-600 bg-white px-6 py-3 font-bold text-green-700 transition-all hover:bg-green-50"
                    >
                      View Details
                    </button>

                  )}

              </div>
            )}

        </div>

      </div>

      {/* ======================================================
          LIVE ANALYSIS LOADING POPUP
      ====================================================== */}

      <AnalysisModal
        isOpen={
          showAnalysisModal
        }

        currentStep={
          analysisStep
        }

        isAnalyzing={
          loadingPrediction
        }

        onClose={() =>
          setShowAnalysisModal(false)
        }
      />

      {/* ======================================================
          ANALYSIS DATA POPUP
      ====================================================== */}

      {showAnalysisDataModal && (

        <AnalysisDataModal
          section={
            selectedAnalysisSection
          }

          onClose={
            closeAnalysisDataModal
          }

          locationData={
            locationData
          }

          coordinates={
            coordinates
          }

          environmentInfo={
            environmentInfo
          }

          predictedCrop={
            predictedCrop
          }

          topCrops={
            topCrops
          }

          nutritionCrops={
            nutritionCrops
          }

          agriculturalScore={
            agriculturalScore
          }

          recommendedCropScore={
            recommendedCropScore
          }
        />

      )}

      {/* ======================================================
          SAVED PLAN DETAILS POPUP
      ====================================================== */}

      {showSavedDetails &&
        savedPlan && (

          <PlanDetailsModal
            plan={
              savedPlan
            }

            onClose={() =>
              setShowSavedDetails(
                false
              )
            }
          />

        )}


    </div>
  );
}