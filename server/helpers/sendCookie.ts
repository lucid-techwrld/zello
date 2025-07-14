import { Request, Response } from "express";

function sendCookie(req: Request, res: Response, token: string) {
  res.cookie(token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
}

export default sendCookie;
