//@ts-nocheck

import verifyOTP from "../controllers/verify_otp";
import express from "express";

const router = express.Router();

router.post("/otp", verifyOTP);

export default router;
