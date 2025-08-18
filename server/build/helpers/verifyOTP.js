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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const verifyOTPCode = (req, res, email, otpCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otpRecord = yield (0, database_1.default)("otps")
            .select(database_1.default.raw("EXTRACT(EPOCH FROM (expired_at - NOW())) AS remaining_time"), "otp_code")
            .where({
            email,
            isUsed: false,
        })
            .first();
        if (!otpRecord) {
            return res.status(404).json({ error: "OTP not found or expired" });
        }
        const isMatch = yield bcryptjs_1.default.compare(otpCode, otpRecord.otp_code);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid OTP code" });
        }
        if (otpRecord.remaining_time <= 0) {
            return res.status(400).json({ error: "OTP has expired" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong please try again later",
        });
    }
});
exports.default = verifyOTPCode;
