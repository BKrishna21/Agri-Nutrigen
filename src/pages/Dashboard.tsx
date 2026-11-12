

// import React, { useEffect, useMemo, useState } from "react";

// import Card from "../components/Card";
// import {
//   MapPin,
//   AlertCircle,
//   Wheat,
//   TrendingUp,
//   Users,
//   Droplets,
//   Search,
// } from "lucide-react";

// interface StateData {
//   region: string;
//   capital: string;
//   deficiency: string;
//   crop: string;
//   soil: string;
//   waterNeed: string;
//   impact: string;
// }

// // Illustrative regional planning information.
// // These are not verified state-wide soil or deficiency measurements.
// const stateData: StateData[] = [
//   {
//     region: "Andhra Pradesh",
//     capital: "Amaravati",
//     deficiency: "Iron and Zinc",
//     crop: "Ragi, Pulses, Leafy Vegetables",
//     soil: "Red, Black and Alluvial Soil",
//     waterNeed: "Medium",
//     impact: "High",
//   },
//   {
//     region: "Arunachal Pradesh",
//     capital: "Itanagar",
//     deficiency: "Iron and Vitamin A",
//     crop: "Rice, Maize, Millets",
//     soil: "Mountain and Forest Soil",
//     waterNeed: "High",
//     impact: "Medium",
//   },
//   {
//     region: "Assam",
//     capital: "Dispur",
//     deficiency: "Iron and Zinc",
//     crop: "Rice, Pulses, Sweet Potato",
//     soil: "Alluvial Soil",
//     waterNeed: "High",
//     impact: "High",
//   },
//   {
//     region: "Bihar",
//     capital: "Patna",
//     deficiency: "Iron and Vitamin A",
//     crop: "Wheat, Lentils, Leafy Vegetables",
//     soil: "Alluvial Soil",
//     waterNeed: "Medium",
//     impact: "High",
//   },
//   {
//     region: "Chhattisgarh",
//     capital: "Raipur",
//     deficiency: "Iron and Zinc",
//     crop: "Rice, Ragi, Pulses",
//     soil: "Red and Yellow Soil",
//     waterNeed: "Medium",
//     impact: "High",
//   },
//   {
//     region: "Goa",
//     capital: "Panaji",
//     deficiency: "Iron and Vitamin A",
//     crop: "Rice, Cashew, Vegetables",
//     soil: "Laterite Soil",
//     waterNeed: "High",
//     impact: "Medium",
//   },
//   {
//     region: "Gujarat",
//     capital: "Gandhinagar",
//     deficiency: "Iron and Zinc",
//     crop: "Pearl Millet, Pulses, Groundnut",
//     soil: "Black and Alluvial Soil",
//     waterNeed: "Low",
//     impact: "High",
//   },
//   {
//     region: "Haryana",
//     capital: "Chandigarh",
//     deficiency: "Iron and Vitamin A",
//     crop: "Wheat, Mustard, Pulses",
//     soil: "Alluvial Soil",
//     waterNeed: "Medium",
//     impact: "Medium",
//   },
//   {
//     region: "Himachal Pradesh",
//     capital: "Shimla",
//     deficiency: "Iron and Vitamin A",
//     crop: "Maize, Wheat, Apple",
//     soil: "Mountain and Brown Soil",
//     waterNeed: "Medium",
//     impact: "Medium",
//   },
//   {
//     region: "Jharkhand",
//     capital: "Ranchi",
//     deficiency: "Iron and Zinc",
//     crop: "Ragi, Maize, Pulses",
//     soil: "Red and Laterite Soil",
//     waterNeed: "Medium",
//     impact: "High",
//   },
//   {
//     region: "Karnataka",
//     capital: "Bengaluru",
//     deficiency: "Iron and Calcium",
//     crop: "Ragi, Jowar, Pulses, Spinach",
//     soil: "Red and Black Soil",
//     waterNeed: "Medium",
//     impact: "High",
//   },
//   {
//     region: "Kerala",
//     capital: "Thiruvananthapuram",
//     deficiency: "Iron and Vitamin A",
//     crop: "Rice, Tapioca, Vegetables",
//     soil: "Laterite and Alluvial Soil",
//     waterNeed: "High",
//     impact: "Medium",
//   },
//   {
//     region: "Madhya Pradesh",
//     capital: "Bhopal",
//     deficiency: "Iron and Zinc",
//     crop: "Wheat, Soybean, Pulses",
//     soil: "Black and Red Soil",
//     waterNeed: "Medium",
//     impact: "High",
//   },
//   {
//     region: "Maharashtra",
//     capital: "Mumbai",
//     deficiency: "Iron and Vitamin A",
//     crop: "Jowar, Bajra, Pulses",
//     soil: "Black and Laterite Soil",
//     waterNeed: "Medium",
//     impact: "High",
//   },
//   {
//     region: "Manipur",
//     capital: "Imphal",
//     deficiency: "Iron and Vitamin A",
//     crop: "Rice, Maize, Vegetables",
//     soil: "Alluvial and Mountain Soil",
//     waterNeed: "High",
//     impact: "Medium",
//   },
//   {
//     region: "Meghalaya",
//     capital: "Shillong",
//     deficiency: "Iron and Zinc",
//     crop: "Maize, Rice, Sweet Potato",
//     soil: "Red and Laterite Soil",
//     waterNeed: "High",
//     impact: "Medium",
//   },
//   {
//     region: "Mizoram",
//     capital: "Aizawl",
//     deficiency: "Iron and Vitamin A",
//     crop: "Rice, Maize, Vegetables",
//     soil: "Mountain and Red Soil",
//     waterNeed: "High",
//     impact: "Medium",
//   },
//   {
//     region: "Nagaland",
//     capital: "Kohima",
//     deficiency: "Iron and Zinc",
//     crop: "Rice, Maize, Millets",
//     soil: "Mountain and Forest Soil",
//     waterNeed: "High",
//     impact: "Medium",
//   },
//   {
//     region: "Odisha",
//     capital: "Bhubaneswar",
//     deficiency: "Iron and Vitamin A",
//     crop: "Rice, Ragi, Pulses",
//     soil: "Red and Alluvial Soil",
//     waterNeed: "High",
//     impact: "High",
//   },
//   {
//     region: "Punjab",
//     capital: "Chandigarh",
//     deficiency: "Iron and Zinc",
//     crop: "Wheat, Maize, Pulses",
//     soil: "Alluvial Soil",
//     waterNeed: "High",
//     impact: "Medium",
//   },
//   {
//     region: "Rajasthan",
//     capital: "Jaipur",
//     deficiency: "Iron and Vitamin A",
//     crop: "Bajra, Guar, Pulses",
//     soil: "Desert and Alluvial Soil",
//     waterNeed: "Low",
//     impact: "High",
//   },
//   {
//     region: "Sikkim",
//     capital: "Gangtok",
//     deficiency: "Iron and Vitamin A",
//     crop: "Maize, Buckwheat, Vegetables",
//     soil: "Mountain and Forest Soil",
//     waterNeed: "High",
//     impact: "Medium",
//   },
//   {
//     region: "Tamil Nadu",
//     capital: "Chennai",
//     deficiency: "Iron and Zinc",
//     crop: "Rice, Ragi, Pulses",
//     soil: "Red, Black and Alluvial Soil",
//     waterNeed: "Medium",
//     impact: "High",
//   },
//   {
//     region: "Telangana",
//     capital: "Hyderabad",
//     deficiency: "Iron and Zinc",
//     crop: "Jowar, Ragi, Pulses",
//     soil: "Red and Black Soil",
//     waterNeed: "Medium",
//     impact: "High",
//   },
//   {
//     region: "Tripura",
//     capital: "Agartala",
//     deficiency: "Iron and Vitamin A",
//     crop: "Rice, Maize, Vegetables",
//     soil: "Red and Laterite Soil",
//     waterNeed: "High",
//     impact: "Medium",
//   },
//   {
//     region: "Uttar Pradesh",
//     capital: "Lucknow",
//     deficiency: "Iron and Zinc",
//     crop: "Wheat, Pulses, Mustard",
//     soil: "Alluvial Soil",
//     waterNeed: "Medium",
//     impact: "High",
//   },
//   {
//     region: "Uttarakhand",
//     capital: "Dehradun",
//     deficiency: "Iron and Vitamin A",
//     crop: "Mandua, Maize, Pulses",
//     soil: "Mountain and Alluvial Soil",
//     waterNeed: "Medium",
//     impact: "Medium",
//   },
//   {
//     region: "West Bengal",
//     capital: "Kolkata",
//     deficiency: "Iron and Zinc",
//     crop: "Rice, Pulses, Sweet Potato",
//     soil: "Alluvial and Laterite Soil",
//     waterNeed: "High",
//     impact: "High",
//   },
// ];

