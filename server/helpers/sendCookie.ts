import { Request, Response } from "express";

function sendCookie(req: Request, res: Response, token: string) {
  res.cookie("userId", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
}

export default sendCookie;
