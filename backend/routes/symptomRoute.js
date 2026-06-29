import express from "express";
import { checkSymptoms } from "../controllers/symptomController.js";

const symptomRouter = express.Router();

// POST /api/symptoms/check
symptomRouter.post("/check", checkSymptoms);

export default symptomRouter;
