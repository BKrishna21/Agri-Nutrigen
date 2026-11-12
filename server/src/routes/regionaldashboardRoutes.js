
import express from "express";
import {
  getRegionalWeather,
} from "../controllers/regionaldashboardController.js";

const router = express.Router();

router.get("/weather", getRegionalWeather);

export default router;
