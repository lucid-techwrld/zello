//@ts-nocheck

import express from "express";
import { loginUser } from "../controllers/login_user";
import { createUser, addUserDetails } from "../controllers/create_user";
import getProfile from "../controllers/get_profile";
import verifyUser from "../middlewares/auth";

const router = express.Router();
router.post("/login", loginUser);
router.post("/register", createUser);
router.post("/add-details", addUserDetails);
router.get("/profile", verifyUser, getProfile);

export default router;
