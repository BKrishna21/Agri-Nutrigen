
// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../lib/AuthContext';
// import Card from '../components/Card';
// import {
//   Calendar,
//   MapPin,
//   Wheat,
//   Trash2,
//   RefreshCcw,
//   LayoutGrid
// } from 'lucide-react';

// import { motion, AnimatePresence } from 'motion/react';

// import axios from 'axios';

// import { useNavigate } from 'react-router-dom';

// export default function MyPlans() {

//   const { user } = useAuth();

//   const navigate = useNavigate();

//   const [plans, setPlans] = useState<any[]>([]);

//   const [loading, setLoading] = useState(true);



//   // FETCH USER PLANS

//   const fetchPlans = async () => {

//     // Prevent API call before user loads

//     if (!user) return;

//     setLoading(true);

//     try {

//       const response = await axios.get(
//         `http://localhost:5000/api/savedplans/allsoildata/${user.email}`
//       );

//       console.log(response.data);

//       // IMPORTANT FIX

//       setPlans(response.data.data);

//     } catch (error) {

//       console.log(error);

//     } finally {

//       setLoading(false);
//     }
//   };



//   useEffect(() => {

//     fetchPlans();

//   }, [user]);



//   // DELETE PLAN

//   const handleDelete = async (planId: string) => {

//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this plan?"
//     );

//     if (!confirmDelete) return;

//     try {

//       await axios.delete(
//         `http://localhost:5000/api/savedplans/deleteplan/${planId}`
//       );

//       // Remove deleted plan from UI instantly

//       setPlans((prevPlans) =>
//         prevPlans.filter((plan) => plan._id !== planId)
//       );

//     } catch (error) {

//       console.log(error);
//     }
//   };



//   // LOADING SCREEN

//   if (loading) {

//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#fdfdfb]">

//         <RefreshCcw className="w-8 h-8 text-green-600 animate-spin" />

//       </div>
//     );
//   }



//   return (

//     <div className="min-h-screen bg-[#fdfdfb] py-12">

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         <header className="mb-12 flex justify-between items-end">

//           <div>

//             <h1 className="text-4xl font-bold text-green-950 mb-2">
//               My Saved Plans
//             </h1>

//             <p className="text-gray-600">
//               Review your past crop recommendations and nutritional strategies.
//             </p>

//           </div>

//           <div className="hidden md:flex p-1 bg-green-50 rounded-xl">

//             <button className="p-2 bg-white shadow-sm rounded-lg text-green-600">

//               <LayoutGrid className="w-5 h-5" />

//             </button>

//           </div>

//         </header>



//         {plans.length === 0 ? (

//           <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-green-200">

//             <Wheat className="w-16 h-16 text-green-100 mx-auto mb-4" />

//             <h2 className="text-xl font-bold text-green-900 mb-2">
//               No plans saved yet
//             </h2>

//             <p className="text-gray-500 mb-8">
//               Start by creating your first nutritional plan in the Planner.
//             </p>

//             <a
//               href="/planner"
//               className="inline-block px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-all"
//             >
//               Go to Planner
//             </a>

//           </div>

//         ) : (

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

//             <AnimatePresence>

//               {plans.map((plan) => (

//                 <motion.div

//                   key={plan._id}

//                   layout

//                   initial={{ opacity: 0, scale: 0.9 }}

//                   animate={{ opacity: 1, scale: 1 }}

//                   exit={{ opacity: 0, scale: 0.9 }}
//                 >

//                   <Card
//                     title={plan.region}
//                     className="h-full flex flex-col justify-between"
//                   >

//                     <div className="space-y-4 mb-6">

//                       {/* DATE */}

//                       <div className="flex items-center space-x-2 text-xs text-gray-400 font-bold uppercase tracking-widest">

//                         <Calendar className="w-3 h-3" />

//                         <span>

//                           {plan.createdAt
//                             ? new Date(plan.createdAt).toLocaleDateString()
//                             : "Just now"}

//                         </span>

//                       </div>



//                       {/* SOIL + DEFICIENCY */}

//                       <div className="flex items-start space-x-3">

//                         <MapPin className="w-5 h-5 text-green-600 mt-0.5" />

//                         <div>

//                           <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
//                             Soil / Deficiency
//                           </p>

//                           <p className="text-gray-700 font-medium">

//                             {plan.soiltype}

//                             {" / "}

//                             <span className="text-red-600">

//                               {plan.commondeficiency}

//                             </span>

//                           </p>

//                         </div>

//                       </div>



//                       {/* CROPS */}

//                       <div className="flex items-start space-x-3">

//                         <Wheat className="w-5 h-5 text-amber-600 mt-0.5" />

//                         <div>

//                           <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
//                             Crops
//                           </p>

//                           <p className="text-green-800 font-bold">

//                             {plan.recommendation?.crops?.length > 0

//                               ? plan.recommendation.crops.join(', ')

//                               : "No crops available"}

//                           </p>

//                         </div>

//                       </div>

//                     </div>



//                     {/* ACTION BUTTONS */}

//                     <div className="pt-4 border-t border-gray-50 flex justify-between items-center">

//                       {/* DELETE */}

//                       <button

//                         onClick={() => handleDelete(plan._id)}

//                         className="p-2 text-gray-300 hover:text-red-500 transition-colors"

//                         title="Delete Plan"
//                       >

//                         <Trash2 className="w-5 h-5" />

//                       </button>



//                       {/* VIEW DETAILS */}

//                       <button

//                         onClick={() =>
//                           navigate(`/plan-details/${plan._id}`)
//                         }

//                         className="text-sm font-bold text-green-600 hover:text-green-700"
//                       >

//                         View Details

//                       </button>

