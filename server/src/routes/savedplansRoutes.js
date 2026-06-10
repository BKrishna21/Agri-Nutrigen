import express from 'express';
import { initsoildata,allsavedplan,deleteplans } from "../controllers/paramController.js";
import { planValidation } from '../middleware/validation.js';

const saveplanroutes = express.Router();


saveplanroutes.post("/soildata", planValidation, initsoildata);

saveplanroutes.get("/allsoildata/:userId" , allsavedplan);

saveplanroutes.delete("/deleteplan/:id", deleteplans );

export default saveplanroutes;

