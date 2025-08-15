"use strict";
//@ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verify_otp_1 = __importDefault(require("../controllers/verify_otp"));
const request_otp_1 = __importDefault(require("../controllers/request_otp"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/otp", verify_otp_1.default);
router.post("/request-otp", request_otp_1.default);
exports.default = router;
