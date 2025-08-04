//@ts-nocheck

import express from "express";
import { upload } from "../config/multer";
import verifyUser from "../middlewares/auth";
import { addProperty } from "../controllers/add_property";
import {
  getProperties,
  getProperty,
  getUserProperties,
  searchProperties,
} from "../controllers/get_properties";
import {
  addBookMark,
  deleteBookMark,
  getBookMarks,
} from "../controllers/add_to_bookmark";

const router = express.Router();

router.post("/upload", verifyUser, upload.array("images"), addProperty);
router.get("/list", getProperty);
router.get("/search", searchProperties);
router.get("/lists", getProperties);
router.post("/bookmark", verifyUser, addBookMark);
router.get("/bookmarkeds", verifyUser, getBookMarks);
router.delete("/bookmark/delete", verifyUser, deleteBookMark);
router.get("/user/lease", verifyUser, getUserProperties);

export default router;
