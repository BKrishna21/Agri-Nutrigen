import express from "express";

import {
  predictCrop
} from "../controllers/mlController.js";

const router = express.Router();




router.post(
  "/predict-crop",
  predictCrop
);

export default router;