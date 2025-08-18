"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendCookie(req, res, token) {
    res.cookie("userId", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
}
exports.default = sendCookie;
