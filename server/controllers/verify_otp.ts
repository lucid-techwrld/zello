import db from "../database/database";
import bcrypt from "bcryptjs";
import generateOTP from "../helpers/generakeOTP";
import sendOTP from "../helpers/sendOTP";
import { Request, Response } from "express";
import verifyOTPCode from "../helpers/verifyOTP";

interface CustomOTPRequest extends Request {
  body: {
    email: string;
    otpCode: string;
  };
}

const verifyOTP = async (req: CustomOTPRequest, res: Response) => {
  const { email, otpCode } = req.body;
  if (!email || !otpCode) {
    return res.status(400).json({ error: "Email and OTP code are required" });
  }

  try {
    const user = await db("users").where({ email }).first();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res.json({
        success: true,
        message: "User has already been verified",
      });
    }

    verifyOTPCode(req, res, email, otpCode);

    await db("users").where({ email }).update({
      isVerified: true,
    });

    await db("otps").where({ email }).update({
      isUsed: true,
    });

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default verifyOTP;
