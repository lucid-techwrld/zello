"use strict";
// @ts-nocheck
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
const transporter = require("../utils/nodemailer");
const htmlTemplate_1 = __importDefault(require("../utils/htmlTemplate"));
const sendOTP = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(`Sending OTP to ${email}`);
    const mailOptions = {
        from: `"Zello Service Team" <lucidtechwrld9@gmail.com>`,
        to: email,
        subject: "Your OTP Verification Code",
        html: (0, htmlTemplate_1.default)(otp),
    };
    try {
        const result = yield transporter.sendMail(mailOptions);
        // console.log("OTP sent successfully:", result);
        // console.log(`OTP sent to ${email}`);
    }
    catch (error) {
        console.error(`Error sending OTP to ${email}:`, error);
        throw new Error("Failed to send OTP");
    }
});
exports.default = sendOTP;
