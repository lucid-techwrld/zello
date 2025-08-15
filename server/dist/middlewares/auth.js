"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUser = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.userId;
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized. Token missing." });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res
            .status(500)
            .json({ success: false, message: "JWT secret not configured." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("Token verification error:", error);
        return res
            .status(403)
            .json({ success: false, message: "Invalid or expired token." });
    }
};
exports.default = verifyUser;
