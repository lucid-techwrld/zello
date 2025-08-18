"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
const verifyOTP_1 = __importDefault(require("../helpers/verifyOTP"));
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otpCode } = req.body;
    if (!email || !otpCode) {
        return res.status(400).json({ error: "Email and OTP code are required" });
    }
    try {
        const user = yield (0, database_1.default)("users").where({ email }).first();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.isVerified) {
            return res.json({
                success: true,
                message: "User has already been verified",
            });
        }
        (0, verifyOTP_1.default)(req, res, email, otpCode);
        yield (0, database_1.default)("users").where({ email }).update({
            isVerified: true,
        });
        yield (0, database_1.default)("otps").where({ email }).update({
            isUsed: true,
        });
        res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            id: user.id,
        });
    }
    catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = verifyOTP;
