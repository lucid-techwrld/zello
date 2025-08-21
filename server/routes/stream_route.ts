//@ts-nocheck

import express from "express";
import generateStreamToken from "../controllers/generate_stream_token";
import verifyUser from "../middlewares/auth";
const router = express.Router();

router.get("/generate-token", verifyUser, generateStreamToken);

export default router;
