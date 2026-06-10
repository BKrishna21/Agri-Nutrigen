import { body } from "express-validator";

export const planValidation = [

  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("region")
    .notEmpty()
    .withMessage("Region is required"),

  body("soiltype")
    .isIn([
      "Red Soil",
      "Black Soil",
      "Alluvial Soil",
      "Laterite Soil",
      "Sandy Soil"
    ])
    .withMessage("Invalid soil type"),

  body("commondeficiency")
    .isIn([
      "Iron",
      "Vitamin A",
      "Zinc",
      "Protein",
      "Iodine"
    ])
    .withMessage("Invalid deficiency")
];