"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const update_user_info_1 = __importDefault(require("../controllers/update_user_info"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const get_profile_1 = __importDefault(require("../controllers/get_profile"));
router.get("/profile", auth_1.default, get_profile_1.default);
router.patch("/update-info", auth_1.default, update_user_info_1.default);
exports.default = router;
