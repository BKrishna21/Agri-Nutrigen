import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const genomicDataPath = path.join(
  __dirname,
  "../data/nutrigenomic_variants.csv"
);

// Read and convert CSV into objects
function loadGenomicData() {
  const file = fs.readFileSync(genomicDataPath, "utf-8");

  const lines = file
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== "");

  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");

    const record = {};

    headers.forEach((header, index) => {
      record[header.trim()] = values[index]?.trim() || "";
    });

    return record;
  });
}

// Convert VCF genotype into readable genotype
function getGenotype(genotype, referenceAllele, alternateAllele) {
  if (!genotype) {
    return "Unknown";
  }

  const alleles = genotype.split("/");

  if (alleles.length !== 2) {
    return "Unknown";
  }

  const firstAllele =
    alleles[0] === "0"
      ? referenceAllele
      : alternateAllele;

  const secondAllele =
    alleles[1] === "0"
      ? referenceAllele
      : alternateAllele;

  return `${firstAllele}/${secondAllele}`;
}

// Convert evidence + genotype into a simple relevance level
function calculateRelevance(genotype, evidenceStrength) {
  if (genotype === "Unknown") {
    return "Unknown";
  }

  if (genotype === "0/0") {
    return "Low";
  }

  if (evidenceStrength === "strong") {
    return "High";
  }

  if (evidenceStrength === "moderate") {
    return "Moderate";
  }

  return "Low";
}

// Read VCF file
function readVcf(vcfPath) {
  const file = fs.readFileSync(vcfPath, "utf-8");

  const lines = file
    .split("\n")
    .filter((line) => line.trim() !== "");

  const variants = [];

  for (const line of lines) {
    if (line.startsWith("#")) {
      continue;
    }

    const columns = line.split("\t");

    if (columns.length < 10) {
      continue;
    }

    const [
      chromosome,
      position,
      rsId,
      referenceAllele,
      alternateAllele,
      quality,
      filter,
      info,
      format,
      sample
    ] = columns;

    const genotype = sample.split(":")[0];

    variants.push({
      chromosome,
      position,
      rsId,
      referenceAllele,
      alternateAllele,
      genotype,
      quality,
      filter
    });
  }

  return variants;
}

// Main genomic analysis function
export function analyzeGenotype(vcfPath) {
  const genomicData = loadGenomicData();
  const variants = readVcf(vcfPath);

  const results = [];

  for (const variant of variants) {
    const matchingVariant = genomicData.find(
      (item) => item.rs_id === variant.rsId
    );

    // Ignore SNPs that are not part of our nutrigenomic database
    if (!matchingVariant) {
      continue;
    }

    const readableGenotype = getGenotype(
      variant.genotype,
      matchingVariant.reference_allele,
      matchingVariant.alternate_allele
    );

    const relevance = calculateRelevance(
      variant.genotype,
      matchingVariant.evidence_strength
    );

    results.push({
      rsId: variant.rsId,
      gene: matchingVariant.gene,
      nutrient: matchingVariant.nutrient,

      genotype: readableGenotype,

      trait: matchingVariant.trait,

      effectDirection: matchingVariant.effect_direction,

      evidenceStrength:
        matchingVariant.evidence_strength,

      geneticRelevance: relevance,

      indianEvidence:
        matchingVariant.indian_evidence
    });
  }

  return results;
}

// Create nutrient-level summary
export function getNutrientSummary(results) {
  const summary = {};

  for (const result of results) {
    const nutrient = result.nutrient;

    if (!summary[nutrient]) {
      summary[nutrient] = {
        nutrient,
        variantsFound: 0,
        genes: [],
        relevance: "Low"
      };
    }

    summary[nutrient].variantsFound += 1;

    if (!summary[nutrient].genes.includes(result.gene)) {
      summary[nutrient].genes.push(result.gene);
    }

    // High takes priority over Moderate and Low
    if (result.geneticRelevance === "High") {
      summary[nutrient].relevance = "High";
    } else if (
      result.geneticRelevance === "Moderate" &&
      summary[nutrient].relevance !== "High"
    ) {
      summary[nutrient].relevance = "Moderate";
    }
  }

  return Object.values(summary);
}