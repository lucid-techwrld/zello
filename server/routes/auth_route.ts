//@ts-nocheck

import express from "express";
import { loginUser, logOUt } from "../controllers/login_user";
import { createUser, addUserDetails } from "../controllers/create_user";
import verifyUser from "../middlewares/auth";
import resetPassword from "../controllers/reset_password";
import { createStreamUser } from "../middlewares/create_stream";

const router = express.Router();
router.post("/login", loginUser);
router.post("/register", createUser, createStreamUser);
router.post("/add-details", addUserDetails);
router.patch("/reset-password", resetPassword);
router.get("/logout", logOUt);

export default router;
