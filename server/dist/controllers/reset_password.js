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
const verifyOTP_1 = __importDefault(require("../helpers/verifyOTP"));
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword, otpCode } = req.body;
    if (!email || !newPassword || !otpCode) {
        return res
            .status(400)
            .json({ error: "Email, old password, and new password are required" });
    }
    try {
        const user = yield (0, database_1.default)("users").where({ email }).first();
        if (!user) {
            return res
                .status(404)
                .json({ success: true, message: "User does not exist" });
        }
        (0, verifyOTP_1.default)(req, res, email, otpCode);
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        yield (0, database_1.default)("users").where({ email }).update({
            password: hashedPassword,
        });
        return res
            .status(201)
            .json({ success: true, message: "Password Updated Successfully" });
    }
    catch (error) { }
});
exports.default = resetPassword;
