import React, { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

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


  // TOP ML CROPS

  const [topCrops, setTopCrops] =
    useState<any[]>([]);


  // NUTRITION-AWARE CROPS

  const [nutritionCrops, setNutritionCrops] =
    useState<any[]>([]);


  // CURRENT BEST ENVIRONMENTAL CROP

  const [predictedCrop, setPredictedCrop] =
    useState("");


  // UI STATES

  const [loadingPrediction, setLoadingPrediction] =
    useState(false);

  const [loadingNutrition, setLoadingNutrition] =
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

      console.log(
        "Location error:",
        error
      );

    }

  };


  // MATCH ENVIRONMENT DATA

  const fetchEnvironmentalData = () => {

    if (
      !locationData.state ||
      !locationData.district
    ) {

      return;

    }


    console.log(
      "API District:",
      locationData.district
    );


    console.log(
      "Dataset Districts:",
      environmentData
        .filter(

          (item) =>

            item.state.toLowerCase() ===
            locationData.state.toLowerCase()

        )
        .map(

          (item) =>
            item.district

        )

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

      setEnvironmentInfo(null);

      setTopCrops([]);

      setNutritionCrops([]);

      setPredictedCrop("");

      console.log(
        "No matching region found"
      );

    }

  };


  // NUTRITION MATCHING

  // const getNutritionMatching = async (
  //   crops: any[]
  // ) => {

  //   if (
  //     !crops ||
  //     crops.length === 0 ||
  //     !locationData.state
  //   ) {

  //     setNutritionCrops([]);

  //     return;

  //   }


  //   setLoadingNutrition(true);


  //   try {

  //     const response = await axios.post(

  //       "http://localhost:5000/api/ml/nutrition-match",

  //       {

  //         crops,

  //         state:
  //           locationData.state

  //       }

  //     );


  //     console.log(
  //       "Nutrition response:",
  //       response.data
  //     );


  //     const results =
  //       response.data?.data?.results || [];


  //     setNutritionCrops(
  //       results
  //     );


  //   } catch (error) {

  //     console.log(
  //       "Nutrition matching error:",
  //       error
  //     );

  //     setNutritionCrops([]);

  //   } finally {

  //     setLoadingNutrition(false);

  //   }

  // };


  // ML PREDICTION

  // const getCropPrediction = async () => {

  //   if (!environmentInfo) {

  //     return;

  //   }


  //   setLoadingPrediction(true);


  //   try {

  //     const response = await axios.post(
  //       "http://localhost:5000/api/ml/predict-crop",
  //       {
  //         N: environmentInfo.N,
  //         P: environmentInfo.P,
  //         K: environmentInfo.K,
  //         temperature: environmentInfo.temperature,
  //         humidity: environmentInfo.humidity,
  //         ph: environmentInfo.ph,
  //         rainfall: environmentInfo.rainfall,

  //         // REQUIRED FOR PHASE 10
  //         state: locationData.state
  //       }
  //     );


  //     console.log(
  //       "ML Response:",
  //       response.data
  //     );


  //     const crops =
  //       response.data?.top_crops || [];


  //     setTopCrops(
  //       crops
  //     );


  //     // Highest environmental suitability

  //     if (crops.length > 0) {

  //       setPredictedCrop(
  //         crops[0].crop
  //       );

  //     } else {

  //       setPredictedCrop("");

  //     }


  //     // SEND TOP ML CROPS
  //     // TO NUTRITION ENGINE

  //     await getNutritionMatching(
  //       crops
  //     );


  //   } catch (error) {

  //     console.log(
  //       "Crop prediction error:",
  //       error
  //     );

  //     setTopCrops([]);

  //     setNutritionCrops([]);

  //     setPredictedCrop("");

  //   } finally {

  //     setLoadingPrediction(false);

  //   }

  // };


  const getCropPrediction = async () => {

    if (!environmentInfo) {
      return;
    }

    setLoadingPrediction(true);

    try {

      const response = await axios.post(
        "http://localhost:5000/api/ml/predict-crop",
        {
          N: environmentInfo.N,
          P: environmentInfo.P,
          K: environmentInfo.K,
          temperature: environmentInfo.temperature,
          humidity: environmentInfo.humidity,
          ph: environmentInfo.ph,
          rainfall: environmentInfo.rainfall,

          state: locationData.state
        }
      );


      console.log(
        "ML Response:",
        response.data
      );


      // ENVIRONMENTAL TOP CROPS

      const crops =
        response.data?.top_crops || [];

      setTopCrops(
        crops
      );


      // HYBRID FINAL RECOMMENDATIONS

      const finalRecommendations =
        response.data?.final_recommendations || [];

      setNutritionCrops(
        finalRecommendations
      );


      // HIGHEST ENVIRONMENTAL CROP

      if (crops.length > 0) {

        setPredictedCrop(
          crops[0].crop
        );

      } else {

        setPredictedCrop("");

      }


    } catch (error) {

      console.log(
        "Crop prediction error:",
        error
      );

      setTopCrops([]);

      setNutritionCrops([]);

      setPredictedCrop("");

    } finally {

      setLoadingPrediction(false);

    }

  };

  // SAVE PLAN

  const handleSavePlan = async () => {

    if (
      !predictedCrop ||
      !environmentInfo
    ) {

      return;

    }


    setIsSaving(true);


    try {

      const response = await axios.post(

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


      console.log(
        response.data
      );


      setSavedSuccess(
        true
      );


      setTimeout(() => {

        setSavedSuccess(
          false
        );

      }, 3000);


    } catch (error) {

      console.log(
        "Save plan error:",
        error
      );

    } finally {

      setIsSaving(false);

    }

  };


  // FETCH LOCATION WHEN COORDINATES CHANGE

  useEffect(() => {

    if (
      coordinates.lat !== null &&
      coordinates.lng !== null
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

          {environmentInfo && (

            <AnimatePresence>

              <motion.div

                initial={{
                  opacity: 0,
                  y: 20
                }}

                animate={{
                  opacity: 1,
                  y: 0
                }}

              >

                <Card title="Environmentally Suitable Crops">

                  <div className="text-center space-y-6">


                    {loadingPrediction ? (

                      <RefreshCcw

                        className="
                          w-10
                          h-10
                          mx-auto
                          animate-spin
                          text-green-600
                        "

                      />

                    ) : topCrops.length > 0 ? (

                      <>

                        <CheckCircle2

                          className="
                            w-16
                            h-16
                            text-green-600
                            mx-auto
                          "

                        />


                        <h2 className="text-2xl font-bold text-green-950">

                          Top Crop Candidates

                        </h2>


                        <div className="space-y-4 max-w-2xl mx-auto">

                          {topCrops.map(

                            (crop, index) => (

                              <div

                                key={crop.crop}

                                className="
                                  flex
                                  items-center
                                  justify-between
                                  p-4
                                  rounded-xl
                                  bg-green-50
                                  border
                                  border-green-100
                                "

                              >

                                <div className="flex items-center gap-4">

                                  <span className="font-bold text-green-700">

                                    #{index + 1}

                                  </span>


                                  <span className="text-lg font-semibold capitalize">

                                    {crop.crop}

                                  </span>

                                </div>


                                <span className="font-bold text-green-700">

                                  {(
                                    crop.probability * 100
                                  ).toFixed(2)}

                                  %

                                </span>

                              </div>

                            )

                          )}

                        </div>


                        {/* CURRENT BEST ENVIRONMENTAL CROP */}

                        <div className="pt-4">

                          <p className="text-gray-600">

                            Current highest environmental suitability:

                          </p>


                          <h1 className="text-4xl font-bold text-green-700">

                            {predictedCrop}

                          </h1>

                        </div>


                      </>

                    ) : (

                      <p className="text-gray-500">

                        No suitable crops were returned
                        by the ML model.

                      </p>

                    )}

                  </div>

                </Card>

              </motion.div>

            </AnimatePresence>

          )}


          {/* NUTRITION-AWARE CROP ANALYSIS */}

          {environmentInfo && (

            <Card title="Nutrition-Aware Crop Analysis">

              <div className="space-y-6">


                {loadingNutrition ? (

                  <div className="text-center">

                    <RefreshCcw

                      className="
                        w-10
                        h-10
                        mx-auto
                        animate-spin
                        text-green-600
                      "

                    />

                    <p className="mt-3 text-gray-600">

                      Analyzing crop nutrition...

                    </p>

                  </div>

                ) : nutritionCrops.length > 0 ? (

                  <>

                    <p className="text-gray-600 text-center">

                      Crops are ranked using regional
                      nutrient priorities and an average
                      population nutritional reference.

                    </p>


                    <div className="space-y-4 max-w-3xl mx-auto">

                      {nutritionCrops.map(

                        (crop, index) => (

                          <div

                            key={crop.crop}

                            className="
                              p-5
                              rounded-xl
                              bg-green-50
                              border
                              border-green-100
                            "

                          >

                            <div className="
                              flex
                              items-center
                              justify-between
                            ">


                              <div className="flex items-center gap-4">

                                <span className="
                                  font-bold
                                  text-green-700
                                ">

                                  #{index + 1}

                                </span>


                                <div>

                                  <h3 className="
                                    text-xl
                                    font-bold
                                    capitalize
                                    text-green-950
                                  ">

                                    {crop.crop}

                                  </h3>


                                  <p className="
                                    text-sm
                                    text-gray-600
                                  ">

                                    Environmental suitability:

                                    {" "}

                                    {(
                                      crop.agriculturalScore * 100
                                    ).toFixed(2)}

                                    %

                                  </p>

                                </div>

                              </div>


                              <div className="text-right">

                                <p className="
                                  text-sm
                                  text-gray-600
                                ">

                                  Nutrition Score

                                </p>


                                <p className="
                                  text-2xl
                                  font-bold
                                  text-green-700
                                ">

                                  {crop.nutritionScore}

                                </p>

                              </div>

                            </div>


                            {crop.nutrientDetails &&
                              crop.nutrientDetails.length > 0 && (

                              <div className="
                                mt-5
                                pt-4
                                border-t
                                border-green-200
                                space-y-2
                              ">

                                <p className="
                                  font-semibold
                                  text-green-950
                                ">

                                  Nutrient contribution

                                </p>


                                {crop.nutrientDetails.map(

                                  (nutrient: any) => (

                                    <div

                                      key={
                                        nutrient.nutrient
                                      }

                                      className="
                                        flex
                                        justify-between
                                        text-sm
                                        text-gray-700
                                      "

                                    >

                                      <span className="capitalize">

                                        {nutrient.nutrient}

                                      </span>


                                      <span>

                                        {nutrient.adequacy !== undefined
                                          ? `${(
                                              nutrient.adequacy * 100
                                            ).toFixed(1)}%`
                                          : nutrient.cropValue}

                                      </span>

                                    </div>

                                  )

                                )}

                              </div>

                            )}


                            {!crop.nutritionDataAvailable && (

                              <p className="
                                mt-4
                                text-sm
                                text-orange-600
                              ">

                                Nutrition data is not
                                available for this crop.

                              </p>

                            )}

                          </div>

                        )

                      )}

                    </div>

                  </>

                ) : (

                  <p className="
                    text-center
                    text-gray-500
                  ">

                    Nutrition analysis is not
                    available yet.

                  </p>

                )}

              </div>

            </Card>

          )}


          {/* SAVE PLAN */}

          {predictedCrop && environmentInfo && (

            <div className="text-center">

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

                  <RefreshCcw

                    className="
                      w-5
                      h-5
                      mr-2
                      animate-spin
                    "

                  />

                ) : savedSuccess ? (

                  <Check

                    className="
                      w-5
                      h-5
                      mr-2
                    "

                  />

                ) : (

                  <Save

                    className="
                      w-5
                      h-5
                      mr-2
                    "

                  />

                )}


                {savedSuccess
                  ? "Saved"
                  : "Save Plan"}

              </button>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}





// import React, { useEffect, useState } from "react";

// import { AnimatePresence, motion } from "framer-motion";

// import {
//   RefreshCcw,
//   Save,
//   Check,
//   CheckCircle2
// } from "lucide-react";

// import Card from "../components/Card";

// import { useAuth } from "../lib/AuthContext";

// import axios from "axios";

// import MapSelector from "../components/MapSelector";

// import CoordinateCard from "../components/CoordinateCard";

// import environmentData from "../data/india_district_environment_dataset.json";


// export default function Planner() {

//   const { user } = useAuth();


//   // COORDINATES

//   const [coordinates, setCoordinates] = useState({

//     lat: null as number | null,

//     lng: null as number | null

//   });


//   // LOCATION DATA

//   const [locationData, setLocationData] = useState({

//     district: "",

//     state: "",

//     country: ""

//   });


//   // ENVIRONMENTAL DATA

//   const [environmentInfo, setEnvironmentInfo] =
//     useState<any>(null);


//   // TOP ML CROPS

//   const [topCrops, setTopCrops] =
//     useState<any[]>([]);


//   // SELECTED / BEST CROP

//   const [predictedCrop, setPredictedCrop] =
//     useState("");


//   // UI STATES

//   const [loadingPrediction, setLoadingPrediction] =
//     useState(false);

//   const [isSaving, setIsSaving] =
//     useState(false);

//   const [savedSuccess, setSavedSuccess] =
//     useState(false);


//   const [nutritionCrops, setNutritionCrops] =
//     useState<any[]>([]);

//   const [loadingNutrition, setLoadingNutrition] =
//     useState(false);


//   // FETCH LOCATION DETAILS

//   const fetchLocationDetails = async (

//     lat: number,

//     lng: number

//   ) => {

//     try {

//       const response = await axios.post(

//         "http://localhost:5000/api/location/reverse-geocode",

//         {
//           lat,
//           lng
//         }

//       );


//       setLocationData(
//         response.data.data
//       );


//     } catch (error) {

//       console.log(error);

//     }

//   };


//   // MATCH ENVIRONMENT DATA

//   const fetchEnvironmentalData = () => {

//     if (
//       !locationData.state ||
//       !locationData.district
//     ) {
//       return;
//     }


//     console.log(
//       "API District:",
//       locationData.district
//     );


//     console.log(
//       "Dataset Districts:",
//       environmentData
//         .filter(
//           (item) =>
//             item.state.toLowerCase() ===
//             locationData.state.toLowerCase()
//         )
//         .map(
//           (item) => item.district
//         )
//     );


//     const matchedRegion =
//       environmentData.find(

//         (item: any) =>

//           item.state.toLowerCase() ===
//           locationData.state.toLowerCase()

//           &&

//           item.district.toLowerCase() ===
//           locationData.district.toLowerCase()

//       );


//     if (matchedRegion) {

//       setEnvironmentInfo(
//         matchedRegion
//       );

//     } else {

//       setEnvironmentInfo(null);

//       setTopCrops([]);

//       setPredictedCrop("");

//       console.log(
//         "No matching region found"
//       );

//     }

//   };


//   // ML PREDICTION

//   const getCropPrediction = async () => {

//     if (!environmentInfo) {
//       return;
//     }


//     setLoadingPrediction(true);


//     try {

//       const response = await axios.post(

//         "http://localhost:5000/api/ml/predict-crop",

//         {

//           N: environmentInfo.N,

//           P: environmentInfo.P,

//           K: environmentInfo.K,

//           temperature:
//             environmentInfo.temperature,

//           humidity:
//             environmentInfo.humidity,

//           ph:
//             environmentInfo.ph,

//           rainfall:
//             environmentInfo.rainfall

//         }

//       );


//       console.log(
//         "ML Response:",
//         response.data
//       );


//       const crops =
//         response.data.top_crops || [];


//       setTopCrops(crops);


//       // First crop is the highest-ranked crop

//       if (crops.length > 0) {

//         setPredictedCrop(
//           crops[0].crop
//         );

//       } else {

//         setPredictedCrop("");

//       }


//     } catch (error) {

//       console.log(
//         "Crop prediction error:",
//         error
//       );

//       setTopCrops([]);

//       setPredictedCrop("");

//     } finally {

//       setLoadingPrediction(false);

//     }

//   };


//   // SAVE PLAN

//   const handleSavePlan = async () => {

//     if (
//       !predictedCrop ||
//       !environmentInfo
//     ) {
//       return;
//     }


//     setIsSaving(true);


//     try {

//       const response = await axios.post(

//         "http://localhost:5000/api/savedplans/soildata",

//         {

//           name:
//             user?.displayName,

//           email:
//             user?.email,

//           state:
//             locationData.state,

//           district:
//             locationData.district,

//           country:
//             locationData.country,

//           latitude:
//             coordinates.lat,

//           longitude:
//             coordinates.lng,

//           environmentInfo,

//           recommendedCrop:
//             predictedCrop

//         }

//       );


//       console.log(
//         response.data
//       );


//       setSavedSuccess(true);


//       setTimeout(() => {

//         setSavedSuccess(false);

//       }, 3000);


//     } catch (error) {

//       console.log(error);

//     } finally {

//       setIsSaving(false);

//     }

//   };


//   // FETCH LOCATION WHEN COORDINATES CHANGE

//   useEffect(() => {

//     if (
//       coordinates.lat !== null &&
//       coordinates.lng !== null
//     ) {

//       fetchLocationDetails(

//         coordinates.lat,

//         coordinates.lng

//       );

//     }

//   }, [coordinates]);


//   // FETCH ENVIRONMENT DATA

//   useEffect(() => {

//     if (
//       locationData.state &&
//       locationData.district
//     ) {

//       fetchEnvironmentalData();

//     }

//   }, [locationData]);


//   // RUN ML PREDICTION

//   useEffect(() => {

//     if (environmentInfo) {

//       getCropPrediction();

//     }

//   }, [environmentInfo]);



//   const getNutritionMatching = async (
//       crops: any[]
//     ) => {

//       if (
//         !crops ||
//         crops.length === 0 ||
//         !locationData.state
//       ) {
//         return;
//       }


//       setLoadingNutrition(true);


//       try {

//         const response = await axios.post(

//           "http://localhost:5000/api/ml/nutrition-match",

//           {

//             crops,

//             state:
//               locationData.state,

//             ageGroup:
//               "adolescents_10_19"

//           }

//         );


//         console.log(
//           "Nutrition response:",
//           response.data
//         );


//         setNutritionCrops(

//           response.data.data.results || []

//         );


//       } catch (error) {

//         console.log(
//           "Nutrition matching error:",
//           error
//         );

//         setNutritionCrops([]);

//       } finally {

//         setLoadingNutrition(false);

//       }

//     };


//   return (

//     <div className="min-h-screen bg-[#fdfdfb] py-12">

//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">


//         {/* HEADER */}

//         <header className="text-center mb-12">

//           <h1 className="text-4xl font-bold text-green-950 mb-4">

//             GIS Crop Recommendation System

//           </h1>


//           <p className="text-gray-600 max-w-2xl mx-auto">

//             Select a location on the map to
//             generate AI-powered crop
//             recommendations using
//             environmental intelligence and
//             machine learning.

//           </p>

//         </header>


//         <div className="space-y-8">


//           {/* MAP */}

//           <Card title="Select Location">

//             <div className="space-y-6">

//               <MapSelector

//                 setCoordinates={
//                   setCoordinates
//                 }

//               />


//               <CoordinateCard

//                 lat={coordinates.lat}

//                 lng={coordinates.lng}

//               />

//             </div>

//           </Card>


//           {/* LOCATION DATA */}

//           <Card title="Detected Region">

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//               <p>

//                 <span className="font-bold">

//                   District:

//                 </span>

//                 {" "}

//                 {locationData.district}

//               </p>


//               <p>

//                 <span className="font-bold">

//                   State:

//                 </span>

//                 {" "}

//                 {locationData.state}

//               </p>


//               <p>

//                 <span className="font-bold">

//                   Country:

//                 </span>

//                 {" "}

//                 {locationData.country}

//               </p>

//             </div>

//           </Card>


//           {/* ENVIRONMENT DATA */}

//           {environmentInfo && (

//             <Card title="Soil & Environment Data">

//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

//                 <p>

//                   <span className="font-bold">
//                     N:
//                   </span>

//                   {" "}

//                   {environmentInfo.N}

//                 </p>


//                 <p>

//                   <span className="font-bold">
//                     P:
//                   </span>

//                   {" "}

//                   {environmentInfo.P}

//                 </p>


//                 <p>

//                   <span className="font-bold">
//                     K:
//                   </span>

//                   {" "}

//                   {environmentInfo.K}

//                 </p>


//                 <p>

//                   <span className="font-bold">
//                     Temp:
//                   </span>

//                   {" "}

//                   {environmentInfo.temperature}

//                   °C

//                 </p>


//                 <p>

//                   <span className="font-bold">
//                     Humidity:
//                   </span>

//                   {" "}

//                   {environmentInfo.humidity}

//                   %

//                 </p>


//                 <p>

//                   <span className="font-bold">
//                     pH:
//                   </span>

//                   {" "}

//                   {environmentInfo.ph}

//                 </p>


//                 <p>

//                   <span className="font-bold">
//                     Rainfall:
//                   </span>

//                   {" "}

//                   {environmentInfo.rainfall}

//                   mm

//                 </p>


//                 <p>

//                   <span className="font-bold">
//                     Soil:
//                   </span>

//                   {" "}

//                   {environmentInfo.soil_type}

//                 </p>

//               </div>

//             </Card>

//           )}


//           {/* ML RESULT */}

//           {environmentInfo && (

//             <AnimatePresence>

//               <motion.div

//                 initial={{
//                   opacity: 0,
//                   y: 20
//                 }}

//                 animate={{
//                   opacity: 1,
//                   y: 0
//                 }}

//               >

//                 <Card title="Environmentally Suitable Crops">

//                   <div className="text-center space-y-6">


//                     {loadingPrediction ? (

//                       <RefreshCcw

//                         className="
//                           w-10
//                           h-10
//                           mx-auto
//                           animate-spin
//                           text-green-600
//                         "

//                       />

//                     ) : topCrops.length > 0 ? (

//                       <>

//                         <CheckCircle2

//                           className="
//                             w-16
//                             h-16
//                             text-green-600
//                             mx-auto
//                           "

//                         />


//                         <h2 className="text-2xl font-bold text-green-950">

//                           Top Crop Candidates

//                         </h2>


//                         <div className="space-y-4 max-w-2xl mx-auto">


//                           {topCrops.map(

//                             (crop, index) => (

//                               <div

//                                 key={crop.crop}

//                                 className="
//                                   flex
//                                   items-center
//                                   justify-between
//                                   p-4
//                                   rounded-xl
//                                   bg-green-50
//                                   border
//                                   border-green-100
//                                 "

//                               >

//                                 <div className="flex items-center gap-4">

//                                   <span className="font-bold text-green-700">

//                                     #{index + 1}

//                                   </span>


//                                   <span className="text-lg font-semibold capitalize">

//                                     {crop.crop}

//                                   </span>

//                                 </div>


//                                 <span className="font-bold text-green-700">

//                                   {(
//                                     crop.probability * 100
//                                   ).toFixed(2)}

//                                   %

//                                 </span>

//                               </div>

//                             )

//                           )}

//                         </div>


//                         {/* CURRENT BEST CROP */}

//                         <div className="pt-4">

//                           <p className="text-gray-600">

//                             Current highest environmental suitability:

//                           </p>


//                           <h1 className="text-4xl font-bold text-green-700">

//                             {predictedCrop}

//                           </h1>

//                         </div>


//                         <button

//                           onClick={
//                             handleSavePlan
//                           }

//                           disabled={
//                             isSaving ||
//                             savedSuccess
//                           }

//                           className={`px-6 py-3 rounded-2xl font-bold flex items-center mx-auto transition-all ${
//                             savedSuccess
//                               ? "bg-green-100 text-green-700"
//                               : "bg-green-600 text-white hover:bg-green-700"
//                           }`}

//                         >

//                           {isSaving ? (

//                             <RefreshCcw

//                               className="
//                                 w-5
//                                 h-5
//                                 mr-2
//                                 animate-spin
//                               "

//                             />

//                           ) : savedSuccess ? (

//                             <Check

//                               className="
//                                 w-5
//                                 h-5
//                                 mr-2
//                               "

//                             />

//                           ) : (

//                             <Save

//                               className="
//                                 w-5
//                                 h-5
//                                 mr-2
//                               "

//                             />

//                           )}


//                           {savedSuccess
//                             ? "Saved"
//                             : "Save Plan"}

//                         </button>

//                       </>

//                     ) : (

//                       <p className="text-gray-500">

//                         No suitable crops were returned
//                         by the ML model.

//                       </p>

//                     )}

//                   </div>

//                 </Card>

//               </motion.div>

//             </AnimatePresence>

//           )}

//         </div>

//       </div>

//     </div>

//   );

// }