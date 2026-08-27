import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// DATA FILES

const nutritionPath = path.join(
  __dirname,
  "../data/crop_nutrition_dataset.json"
);

const priorityPath = path.join(
  __dirname,
  "../data/combined_nutrient_priority.json"
);

const referencePath = path.join(
  __dirname,
  "../data/nutrient_reference_requirements.json"
);


// LOAD DATA

function loadNutritionData() {

  return JSON.parse(
    fs.readFileSync(
      nutritionPath,
      "utf-8"
    )
  );

}


function loadPriorityData() {

  return JSON.parse(
    fs.readFileSync(
      priorityPath,
      "utf-8"
    )
  );

}


function loadReferenceData() {

  return JSON.parse(
    fs.readFileSync(
      referencePath,
      "utf-8"
    )
  );

}


// PRIORITY WEIGHTS

function getPriorityWeight(priority) {

  const weights = {

    "Very High": 4,

    "High": 3,

    "Moderate": 2,

    "Low": 1

  };

  return weights[priority] || 0;

}


// NORMALIZE CROP NAME
function normalizeCropName(name) {

  const cropMap = {

    rice: "rice_raw_milled",

    wheat: "wheat_whole",

    maize: "maize_dry",

    chickpea: "bengal_gram_dal",

    "chana": "bengal_gram_dal",

    "chana_dal": "bengal_gram_dal",

    ragi: "finger_millet",

    "finger_millet": "finger_millet",

    bajra: "pearl_millet",

    "pearl_millet": "pearl_millet",

    moong: "green_gram_whole",

    "green_gram": "green_gram_whole",

    lentil: "lentil_dal",

    soybean: "soybean_brown"

  };


  const normalized =
    name
      .toLowerCase()
      .trim()
      .replace(/ /g, "_");


  return cropMap[normalized] || normalized;
}


// GET CROP NUTRIENT VALUE

function getCropNutrientValue(
  crop,
  nutrient
) {

  const fields = {

    iron: "iron_mg",

    zinc: "zinc_mg",

    folate: "folate_ug",

    vitamin_b12: "vitamin_b12_ug",

    vitamin_a: "vitamin_a_ug",

    vitamin_d: "vitamin_d_ug"

  };


  const field = fields[nutrient];


  if (!field) {

    return null;

  }


  return crop[field];

}


// CALCULATE AVERAGE POPULATION REFERENCE

function calculateAverageReference(
  referenceData
) {

  const records =
    referenceData.records;


  const nutrients = [

    "iron_mg",

    "zinc_mg",

    "folate_ug",

    "vitamin_b12_ug",

    "vitamin_a_ug",

    "vitamin_d_ug"

  ];


  const averages = {};


  for (const nutrient of nutrients) {

    const values =
      records
        .map(
          (record) =>
            record[nutrient]
        )
        .filter(
          (value) =>
            value !== null &&
            value !== undefined
        );


    if (values.length === 0) {

      averages[nutrient] = null;

      continue;

    }


    const total =
      values.reduce(
        (sum, value) =>
          sum + Number(value),
        0
      );


    averages[nutrient] =
      Number(
        (
          total / values.length
        ).toFixed(2)
      );

  }


  return averages;

}


// GET REFERENCE VALUE

function getReferenceValue(
  referenceValues,
  nutrient
) {

  const fields = {

    iron: "iron_mg",

    zinc: "zinc_mg",

    folate: "folate_ug",

    vitamin_b12: "vitamin_b12_ug",

    vitamin_a: "vitamin_a_ug",

    vitamin_d: "vitamin_d_ug"

  };


  const field =
    fields[nutrient];


  if (!field) {

    return null;

  }


  return referenceValues[field];

}


// CALCULATE NUTRITION SCORE

function calculateNutritionScore(

  crop,

  priorityNutrients,

  referenceValues

) {

  let weightedScore = 0;

  let totalPriorityWeight = 0;

  const nutrientDetails = [];


  for (
    const priority
    of priorityNutrients
  ) {

    const nutrient =
      priority.nutrient;


    const priorityWeight =
      getPriorityWeight(
        priority.combined_priority
      );


    const cropValue =
      getCropNutrientValue(
        crop,
        nutrient
      );


    const referenceValue =
      getReferenceValue(
        referenceValues,
        nutrient
      );


    // Ignore missing data

    if (

      cropValue === null ||

      cropValue === undefined ||

      referenceValue === null ||

      referenceValue === undefined ||

      referenceValue === 0 ||

      priorityWeight === 0

    ) {

      continue;

    }


    // NORMALIZE AGAINST AVERAGE REFERENCE

    const adequacy =
      Number(cropValue) /
      Number(referenceValue);


    // Maximum contribution = 100%

    const cappedAdequacy =
      Math.min(
        adequacy,
        1
      );


    // APPLY NUTRIENT PRIORITY

    const contribution =
      cappedAdequacy *
      priorityWeight;


    weightedScore +=
      contribution;


    totalPriorityWeight +=
      priorityWeight;


    nutrientDetails.push({

      nutrient,

      cropValue:
        Number(cropValue),

      populationReference:
        Number(referenceValue),

      adequacy:
        Number(
          cappedAdequacy.toFixed(3)
        ),

      priority:
        priority.combined_priority,

      priorityWeight,

      contribution:
        Number(
          contribution.toFixed(3)
        )

    });

  }


  if (
    totalPriorityWeight === 0
  ) {

    return {

      score: 0,

      nutrientDetails

    };

  }


  const score =
    weightedScore /
    totalPriorityWeight;


  return {

    score:
      Number(
        score.toFixed(3)
      ),

    nutrientDetails

  };

}


// MAIN FUNCTION

export function matchCropsWithNutrition(

  crops,

  state

) {

  const nutritionData =
    loadNutritionData();


  const priorityData =
    loadPriorityData();


  const referenceData =
    loadReferenceData();


  // AVERAGE ALL SIX DEMOGRAPHIC
  // REFERENCE GROUPS

  const averageReferences =
    calculateAverageReference(
      referenceData
    );


  // FIND STATE PRIORITIES

  const priorityNutrients =
    priorityData.records.filter(

      (item) =>

        item.state.toLowerCase() ===
        state.toLowerCase()

        &&

        item.age_group ===
        "adolescents_10_19"

    );


  const results = [];


  for (
    const mlCrop
    of crops
  ) {

    const normalizedMLCrop =
      normalizeCropName(
        mlCrop.crop
      );


    const nutritionCrop =
      nutritionData.find(

        (item) =>

          normalizeCropName(
            item.crop
          ) ===
          normalizedMLCrop

      );


    // NO NUTRITION DATA

    if (!nutritionCrop) {

      results.push({

        crop:
          mlCrop.crop,

        mlProbability:
          mlCrop.probability,

        nutritionScore: 0,

        nutrientDetails: [],

        nutritionDataAvailable:
          false

      });

      continue;

    }


    const nutritionResult =
      calculateNutritionScore(

        nutritionCrop,

        priorityNutrients,

        averageReferences

      );


    results.push({

      crop:
        mlCrop.crop,

      mlProbability:
        mlCrop.probability,

      nutritionScore:
        nutritionResult.score,

      nutrientDetails:
        nutritionResult.nutrientDetails,

      nutritionDataAvailable:
        true

    });

  }


  // SORT BY NUTRITION SCORE

  results.sort(

    (a, b) =>

      b.nutritionScore -
      a.nutritionScore

  );


  return {

    state,

    referenceType:
      "average_adolescent_population",

    referenceGroups:
      referenceData.records.length,

    results

  };

}