//                     </div>

//                   </Card>

//                 </motion.div>

//               ))}
//             </AnimatePresence>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";

import { useAuth } from "../lib/AuthContext";

import Card from "../components/Card";

import {

  Calendar,
  MapPin,
  Wheat,
  Trash2,
  RefreshCcw,
  LayoutGrid,
  AlertCircle

} from "lucide-react";

import {

  motion,
  AnimatePresence

} from "motion/react";

import axios from "axios";

import { useNavigate } from "react-router-dom";



export default function MyPlans() {

  const { user } = useAuth();

  const navigate = useNavigate();




  const [plans, setPlans] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);




  // FETCH USER PLANS

  const fetchPlans = async () => {

    if (!user?.email) return;



    setLoading(true);

    try {

      const response = await axios.get(

        `http://localhost:5000/api/savedplans/allsoildata/${user.email}`
      );



      console.log(response.data);




      setPlans(
        response.data.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };




  useEffect(() => {

    fetchPlans();

  }, [user]);





  // DELETE PLAN

  const handleDelete = async (
    planId: string
  ) => {

    const confirmDelete =
      window.confirm(

        "Are you sure you want to delete this plan?"
      );



    if (!confirmDelete) return;




    try {

      await axios.delete(

        `http://localhost:5000/api/savedplans/deleteplan/${planId}`
      );




      setPlans((prevPlans) =>

        prevPlans.filter(

          (plan) =>
            plan._id !== planId
        )
      );

    } catch (error) {

      console.log(error);
    }
  };





  // LOADING SCREEN

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#fdfdfb]">

        <RefreshCcw className="w-8 h-8 text-green-600 animate-spin" />

      </div>
    );
  }






  return (

    <div className="min-h-screen bg-[#fdfdfb] py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">




        {/* HEADER */}

        <header className="mb-12 flex justify-between items-end">

          <div>

            <h1 className="text-4xl font-bold text-green-950 mb-2">

              My Saved Plans

            </h1>



            <p className="text-gray-600">

              Review your GIS + ML based crop recommendations.

            </p>

          </div>





          <div className="hidden md:flex p-1 bg-green-50 rounded-xl">

            <button className="p-2 bg-white shadow-sm rounded-lg text-green-600">

              <LayoutGrid className="w-5 h-5" />

            </button>

          </div>

        </header>






        {/* EMPTY STATE */}

        {plans.length === 0 ? (

          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-green-200">

            <Wheat className="w-16 h-16 text-green-100 mx-auto mb-4" />



            <h2 className="text-xl font-bold text-green-900 mb-2">

              No plans saved yet

            </h2>



            <p className="text-gray-500 mb-8">

              Start by generating your first ML-based crop recommendation.

            </p>



            <a

              href="/planner"

              className="inline-block px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-all"
            >

              Go to Planner

            </a>

          </div>

        ) : (




          // PLANS GRID

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <AnimatePresence>

              {plans.map((plan) => (

                <motion.div

                  key={plan._id}

                  layout

                  initial={{
                    opacity: 0,
                    scale: 0.9
                  }}

                  animate={{
                    opacity: 1,
                    scale: 1
                  }}

                  exit={{
                    opacity: 0,
                    scale: 0.9
                  }}
                >




                  <Card

                    title={plan.state}

                    className="h-full flex flex-col justify-between"
                  >




                    <div className="space-y-4 mb-6">




                      {/* DATE */}

                      <div className="flex items-center space-x-2 text-xs text-gray-400 font-bold uppercase tracking-widest">

                        <Calendar className="w-3 h-3" />



                        <span>

                          {plan.createdAt

                            ? new Date(
                                plan.createdAt
                              ).toLocaleDateString()

                            : "Just now"}

                        </span>

                      </div>






                      {/* REGION */}

                      <div className="flex items-start space-x-3">

                        <MapPin className="w-5 h-5 text-green-600 mt-0.5" />



                        <div>

                          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">

                            Region

                          </p>



                          <p className="text-gray-700 font-medium">

                            {plan.district},

                            {" "}

                            {plan.state}

                          </p>

                        </div>

                      </div>






                      {/* SOIL TYPE */}

                      <div className="flex items-start space-x-3">

                        <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />



                        <div>

                          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">

                            Soil Type

                          </p>



                          <p className="text-gray-700 font-medium">

                            {
                              plan.environmentInfo
                                ?.soil_type
                            }

                          </p>

                        </div>

                      </div>






                      {/* ML PREDICTION */}

                      <div className="flex items-start space-x-3">

                        <Wheat className="w-5 h-5 text-amber-600 mt-0.5" />



                        <div>

                          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">

                            Recommended Crop

                          </p>



                          <p className="text-green-800 font-bold text-xl">

                            {
                              plan.recommendedCrop
                            }

                          </p>

                        </div>

                      </div>

                    </div>






                    {/* ACTION BUTTONS */}

                    <div className="pt-4 border-t border-gray-50 flex justify-between items-center">




                      {/* DELETE */}

                      <button

                        onClick={() =>
                          handleDelete(
                            plan._id
                          )
                        }

                        className="p-2 text-gray-300 hover:text-red-500 transition-colors"

                        title="Delete Plan"
                      >

                        <Trash2 className="w-5 h-5" />

                      </button>






                      {/* VIEW DETAILS */}

                      <button

                        onClick={() =>

                          navigate(

                            `/plan-details/${plan._id}`
                          )
                        }

                        className="text-sm font-bold text-green-600 hover:text-green-700"
                      >

                        View Details

                      </button>

                    </div>

                  </Card>

                </motion.div>

              ))}

            </AnimatePresence>

          </div>
        )}

      </div>

    </div>
  );
}