// export default function Dashboard() {
//   const [searchTerm, setSearchTerm] = useState("");

//   const [weatherByState, setWeatherByState] = useState<
//   Record<string, any>
// >({});

// const [weatherLoading, setWeatherLoading] = useState(true);

// const [weatherError, setWeatherError] = useState("");



//   const filteredStates = useMemo(() => {
//     return stateData.filter((item) =>
//       item.region.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm]);

//   const totalStates = stateData.length;

//   const highPriorityStates = stateData.filter(
//     (item) => item.impact === "High"
//   ).length;

//   const filteredCount = filteredStates.length;

//   return (
//     <div className="min-h-screen bg-[#fdfdfb] py-12">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <header className="mb-10">
//           <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-700">
//             AgriNutrigen / Regional Intelligence
//           </p>

//           <h1 className="mb-3 text-4xl font-bold text-green-950">
//             Regional Dashboard
//           </h1>

//           <p className="max-w-2xl text-gray-600">
//             Explore regional agricultural conditions, soil characteristics,
//             potential nutrition priorities, and crop planning suggestions
//             across India's 28 states.
//           </p>
//         </header>

//         {/* Stats Grid */}
//         <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">

//           <div className="flex items-center space-x-4 rounded-3xl border border-green-50 bg-white p-6 shadow-sm">
//             <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
//               <MapPin className="h-6 w-6" />
//             </div>

