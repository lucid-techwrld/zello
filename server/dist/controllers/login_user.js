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
exports.logOUt = exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../database/database"));
const generateToken_1 = __importDefault(require("../helpers/generateToken"));
const generakeOTP_1 = __importDefault(require("../helpers/generakeOTP"));
const sendOTP_1 = __importDefault(require("../helpers/sendOTP"));
const sendCookie_1 = __importDefault(require("../helpers/sendCookie"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
    }
    try {
        const user = yield (0, database_1.default)("users").where({ email }).first();
        if (!user) {
            res.status(404).json({ message: "User does not exist" });
        }
        const correctPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!correctPassword) {
            return res.status(400).json({ error: "Email or password is incorrect" });
        }
        if (!user.isVerified) {
            const generatedOTP = (yield (0, generakeOTP_1.default)(user.email));
            yield (0, sendOTP_1.default)(user.email, generatedOTP);
            return res.status(200).json({
                success: true,
                message: "OTP Verification has been sent to your email",
            });
        }
        const userInfo = yield (0, database_1.default)("users")
            .join("user_info", "users.id", "user_info.user_id")
            .select("users.id", "users.email", "user_info.role")
            .where("users.id", user.id)
            .first();
        if (!userInfo) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        const token = (0, generateToken_1.default)(userInfo);
        (0, sendCookie_1.default)(req, res, token);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                avatar: user.avatar,
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.loginUser = loginUser;
const logOUt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("userId", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        });
        return res.status(200).json({ message: "Logged out successfully" });
    }
    catch (err) {
        return res
            .status(500)
            .json({ error: "Something went wrong while logging out." });
    }
});
exports.logOUt = logOUt;
