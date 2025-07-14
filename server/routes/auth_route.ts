//@ts-nocheck

import express from "express";
import { loginUser } from "../controllers/login_user";
import { createUser, addUserDetails } from "../controllers/create_user";

const router = express.Router();
router.post("/login", loginUser);
router.post("/register", createUser);
router.post("/add-details", addUserDetails);

export default router;
