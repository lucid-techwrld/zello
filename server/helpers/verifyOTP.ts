import db from "../database/database";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

const verifyOTPCode = async (
  req: Request,
  res: Response,
  email: string,
  otpCode: string
) => {
  type OTPRemaining = {
    remaining_time: number;
    otp_code: string;
  };

  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong please try again later",
    });
  }
};

export default verifyOTPCode;
