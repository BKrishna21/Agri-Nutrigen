
// import soilParams from "../models/planner.js";
// import { validationResult } from "express-validator";

// export const initsoildata = async (req,res) =>{
    
//     const errors = validationResult(req);

//         if (!errors.isEmpty()) {

//         return res.status(400).json({
//             errors: errors.array()
//         });
//     }

//     const  {  name, email, region, soiltype, commondeficiency,recommendation } = req.body;
//     console.log(req.body);
//     if( !name || !email || !region || !soiltype || !commondeficiency ){
//         console.log("No data provided");
//         return res.status(400).json({ status : "incomplete data"});
//     }

//     const result = await soilParams.create({
//         name,
//         email,
//         region,
//         soiltype,
//         commondeficiency,
//         recommendation
//     });

//     return res.status(201).json({ 
//         status: "soil data is received!",
//         data: result
//     });
    
// };

// export const allsavedplan = async (req,res) => {
    
//     try {
//         const { email }= req.params;


//         const allplans = await soilParams.find({ email:email });

//         if(!allplans){
//             return res.status(404).json({ status: "Data not found!"});
//         }

//         return res.status(200).json({
//             status: "Saved Plans data is received!",
//             data: allplans
//         });

//     } catch (error) {

//         console.log("error occured:", error);
//         return res.status(500).json({ status: "Server error!"});       
//     }
// };

// export const deleteplans = async (req, res)=>{
//     try{
//         const {id} = req.params;

//         const deleteplan=await soilParams.findByIdAndDelete(id);
        
//         if(!deleteplan){
//             return res.status(404).json({ message: 'plan not found'});
//         }
//         return res.status(200).json({status: "deleted successfully!"});
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({ status:"Server Error!"});
//     }
// }



import soilParams from "../models/planner.js";



export const initsoildata = async (
  req,
  res
) => {

  try {

    const {

      name,
      email,

      state,
      district,
      country,

      latitude,
      longitude,

      environmentInfo,

      recommendedCrop

    } = req.body;




    // VALIDATION

    if (

      !name ||
      !email ||

      !state ||
      !district ||
      !country ||

      !latitude ||
      !longitude ||

      !environmentInfo ||

      !recommendedCrop

    ) {

      return res.status(400).json({

        status: "Incomplete data"
      });
    }




    // SAVE PLAN

    const result =
      await soilParams.create({

        name,
        email,

        state,
        district,
        country,

        latitude,
        longitude,

        environmentInfo,

        recommendedCrop
      });




    return res.status(201).json({

      status:
        "Plan saved successfully",

      data: result
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      status: "Server Error"
    });
  }
};





// GET ALL SAVED PLANS

export const allsavedplan = async (
  req,
  res
) => {

  try {

    const { email } = req.params;




    const allplans =
      await soilParams.find({

        email: email

      }).sort({

        createdAt: -1
      });




    return res.status(200).json({

      status:
        "Saved plans fetched successfully",

      data: allplans
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      status: "Server Error"
    });
  }
};





// DELETE PLAN

export const deleteplans = async (
  req,
  res
) => {

  try {

    const { id } = req.params;




    const deletedPlan =
      await soilParams.findByIdAndDelete(id);




    if (!deletedPlan) {

      return res.status(404).json({

        status: "Plan not found"
      });
    }




    return res.status(200).json({

      status:
        "Plan deleted successfully"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      status: "Server Error"
    });
  }
};