//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 States Covered
//               </p>

//               <p className="text-2xl font-bold text-gray-900">
//                 {totalStates}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4 rounded-3xl border border-green-50 bg-white p-6 shadow-sm">
//             <div className="rounded-2xl bg-orange-50 p-3 text-orange-600">
//               <AlertCircle className="h-6 w-6" />
//             </div>

//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 Illustrative High-Priority Profiles
//               </p>

//               <p className="text-2xl font-bold text-gray-900">
//                 {highPriorityStates}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4 rounded-3xl border border-green-50 bg-white p-6 shadow-sm">
//             <div className="rounded-2xl bg-green-50 p-3 text-green-600">
//               <TrendingUp className="h-6 w-6" />
//             </div>

//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 States Matching Search
//               </p>

//               <p className="text-2xl font-bold text-gray-900">
//                 {filteredCount}
//               </p>
//             </div>
//           </div>

//         </div>

//         {/* Search */}
//         <div className="mb-8">
//           <div className="relative max-w-md">
//             <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search for a state..."
//               className="w-full rounded-xl border border-green-100 bg-white py-3 pl-12 pr-4 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
//             />
//           </div>
//         </div>

//         {/* State Cards */}
//         <div className="mb-6 flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-bold text-green-950">
//               State-wise Regional Profiles
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               Showing {filteredCount} of {totalStates} states
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">

//           {filteredStates.map((item) => (
//             <Card
//               key={item.region}
//               title={item.region}
//               className="group relative overflow-hidden"
//             >
//               <div className="space-y-5">

//                 {/* Capital */}
//                 <div className="flex items-start space-x-3">
//                   <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />

//                   <div>
//                     <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
//                       State Capital
//                     </p>

