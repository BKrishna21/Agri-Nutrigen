
import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "motion/react";

import {
  RefreshCcw,
  Save,
  Check,
  CheckCircle2
} from "lucide-react";

import Card from "../components/Card";

import { useAuth } from "../lib/AuthContext";

import axios from "axios";

import MapSelector from "../components/MapSelector";

import CoordinateCard from "../components/CoordinateCard";

// import environmentData from "../data/india_large__agri_dataset.json";
import environmentData from "../data/india_district_environment_dataset.json";



export default function Planner() {

  const { user } = useAuth();



  // COORDINATES

  const [coordinates, setCoordinates] = useState({

    lat: null as number | null,

    lng: null as number | null
  });




  // LOCATION DATA

  const [locationData, setLocationData] = useState({

    district: "",

    state: "",

    country: ""
  });




  // ENVIRONMENTAL DATA

  const [environmentInfo, setEnvironmentInfo] =
    useState<any>(null);




  // ML PREDICTION

  const [predictedCrop, setPredictedCrop] =
    useState("");




  // UI STATES

  const [loadingPrediction, setLoadingPrediction] =
    useState(false);

  const [isSaving, setIsSaving] =
    useState(false);

  const [savedSuccess, setSavedSuccess] =
    useState(false);




  // FETCH LOCATION DETAILS

  const fetchLocationDetails = async (

    lat: number,

    lng: number

  ) => {

    try {

      const response = await axios.post(

        "http://localhost:5000/api/location/reverse-geocode",

        {
          lat,
          lng
        }
      );



      setLocationData(
        response.data.data
      );



    } catch (error) {

      console.log(error);
    }
  };




  // MATCH ENVIRONMENT DATA

  const fetchEnvironmentalData = () => {

    if (
      !locationData.state ||
      !locationData.district
    ) return;

    console.log(
        "API District:",
        locationData.district
      );

      console.log(
        "Dataset Districts:",
        environmentData
          .filter(
            item =>
              item.state.toLowerCase() ===
              locationData.state.toLowerCase()
          )
          .map(item => item.district)
      );

    const matchedRegion =
      environmentData.find(

        (item: any) =>

          item.state.toLowerCase() ===
          locationData.state.toLowerCase()

          &&

          item.district.toLowerCase() ===
          locationData.district.toLowerCase()
      );



    if (matchedRegion) {

      setEnvironmentInfo(
        matchedRegion
      );

    } else {

      

      console.log(
        "No matching region found"
      );
    }
  };




  // ML PREDICTION

  const getCropPrediction = async () => {

    if (!environmentInfo) return;



    setLoadingPrediction(true);

    try {

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

          ph:
            environmentInfo.ph,

          rainfall:
            environmentInfo.rainfall
        }
      );



      setPredictedCrop(
        response.data.recommendedCrop
      );



    } catch (error) {

      console.log(error);

    } finally {

      setLoadingPrediction(false);
    }
  };




  // SAVE PLAN

  const handleSavePlan = async () => {

    if (
      !predictedCrop ||
      !environmentInfo
    ) return;



    setIsSaving(true);

    try {

      const response = await await axios.post(

          "http://localhost:5000/api/savedplans/soildata",

          {

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
              predictedCrop
          }
        );


      console.log(response.data);



      setSavedSuccess(true);



      setTimeout(() => {

        setSavedSuccess(false);

      }, 3000);

    } catch (error) {

      console.log(error);

    } finally {

      setIsSaving(false);
    }
  };




  // FETCH LOCATION WHEN COORDINATES CHANGE

  useEffect(() => {

    if (
      coordinates.lat &&
      coordinates.lng
    ) {

      fetchLocationDetails(

        coordinates.lat,

        coordinates.lng
      );
    }

  }, [coordinates]);




  // FETCH ENVIRONMENT DATA

  useEffect(() => {

    if (
      locationData.state &&
      locationData.district
    ) {

      fetchEnvironmentalData();
    }

  }, [locationData]);




  // RUN ML PREDICTION

  useEffect(() => {

    if (environmentInfo) {

      getCropPrediction();
    }

  }, [environmentInfo]);




  return (

    <div className="min-h-screen bg-[#fdfdfb] py-12">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">




        {/* HEADER */}

        <header className="text-center mb-12">

          <h1 className="text-4xl font-bold text-green-950 mb-4">

            GIS Crop Recommendation System

          </h1>



          <p className="text-gray-600 max-w-2xl mx-auto">

            Select a location on the map to
            generate AI-powered crop
            recommendations using
            environmental intelligence and
            machine learning.

          </p>

        </header>





        <div className="space-y-8">




          {/* MAP */}

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

            </div>

          </Card>





          {/* LOCATION DATA */}

          <Card title="Detected Region">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <p>
                <span className="font-bold">
                  District:
                </span>

                {" "}

                {locationData.district}
              </p>



              <p>
                <span className="font-bold">
                  State:
                </span>

                {" "}

                {locationData.state}
              </p>



              <p>
                <span className="font-bold">
                  Country:
                </span>

                {" "}

                {locationData.country}
              </p>

            </div>

          </Card>





          {/* ENVIRONMENT DATA */}

          {environmentInfo && (

            <Card title="Soil & Environment Data">

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <p>
                  <span className="font-bold">
                    N:
                  </span>

                  {" "}

                  {environmentInfo.N}
                </p>



                <p>
                  <span className="font-bold">
                    P:
                  </span>

                  {" "}

                  {environmentInfo.P}
                </p>



                <p>
                  <span className="font-bold">
                    K:
                  </span>

                  {" "}

                  {environmentInfo.K}
                </p>



                <p>
                  <span className="font-bold">
                    Temp:
                  </span>

                  {" "}

                  {environmentInfo.temperature}
                  °C
                </p>



                <p>
                  <span className="font-bold">
                    Humidity:
                  </span>

                  {" "}

                  {environmentInfo.humidity}
                  %
                </p>



                <p>
                  <span className="font-bold">
                    pH:
                  </span>

                  {" "}

                  {environmentInfo.ph}
                </p>



                <p>
                  <span className="font-bold">
                    Rainfall:
                  </span>

                  {" "}

                  {environmentInfo.rainfall}
                  mm
                </p>



                <p>
                  <span className="font-bold">
                    Soil:
                  </span>

                  {" "}

                  {environmentInfo.soil_type}
                </p>

              </div>

            </Card>
          )}






          {/* ML RESULT */}

          <AnimatePresence>

            {predictedCrop && (

              <motion.div

                initial={{
                  opacity: 0,
                  y: 20
                }}

                animate={{
                  opacity: 1,
                  y: 0
                }}

                exit={{
                  opacity: 0,
                  y: -20
                }}
              >

                <Card title="ML Crop Recommendation">

                  <div className="text-center space-y-6">

                    {loadingPrediction ? (

                      <RefreshCcw className="w-10 h-10 mx-auto animate-spin text-green-600" />

                    ) : (

                      <>

                        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />



                        <h1 className="text-5xl font-bold text-green-700">

                          {predictedCrop}

                        </h1>



                        <button

                          onClick={
                            handleSavePlan
                          }

                          disabled={
                            isSaving ||
                            savedSuccess
                          }

                          className={`px-6 py-3 rounded-2xl font-bold flex items-center mx-auto transition-all ${
                            savedSuccess
                              ? "bg-green-100 text-green-700"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                        >

                          {isSaving ? (

                            <RefreshCcw className="w-5 h-5 mr-2 animate-spin" />

                          ) : savedSuccess ? (

                            <Check className="w-5 h-5 mr-2" />

                          ) : (

                            <Save className="w-5 h-5 mr-2" />

                          )}

                          {savedSuccess
                            ? "Saved"
                            : "Save Plan"}

                        </button>

                      </>

                    )}

                  </div>

                </Card>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}