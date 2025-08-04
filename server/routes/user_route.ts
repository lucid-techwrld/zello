//@ts-nocheck
import express from "express";

const router = express.Router();
import updateUserInfo from "../controllers/update_user_info";
import verifyUser from "../middlewares/auth";
import getProfile from "../controllers/get_profile";

router.get("/profile", verifyUser, getProfile);
router.patch("/update-info", verifyUser, updateUserInfo);

export default router;
