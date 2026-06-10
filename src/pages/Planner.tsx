import React, { useState,useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Info, CheckCircle2, RefreshCcw, Save, Check } from 'lucide-react';
import Card from '../components/Card';
import { useAuth } from '../lib/AuthContext';
import axios from 'axios';

import MapSelector from "../components/MapSelector.tsx";
import CoordinateCard from "../components/CoordinateCard.tsx";
import environmentData from "../data/india_district_environment_dataset.json";


export default function Planner() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    region: '',
    soilType: '',
    deficiency: ''
  });
  const [recommendation, setRecommendation] = useState<null | any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [environmentInfo, setEnvironmentInfo] = useState<any>(null);
  const [predictedCrop, setPredictedCrop] = useState("");
  const [coordinates, setCoordinates] = useState({
      lat: null,
      lng: null
    });

const [locationData, setLocationData] = useState({
    district: "",
    state: "",
    country: ""
  });

  const soilTypes = ["Red Soil", "Black Soil", "Alluvial Soil", "Laterite Soil", "Sandy Soil"];
  const deficiencies = ["Iron", "Vitamin A", "Zinc", "Protein", "Iodine"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSavedSuccess(false);
    
    // Simulate API call
    setTimeout(() => {
      const mockRecommendations: Record<string, any> = {
        "Iron": {
          crops: ["Spinach", "Ragi (Finger Millet)", "Lentils"],
          focus: "High Iron & Folic Acid content to combat anemia.",
          tips: "Incorporate organic manure to enhance iron uptake in red soil."
        },
        "Vitamin A": {
          crops: ["Carrots", "Sweet Potatoes", "Pumpkin"],
          focus: "Beta-carotene rich crops for vision health.",
          tips: "Ensure proper irrigation during the initial growth phase."
        },
        "Zinc": {
          crops: ["Biofortified Rice", "Chickpeas", "Cashews"],
          focus: "Zinc-dense varieties for immune system support.",
          tips: "Zinc sulfate application can significantly boost yield in deficient soils."
        },
        "Protein": {
          crops: ["Soybeans", "Peanuts", "Mung Beans"],
          focus: "Plant-based protein sources for muscle growth.",
          tips: "Rotate with cereal crops to maintain nitrogen balance."
        },
        "Iodine": {
          crops: ["Iodized Salt (Processing)", "Seaweed (Coastal)", "Leafy Greens"],
          focus: "Thyroid health and cognitive development.",
          tips: "Focus on soil mineral enrichment programs."
        }
      };

      setRecommendation(mockRecommendations[formData.deficiency] || mockRecommendations["Iron"]);
      setIsSubmitting(false);
    }, 800);
  };

  const handleSavePlan = async () => {

  if (!recommendation) return;

  setIsSaving(true);

  try {
    console.log("user:", user);
    const response = await axios.post(
      "http://localhost:5000/api/savedplans/soildata",
      {
        
        name: user?.displayName,
        email: user?.email,

        region: formData.region,
        soiltype: formData.soilType,
        commondeficiency: formData.deficiency,

        recommendation
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
    console.log(response.data);

  } catch (error) {

    console.log(error);
  }
};

const fetchEnvironmentalData = () => {

  if (
    !locationData.state ||
    !locationData.district
  ) return;



  const matchedRegion = environmentData.find(

    (item: any) =>

      item.state.toLowerCase() ===
      locationData.state.toLowerCase()

      &&

      item.district.toLowerCase() ===
      locationData.district.toLowerCase()
  );



  if (matchedRegion) {

    setEnvironmentInfo(matchedRegion);

    console.log("Matched Region:", matchedRegion);

  } else {

    console.log("No matching region found");
  }
};


const getCropPrediction = async () => {

  if (!environmentInfo) return;

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




    console.log(response.data);




    setPredictedCrop(
      response.data.recommendedCrop
    );



  } catch (error) {

    console.log(error);
  }
};

useEffect(() => {

  if (environmentInfo) {

    getCropPrediction();
  }

}, [environmentInfo]);



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

useEffect(() => {

  if (
    locationData.state &&
    locationData.district
  ) {

    fetchEnvironmentalData();
  }

}, [locationData]);

  const resetForm = () => {
    setRecommendation(null);
    setFormData({ region: '', soilType: '', deficiency: '' });
    setSavedSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#fdfdfb] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-950 mb-4">Crop & Nutrition Planner</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Input your regional details to receive genomic-driven crop recommendations tailored to your community's nutritional needs.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {/* Form Card */}
          <Card title="Planning Parameters" className="shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-green-900 uppercase tracking-wider">Region Name</label>
                  <input
                    type="text"
                    name="region"
                    required
                    placeholder="e.g. Karnataka"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-green-900 uppercase tracking-wider">Soil Type</label>
                  <select
                    name="soilType"
                    required
                    value={formData.soilType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                  >
                    <option value="">Select Soil Type</option>
                    {soilTypes.map(soil => <option key={soil} value={soil}>{soil}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-green-900 uppercase tracking-wider">Common Deficiency</label>
                <select
                  name="deficiency"
                  required
                  value={formData.deficiency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                >
                  <option value="">Select Deficiency</option>
                  {deficiencies.map(def => <option key={def} value={def}>{def}</option>)}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-70"
              >
                {isSubmitting ? (
                  <RefreshCcw className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" /> Generate Recommendations
                  </>
                )}
              </button>
            </form>
          </Card>


          <div className="space-y-6">
            <MapSelector
              setCoordinates={setCoordinates}
            />
            <CoordinateCard
              lat={coordinates.lat}
              lng={coordinates.lng}
            />
          </div>
          <div className="bg-white rounded-3xl shadow-md p-6 border border-green-100">
            <h2 className="text-2xl font-bold text-green-900 mb-4">
              Detected Region
            </h2>
            <div className="space-y-2">
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
          </div>

          {/* Results Section */}
          <AnimatePresence>
            {recommendation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-green-950">Recommendations for {formData.region}</h2>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleSavePlan}
                      disabled={isSaving || savedSuccess}
                      className={`text-sm font-bold px-4 py-2 rounded-xl flex items-center transition-all ${
                        savedSuccess 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-white text-green-600 border border-green-100 hover:bg-green-50'
                      }`}
                    >
                      {isSaving ? (
                        <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                      ) : savedSuccess ? (
                        <Check className="w-4 h-4 mr-2" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      {savedSuccess ? 'Saved' : 'Save Plan'}
                    </button>
                    <button
                      onClick={resetForm}
                      className="text-sm font-bold text-gray-400 hover:text-green-600 flex items-center"
                    >
                      <RefreshCcw className="w-4 h-4 mr-1" /> Reset
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card title="Recommended Crops" className="border-green-200 bg-green-50/30">
                    <ul className="space-y-3">
                      {recommendation.crops.map((crop: string) => (
                        <li key={crop} className="flex items-center text-green-900 font-medium">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                          {crop}
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card title="Nutritional Focus" className="border-blue-100 bg-blue-50/30">
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-blue-600 mt-1" />
                      <p className="text-blue-900 leading-relaxed">
                        {recommendation.focus}
                      </p>
                    </div>
                  </Card>
                </div>

                <Card title="Expert Cultivation Tips" className="bg-amber-50/30 border-amber-100">
                  <p className="text-amber-900 italic">
                    "{recommendation.tips}"
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {environmentInfo && (

            <div className="bg-white rounded-3xl shadow-md p-6 border border-green-100">

              <h2 className="text-2xl font-bold text-green-900 mb-4">

                Soil & Environment Data

              </h2>



              <div className="grid grid-cols-2 gap-4">

                <p>
                  <span className="font-bold">
                    Nitrogen:
                  </span>

                  {" "}

                  {environmentInfo.N}
                </p>



                <p>
                  <span className="font-bold">
                    Phosphorus:
                  </span>

                  {" "}

                  {environmentInfo.P}
                </p>



                <p>
                  <span className="font-bold">
                    Potassium:
                  </span>

                  {" "}

                  {environmentInfo.K}
                </p>



                <p>
                  <span className="font-bold">
                    Temperature:
                  </span>

                  {" "}

                  {environmentInfo.temperature} °C
                </p>



                <p>
                  <span className="font-bold">
                    Humidity:
                  </span>

                  {" "}

                  {environmentInfo.humidity} %
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

                  {environmentInfo.rainfall} mm
                </p>



                <p>
                  <span className="font-bold">
                    Soil Type:
                  </span>

                  {" "}

                  {environmentInfo.soil_type}
                </p>

              </div>

            </div>
          )}


          {predictedCrop && (

              <div className="bg-white rounded-3xl shadow-md p-6 border border-green-100">

                <h2 className="text-2xl font-bold text-green-900 mb-4">

                  ML Crop Recommendation

                </h2>




                <div className="text-center">

                  <p className="text-gray-500 mb-2">

                    Recommended Crop

                  </p>




                  <h1 className="text-5xl font-bold text-green-700">

                    {predictedCrop}

                  </h1>

                </div>

              </div>
            )}


        </div>
      </div>
    </div>
  );
}
