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
const generateOTP = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("Generating OTP for email:", email);
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const encryptedOTP = yield bcryptjs_1.default.hash(otpCode, 10);
    try {
        const existing = yield (0, database_1.default)("otps").where({ email, isUsed: false }).first();
        if (existing) {
            yield (0, database_1.default)("otps")
                .where({ email, isUsed: false })
                .update({
                otp_code: encryptedOTP,
                expired_at: database_1.default.raw("NOW() + INTERVAL '5 minutes'"),
                created_at: database_1.default.fn.now(),
            });
        }
        else {
            yield (0, database_1.default)("otps").insert({
                otp_code: encryptedOTP,
                email,
                expired_at: database_1.default.raw("NOW() + INTERVAL '5 minutes'"),
            });
        }
        // console.log("OTP generated and stored in database:", otpCode);
        return otpCode;
    }
    catch (error) {
        console.error("Error generating OTP:", error);
        throw error;
    }
});
exports.default = generateOTP;