//                     <p className="font-medium text-gray-700">
//                       {item.capital}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Soil */}
//                 <div className="flex items-start space-x-3">
//                   <Wheat className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />

//                   <div>
//                     <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
//                       Major Soil Types
//                     </p>

//                     <p className="font-medium text-gray-700">
//                       {item.soil}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Nutrition */}
//                 <div className="flex items-start space-x-3">
//                   <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />

//                   <div>
//                     <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
//                       Illustrative Nutrition Focus
//                     </p>

//                     <p className="font-bold text-orange-700">
//                       {item.deficiency}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Crops */}
//                 <div className="flex items-start space-x-3">
//                   <Wheat className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />

//                   <div>
//                     <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
//                       Suggested Crops
//                     </p>

//                     <p className="font-bold text-green-800">
//                       {item.crop}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="flex items-center justify-between border-t border-gray-100 pt-4">

//                   <div className="flex items-center space-x-1">
//                     <Droplets className="h-4 w-4 text-blue-400" />

//                     <span className="text-xs text-gray-500">
//                       Water Need: {item.waterNeed}
//                     </span>
//                   </div>

//                   <span
//                     className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
//                       item.impact === "High"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-orange-100 text-orange-700"
//                     }`}
//                   >
//                     {item.impact} Planning Priority
//                   </span>

//                 </div>

//               </div>

//               <Wheat className="absolute -bottom-4 -right-4 h-24 w-24 text-green-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
//             </Card>
//           ))}

//         </div>

//         {/* No Results */}
//         {filteredStates.length === 0 && (
//           <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
//             <Search className="mx-auto h-10 w-10 text-gray-300" />

//             <h3 className="mt-4 text-lg font-bold text-gray-800">
//               No State Found
//             </h3>

//             <p className="mt-2 text-sm text-gray-500">
//               Try searching with another state name.
//             </p>
//           </div>
//         )}

//         {/* Data Disclaimer */}
//         <div className="mt-10 rounded-2xl border border-amber-100 bg-amber-50 p-5">
//           <p className="text-sm font-semibold text-amber-900">
//             Data Disclaimer
//           </p>

//           <p className="mt-2 text-sm leading-6 text-amber-800">
//             The soil types and crop suggestions are broad illustrative
//             regional planning examples. Nutrition focuses and planning
//             priorities are placeholders, not verified state-wide deficiency
//             statistics. Actual soil conditions and nutritional deficiencies
//             vary by district and population. Replace these examples with
//             validated agricultural and nutrition datasets before using them
//             for real recommendations.
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }





import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";

import {
  MapPin,
  AlertCircle,
  Wheat,
  TrendingUp,
  Users,
  Droplets,
  Search,
  CloudSun,
} from "lucide-react";

// ============================================================
// INTERFACES
// ============================================================

interface StateData {
  region: string;
  capital: string;
  deficiency: string;
  crop: string;
  soil: string;
  waterNeed: string;
  impact: string;
}

interface WeatherData {
  state: string;
  capital: string;
  success: boolean;

  location?: {
    name: string;
    localtime: string;
  };

  current?: {
    temperature: number;
    feelslike: number;
    humidity: number;
    wind_speed: number;
    wind_dir: string;
    precip: number;
    pressure: number;
    visibility: number;
    uv_index: number;
    cloudcover: number;
    weather_descriptions: string[];
    weather_icons: string[];
  };

  error?: string;
}

// ============================================================
// STATE DATA
// Illustrative regional planning information.
// ============================================================

