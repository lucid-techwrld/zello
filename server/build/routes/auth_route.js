"use strict";
//@ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_user_1 = require("../controllers/login_user");
const create_user_1 = require("../controllers/create_user");
const reset_password_1 = __importDefault(require("../controllers/reset_password"));
const router = express_1.default.Router();
router.post("/login", login_user_1.loginUser);
router.post("/register", create_user_1.createUser);
router.post("/add-details", create_user_1.addUserDetails);
router.patch("/reset-password", reset_password_1.default);
router.get("/logout", login_user_1.logOUt);
exports.default = router;
