import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const priorityPath = path.join(
  __dirname,
  "../data/combined_nutrient_priority.json"
);

function loadPriorityData() {
  return JSON.parse(
    fs.readFileSync(priorityPath, "utf-8")
  );
}

// Convert genomic relevance into 0–1
function getGenomicScore(geneticScore) {
  if (
    geneticScore === null ||
    geneticScore === undefined
  ) {
    return null;
  }

  return Number(
    (Number(geneticScore) / 3).toFixed(3)
  );
}

// Calculate genomic relevance for a crop
function calculateGenomicScore(
  nutrientDetails,
  state,
  priorityData
) {
  const stateRecords =
    priorityData.records.filter(
      (item) =>
        item.state.toLowerCase() ===
        state.toLowerCase()
    );

  const scores = [];

  for (const nutrient of nutrientDetails) {
    const record = stateRecords.find(
      (item) =>
        item.nutrient === nutrient.nutrient
    );

    if (!record) {
      continue;
    }

    const genomicScore =
      getGenomicScore(record.genetic_score);

    if (genomicScore === null) {
      continue;
    }

    scores.push(genomicScore);
  }

  if (scores.length === 0) {
    return null;
  }

  const total = scores.reduce(
    (sum, score) => sum + score,
    0
  );

  return Number(
    (total / scores.length).toFixed(3)
  );
}

// Create final hybrid score
function calculateHybridScore(
  agriculturalScore,
  nutritionScore,
  genomicScore
) {
  const scores = [];

  if (
    agriculturalScore !== null &&
    agriculturalScore !== undefined
  ) {
    scores.push(
      Number(agriculturalScore)
    );
  }

  if (
    nutritionScore !== null &&
    nutritionScore !== undefined
  ) {
    scores.push(
      Number(nutritionScore)
    );
  }

  if (
    genomicScore !== null &&
    genomicScore !== undefined
  ) {
    scores.push(
      Number(genomicScore)
    );
  }

  if (scores.length === 0) {
    return 0;
  }

  const total = scores.reduce(
    (sum, score) => sum + score,
    0
  );

  return Number(
    (total / scores.length).toFixed(3)
  );
}

// MAIN HYBRID ENGINE
export function generateHybridRecommendation(
  crops,
  nutritionResult,
  state
) {
  const priorityData =
    loadPriorityData();

  const nutritionResults =
    nutritionResult.results || [];

  const finalResults = [];

  for (const mlCrop of crops) {
    const nutritionCrop =
      nutritionResults.find(
        (item) =>
          item.crop.toLowerCase() ===
          mlCrop.crop.toLowerCase()
      );

    const agriculturalScore =
      Number(mlCrop.probability || 0);

    const nutritionScore =
      nutritionCrop
        ? Number(
            nutritionCrop.nutritionScore || 0
          )
        : 0;

    const nutrientDetails =
      nutritionCrop
        ? nutritionCrop.nutrientDetails || []
        : [];

    const genomicScore =
      calculateGenomicScore(
        nutrientDetails,
        state,
        priorityData
      );

    const finalScore =
      calculateHybridScore(
        agriculturalScore,
        nutritionScore,
        genomicScore
      );

    finalResults.push({
      crop: mlCrop.crop,

      agriculturalScore:
        Number(
          agriculturalScore.toFixed(3)
        ),

      nutritionScore,

      genomicScore,

      finalScore,

      nutritionDataAvailable:
        nutritionCrop
          ? nutritionCrop
              .nutritionDataAvailable
          : false,

      nutrientDetails,

      genomicDataAvailable:
        genomicScore !== null
    });
  }

  finalResults.sort(
    (a, b) =>
      b.finalScore -
      a.finalScore
  );

  return {
    state,
    scoringMethod:
      "hybrid_average",
    results: finalResults
  };
}