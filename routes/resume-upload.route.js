import express from "express"
import multer from "multer";
import { handleResumeEvaluate } from "../controllers/resume-evaluate.controller.js";


const router = express.Router();

// multer config
const upload = multer({ dest: "uploads/" });

router.post("/evaluate", upload.single("resume"), handleResumeEvaluate);

export default router;