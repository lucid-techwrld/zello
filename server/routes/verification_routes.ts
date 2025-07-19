//@ts-nocheck

import verifyOTP from "../controllers/verify_otp";
import requestOTP from "../controllers/request_otp";
import express from "express";

const router = express.Router();

router.post("/otp", verifyOTP);
router.post("/request-otp", requestOTP);

export default router;