const stateData: StateData[] = [
  {
    region: "Andhra Pradesh",
    capital: "Amaravati",
    deficiency: "Iron and Zinc",
    crop: "Ragi, Pulses, Leafy Vegetables",
    soil: "Red, Black and Alluvial Soil",
    waterNeed: "Medium",
    impact: "High",
  },
  {
    region: "Arunachal Pradesh",
    capital: "Itanagar",
    deficiency: "Iron and Vitamin A",
    crop: "Rice, Maize, Millets",
    soil: "Mountain and Forest Soil",
    waterNeed: "High",
    impact: "Medium",
  },
  {
    region: "Assam",
    capital: "Dispur",
    deficiency: "Iron and Zinc",
    crop: "Rice, Pulses, Sweet Potato",
    soil: "Alluvial Soil",
    waterNeed: "High",
    impact: "High",
  },
  {
    region: "Bihar",
    capital: "Patna",
    deficiency: "Iron and Vitamin A",
    crop: "Wheat, Lentils, Leafy Vegetables",
    soil: "Alluvial Soil",
    waterNeed: "Medium",
    impact: "High",
  },
  {
    region: "Chhattisgarh",
    capital: "Raipur",
    deficiency: "Iron and Zinc",
    crop: "Rice, Ragi, Pulses",
    soil: "Red and Yellow Soil",
    waterNeed: "Medium",
    impact: "High",
  },
  {
    region: "Goa",
    capital: "Panaji",
    deficiency: "Iron and Vitamin A",
    crop: "Rice, Cashew, Vegetables",
    soil: "Laterite Soil",
    waterNeed: "High",
    impact: "Medium",
  },
  {
    region: "Gujarat",
    capital: "Gandhinagar",
    deficiency: "Iron and Zinc",
    crop: "Pearl Millet, Pulses, Groundnut",
    soil: "Black and Alluvial Soil",
    waterNeed: "Low",
    impact: "High",
  },
  {
    region: "Haryana",
    capital: "Chandigarh",
    deficiency: "Iron and Vitamin A",
    crop: "Wheat, Mustard, Pulses",
    soil: "Alluvial Soil",
    waterNeed: "Medium",
    impact: "Medium",
  },
  {
    region: "Himachal Pradesh",
    capital: "Shimla",
    deficiency: "Iron and Vitamin A",
    crop: "Maize, Wheat, Apple",
    soil: "Mountain and Brown Soil",
    waterNeed: "Medium",
    impact: "Medium",
  },
  {
    region: "Jharkhand",
    capital: "Ranchi",
    deficiency: "Iron and Zinc",
    crop: "Ragi, Maize, Pulses",
    soil: "Red and Laterite Soil",
    waterNeed: "Medium",
    impact: "High",
  },
  {
    region: "Karnataka",
    capital: "Bengaluru",
    deficiency: "Iron and Calcium",
    crop: "Ragi, Jowar, Pulses, Spinach",
    soil: "Red and Black Soil",
    waterNeed: "Medium",
    impact: "High",
  },
  {
    region: "Kerala",
    capital: "Thiruvananthapuram",
    deficiency: "Iron and Vitamin A",
    crop: "Rice, Tapioca, Vegetables",
    soil: "Laterite and Alluvial Soil",
    waterNeed: "High",
    impact: "Medium",
  },
  {
    region: "Madhya Pradesh",
    capital: "Bhopal",
    deficiency: "Iron and Zinc",
    crop: "Wheat, Soybean, Pulses",
    soil: "Black and Red Soil",
    waterNeed: "Medium",
    impact: "High",
  },
  {
    region: "Maharashtra",
    capital: "Mumbai",
    deficiency: "Iron and Vitamin A",
    crop: "Jowar, Bajra, Pulses",
    soil: "Black and Laterite Soil",
    waterNeed: "Medium",
    impact: "High",
  },
  {
    region: "Manipur",
    capital: "Imphal",
    deficiency: "Iron and Vitamin A",
    crop: "Rice, Maize, Vegetables",
    soil: "Alluvial and Mountain Soil",
    waterNeed: "High",
    impact: "Medium",
  },
  {
    region: "Meghalaya",
    capital: "Shillong",
    deficiency: "Iron and Zinc",
    crop: "Maize, Rice, Sweet Potato",
    soil: "Red and Laterite Soil",
    waterNeed: "High",
    impact: "Medium",
  },
  {
    region: "Mizoram",
    capital: "Aizawl",
    deficiency: "Iron and Vitamin A",
    crop: "Rice, Maize, Vegetables",
    soil: "Mountain and Red Soil",
    waterNeed: "High",
    impact: "Medium",
  },
  {
    region: "Nagaland",
    capital: "Kohima",
    deficiency: "Iron and Zinc",
    crop: "Rice, Maize, Millets",
    soil: "Mountain and Forest Soil",
    waterNeed: "High",
    impact: "Medium",
  },
  {
    region: "Odisha",
    capital: "Bhubaneswar",
    deficiency: "Iron and Vitamin A",
    crop: "Rice, Ragi, Pulses",
    soil: "Red and Alluvial Soil",
    waterNeed: "High",
    impact: "High",
  },
  {
    region: "Punjab",
    capital: "Chandigarh",
    deficiency: "Iron and Zinc",
    crop: "Wheat, Maize, Pulses",
    soil: "Alluvial Soil",
    waterNeed: "High",
    impact: "Medium",
  },
  {
    region: "Rajasthan",
    capital: "Jaipur",
    deficiency: "Iron and Vitamin A",
    crop: "Bajra, Guar, Pulses",
    soil: "Desert and Alluvial Soil",
    waterNeed: "Low",
    impact: "High",
  },
  {
    region: "Sikkim",
    capital: "Gangtok",
    deficiency: "Iron and Vitamin A",
    crop: "Maize, Buckwheat, Vegetables",
    soil: "Mountain and Forest Soil",
    waterNeed: "High",
    impact: "Medium",
  },
  {
    region: "Tamil Nadu",
    capital: "Chennai",
    deficiency: "Iron and Zinc",
    crop: "Rice, Ragi, Pulses",
    soil: "Red, Black and Alluvial Soil",
    waterNeed: "Medium",
    impact: "High",
  },
  {
    region: "Telangana",
    capital: "Hyderabad",
    deficiency: "Iron and Zinc",
    crop: "Jowar, Ragi, Pulses",
    soil: "Red and Black Soil",
    waterNeed: "Medium",
    impact: "High",
  },
  {
    region: "Tripura",
    capital: "Agartala",
    deficiency: "Iron and Vitamin A",
    crop: "Rice, Maize, Vegetables",
    soil: "Red and Laterite Soil",
    waterNeed: "High",
    impact: "Medium",
  },
  {
    region: "Uttar Pradesh",
    capital: "Lucknow",
    deficiency: "Iron and Zinc",
    crop: "Wheat, Pulses, Mustard",
    soil: "Alluvial Soil",
    waterNeed: "Medium",
    impact: "High",
  },
  {
    region: "Uttarakhand",
    capital: "Dehradun",
    deficiency: "Iron and Vitamin A",
    crop: "Mandua, Maize, Pulses",
    soil: "Mountain and Alluvial Soil",
    waterNeed: "Medium",
    impact: "Medium",
  },
  {
    region: "West Bengal",
    capital: "Kolkata",
    deficiency: "Iron and Zinc",
    crop: "Rice, Pulses, Sweet Potato",
    soil: "Alluvial and Laterite Soil",
    waterNeed: "High",
    impact: "High",
  },
];

