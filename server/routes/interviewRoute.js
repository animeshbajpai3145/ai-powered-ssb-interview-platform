import express from "express";
import {startInterview, submitInterview, getInterviewReport,getInterviewHistory} from "../controllers/interviewController.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/start", verifyToken, startInterview);

router.post("/submit", verifyToken, submitInterview);

router.get("/report/:sessionId", verifyToken, getInterviewReport);

router.get("/history", verifyToken, getInterviewHistory);

export default router;