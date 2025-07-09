import express from "express";
const router = express.Router();
import { createUser } from "../controllers/create_user";

router.post("/register", createUser);

export default router;
