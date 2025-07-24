//@ts-nocheck

import express from "express";
import { upload } from "../config/multer";
import verifyUser from "../middlewares/auth";
import addProperty from "../controllers/add_property";

const router = express.Router();

router.post("/upload", verifyUser, upload.array("images"), addProperty);

export default router;
