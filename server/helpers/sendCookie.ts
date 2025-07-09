import { Request, Response } from "express";

function sendCookie(req:Request, res:Response, token:string) {
    req.cookies(token, {
        httpOnly: true,
        secure: ,
        sameSite: ,
        maxAge:
    })
}