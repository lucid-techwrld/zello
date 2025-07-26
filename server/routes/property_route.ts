//@ts-nocheck

import express from "express";
import { upload } from "../config/multer";
import verifyUser from "../middlewares/auth";
import addProperty from "../controllers/add_property";
import {
  getProperties,
  getProperty,
  searchProperties,
} from "../controllers/get_properties";

const router = express.Router();

router.post("/upload", verifyUser, upload.array("images"), addProperty);
router.get("/list", getProperty);
router.get("/search", searchProperties);
router.get("/", getProperties);

export default router;
