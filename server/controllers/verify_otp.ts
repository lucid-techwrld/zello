import db from "../database/database";
import bcrypt from "bcryptjs";
import generateOTP from "../helpers/generakeOTP";
import sendOTP from "../helpers/sendOTP";
import { Request, Response } from "express";

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

    type OTPRemaining = {
      remaining_time: number;
      otp_code: string;
    };

    const otpRecord = await db("otps")
      .select(
        db.raw("EXTRACT(EPOCH FROM (expired_at - NOW())) AS remaining_time"),
        "otp_code"
      )
      .where({
        email,
        isUsed: false,
      })
      .first<OTPRemaining>();

    if (!otpRecord) {
      return res.status(404).json({ error: "OTP not found or expired" });
    }

    const isMatch = await bcrypt.compare(otpCode, otpRecord.otp_code);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid OTP code" });
    }

    if (otpRecord.remaining_time <= 0) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    await db("users").where({ email }).update({
      isVerified: true,
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
