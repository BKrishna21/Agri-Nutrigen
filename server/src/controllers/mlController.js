
import axios from "axios";

import {
  matchCropsWithNutrition
} from "../services/nutritionService.js";

import {
  generateHybridRecommendation
} from "../services/recommendationService.js";


export const predictCrop = async (
  req,
  res
) => {

  try {

    const {
      N,
      P,
      K,
      temperature,
      humidity,
      ph,
      rainfall,
      state
    } = req.body;


    if (!state) {

      return res.status(400).json({
        message: "State is required"
      });

    }


    // STEP 1
    // GET ENVIRONMENTAL ML PREDICTIONS

    const mlResponse =
      await axios.post(
        "http://127.0.0.1:5001/predict",
        {
          N,
          P,
          K,
          temperature,
          humidity,
          ph,
          rainfall
        }
      );


    const topCrops =
      mlResponse.data.top_crops || [];


    if (topCrops.length === 0) {

      return res.status(200).json({

        status:
          "No crop predictions found",

        top_crops: [],

        final_recommendations: []

      });

    }


    // STEP 2
    // NUTRITION MATCHING

    const nutritionResult =
      matchCropsWithNutrition(
        topCrops,
        state
      );


    // STEP 3
    // HYBRID RECOMMENDATION

    const hybridResult =
      generateHybridRecommendation(
        topCrops,
        nutritionResult,
        state
      );


    // STEP 4
    // SEND EVERYTHING TO FRONTEND

    return res.status(200).json({

      status:
        "Hybrid prediction successful",

      state,

      top_crops:
        topCrops,

      nutrition:
        nutritionResult,

      final_recommendations:
        hybridResult.results

    });

  }

  catch (error) {

    console.log(
      "Hybrid prediction error:",
      error.response?.data ||
      error.message
    );


    console.log(
    "========== PHASE 10 ERROR =========="
  );

  console.log(
    "Message:",
    error.message
  );

  console.log(
    "Response:",
    error.response?.data
  );

  console.log(
    "Stack:",
    error.stack
  );

  console.log(
    "===================================="
  );
  


    return res.status(500).json({

      message:
        "Hybrid prediction failed",

      error:
        error.message

    });

  }

};


export const matchNutrition = async (
  req,
  res
) => {

  try {

    const {
      crops,
      state
    } = req.body;


    if (
      !crops ||
      !Array.isArray(crops)
    ) {

      return res.status(400).json({

        message:
          "Crops array is required"

      });

    }


    if (!state) {

      return res.status(400).json({

        message:
          "State is required"

      });

    }


    const result =
      matchCropsWithNutrition(

        crops,

        state

      );


    return res.status(200).json({

      status:
        "Nutrition matching successful",

      data:
        result

    });


  } catch (error) {

    console.log(
      "Nutrition matching error:",
      error
    );


    return res.status(500).json({

      message:
        "Nutrition matching failed",

      error:
        error.message

    });

  }

};