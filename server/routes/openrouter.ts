//@ts-nocheck
import Express from "express";
const router = Express.Router();
import generateDescription from "../controllers/generate_desc";

router.post("/generate-description", generateDescription);

export default router;
