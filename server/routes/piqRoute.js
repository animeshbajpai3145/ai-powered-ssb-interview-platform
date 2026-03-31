import express from "express";
import {createPiq,getPiq,updatePiq,deletePiq} from "../controllers/piqController.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/",verifyToken,createPiq);
router.get("/",verifyToken,getPiq);
router.put("/",verifyToken,updatePiq);
router.delete("/",verifyToken,deletePiq);

export default router;