// ============================================================
// DASHBOARD COMPONENT
// ============================================================

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  // Weather states
  const [weatherByState, setWeatherByState] = useState<
    Record<string, WeatherData>
  >({});

  const [weatherLoading, setWeatherLoading] = useState(true);

  const [weatherError, setWeatherError] = useState("");

  // ==========================================================
  // FETCH WEATHER FOR ALL STATE CAPITALS
  // ==========================================================

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeatherLoading(true);
        setWeatherError("");

        const API_URL =
          import.meta.env.VITE_API_URL || "http://localhost:5000";

        const response = await fetch(
          `${API_URL}/api/regional/weather`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message || "Weather data unavailable"
          );
        }

        const weatherMap: Record<string, WeatherData> = {};

        result.data.forEach((item: WeatherData) => {
          if (item.success) {
            weatherMap[item.state] = item;
          }
        });

        setWeatherByState(weatherMap);
      } catch (error) {
        console.error("Weather loading error:", error);

        setWeatherError(
          "Unable to load weather information."
        );
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // ==========================================================
  // SEARCH AND STATISTICS
  // ==========================================================

  const filteredStates = useMemo(() => {
    return stateData.filter((item) =>
      item.region.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalStates = stateData.length;

  const highPriorityStates = stateData.filter(
    (item) => item.impact === "High"
  ).length;

  const filteredCount = filteredStates.length;

  const weatherCount = Object.keys(weatherByState).length;

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen bg-[#fdfdfb] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}

        <header className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-700">
            AgriNutrigen / Regional Intelligence
          </p>

          <h1 className="mb-3 text-4xl font-bold text-green-950">
            Regional Dashboard
          </h1>

          <p className="max-w-2xl text-gray-600">
            Explore regional agricultural conditions, soil characteristics,
            potential nutrition priorities, and crop planning suggestions
            across India's 28 states.
          </p>

          {/* WEATHER API STATUS */}

          <div className="mt-4 flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                weatherLoading
                  ? "bg-yellow-400"
                  : weatherError
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            />

            <span className="text-xs font-medium text-gray-500">
              {weatherLoading
                ? "Fetching weather data..."
                : weatherError
                ? "Weather service unavailable"
                : `Weather connected · ${weatherCount}/${totalStates} states`}
            </span>
          </div>
        </header>

        {/* STATS GRID */}

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* STATES COVERED */}

          <div className="flex items-center space-x-4 rounded-3xl border border-green-50 bg-white p-6 shadow-sm">
            <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
              <MapPin className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                States Covered
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {totalStates}
              </p>
            </div>
          </div>

          {/* HIGH PRIORITY */}

          <div className="flex items-center space-x-4 rounded-3xl border border-green-50 bg-white p-6 shadow-sm">
            <div className="rounded-2xl bg-orange-50 p-3 text-orange-600">
              <AlertCircle className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Illustrative High-Priority Profiles
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {highPriorityStates}
              </p>
            </div>
          </div>

          {/* WEATHER DATA AVAILABLE */}

          <div className="flex items-center space-x-4 rounded-3xl border border-green-50 bg-white p-6 shadow-sm">
            <div className="rounded-2xl bg-green-50 p-3 text-green-600">
              <CloudSun className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Capitals with Weather Data
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {weatherCount}/{totalStates}
              </p>
            </div>
          </div>

        </div>

        {/* SEARCH */}

        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a state..."
              className="w-full rounded-xl border border-green-100 bg-white py-3 pl-12 pr-4 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>

        {/* STATE CARD HEADER */}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-green-950">
              State-wise Regional Profiles
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredCount} of {totalStates} states
            </p>
          </div>
        </div>

        {/* STATE CARDS */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">

          {filteredStates.map((item) => {
            const weather = weatherByState[item.region];
            const current = weather?.current;
            const location = weather?.location;

            return (
              <Card
                key={item.region}
                title={item.region}
                className="group relative overflow-hidden"
              >
                <div className="space-y-5">

                  {/* CAPITAL */}

                  <div className="flex items-start space-x-3">
                    <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        State Capital
                      </p>

                      <p className="font-medium text-gray-700">
                        {item.capital}
                      </p>
                    </div>
                  </div>

                  {/* SOIL */}

                  <div className="flex items-start space-x-3">
                    <Wheat className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Major Soil Types
                      </p>

                      <p className="font-medium text-gray-700">
                        {item.soil}
                      </p>
                    </div>
                  </div>

                  {/* NUTRITION */}

                  <div className="flex items-start space-x-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Illustrative Nutrition Focus
                      </p>

                      <p className="font-bold text-orange-700">
                        {item.deficiency}
                      </p>
                    </div>
                  </div>

                  {/* CROPS */}

                  <div className="flex items-start space-x-3">
                    <Wheat className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Suggested Crops
                      </p>

                      <p className="font-bold text-green-800">
                        {item.crop}
                      </p>
                    </div>
                  </div>

                  {/* LIVE WEATHER */}

                  <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">

                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CloudSun className="h-5 w-5 text-blue-600" />

                        <p className="text-sm font-bold text-gray-800">
                          Current Weather
                        </p>
                      </div>

                      <span className="text-xs font-medium text-gray-500">
                        {item.capital}
                      </span>
                    </div>

                    {weatherLoading ? (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />

                        Loading weather...
                      </div>
                    ) : current ? (
                      <>
                        {/* TEMPERATURE AND CONDITION */}

                        <div className="flex items-center gap-3">

                          {current.weather_icons?.[0] && (
                            <img
                              src={current.weather_icons[0]}
                              alt={
                                current.weather_descriptions?.[0] ||
                                "Weather"
                              }
                              className="h-12 w-12 object-contain"
                            />
                          )}

                          <div>
                            <p className="text-3xl font-bold text-gray-900">
                              {current.temperature}°C
                            </p>

                            <p className="text-sm text-gray-600">
                              {current.weather_descriptions?.[0] ||
                                "Condition unavailable"}
                            </p>
                          </div>

                        </div>

                        {/* WEATHER METRICS */}

                        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-blue-100 pt-4">

                          <div>
                            <p className="text-xs text-gray-500">
                              Feels Like
                            </p>

                            <p className="font-semibold text-gray-800">
                              {current.feelslike}°C
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Humidity
                            </p>

                            <p className="font-semibold text-gray-800">
                              {current.humidity}%
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Wind Speed
                            </p>

                            <p className="font-semibold text-gray-800">
                              {current.wind_speed} km/h
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Precipitation
                            </p>

                            <p className="font-semibold text-gray-800">
                              {current.precip} mm
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Pressure
                            </p>

                            <p className="font-semibold text-gray-800">
                              {current.pressure} mb
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              UV Index
                            </p>

                            <p className="font-semibold text-gray-800">
                              {current.uv_index}
                            </p>
                          </div>

                        </div>

                        {/* WEATHER UPDATE TIME */}

                        <div className="mt-4 border-t border-blue-100 pt-3">
                          <p className="text-xs text-gray-400">
                            Capital: {location?.name || item.capital}
                          </p>

                          <p className="text-xs text-gray-400">
                            Local Time: {location?.localtime || "Unavailable"}
                          </p>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500">
                        {weatherError ||
                          "Weather data unavailable for this capital."}
                      </p>
                    )}

                  </div>

                  {/* FOOTER */}

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">

                    <div className="flex items-center space-x-1">
                      <Droplets className="h-4 w-4 text-blue-400" />

                      <span className="text-xs text-gray-500">
                        Water Need: {item.waterNeed}
                      </span>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        item.impact === "High"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.impact} Planning Priority
                    </span>

                  </div>

                </div>

                {/* DECORATIVE ICON */}

                <Wheat className="absolute -bottom-4 -right-4 h-24 w-24 text-green-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              </Card>
            );
          })}

        </div>

        {/* NO SEARCH RESULTS */}

        {filteredStates.length === 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
            <Search className="mx-auto h-10 w-10 text-gray-300" />

            <h3 className="mt-4 text-lg font-bold text-gray-800">
              No State Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try searching with another state name.
            </p>
          </div>
        )}

        {/* DATA DISCLAIMER */}

        <div className="mt-10 rounded-2xl border border-amber-100 bg-amber-50 p-5">
          <p className="text-sm font-semibold text-amber-900">
            Data Disclaimer
          </p>

          <p className="mt-2 text-sm leading-6 text-amber-800">
            The weather information is retrieved from the Weatherstack
            API for each state's capital city. Weather conditions can
            differ across districts within a state.

            Soil types and crop suggestions are broad illustrative
            regional planning examples. Nutrition focuses and planning
            priorities are placeholders, not verified state-wide
            deficiency statistics.
          </p>
        </div>

      </div>
    </div>
  );
}
