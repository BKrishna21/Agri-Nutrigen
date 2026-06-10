
import express from "express";

import {
  getLocationDetails
} from "../controllers/locationController.js";

const router = express.Router();



router.post(
  "/reverse-geocode",
  getLocationDetails
);



export default router;