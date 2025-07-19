import db from "../database/database";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import verifyOTPCode from "../helpers/verifyOTP";

interface CustomForgotPasswordRequest extends Request {
  body: {
    email: string;
    newPassword: string;
    otpCode: string;
  };
}

const resetPassword = async (
  req: CustomForgotPasswordRequest,
  res: Response
) => {
  const { email, newPassword, otpCode } = req.body;
  if (!email || !newPassword || !otpCode) {
    return res
      .status(400)
      .json({ error: "Email, old password, and new password are required" });
  }

  try {
    const user = await db("users").where({ email }).first();

    if (!user) {
      return res
        .status(404)
        .json({ success: true, message: "User does not exist" });
    }

    verifyOTPCode(req, res, email, otpCode);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db("users").where({ email }).update({
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ success: true, message: "Password Updated Successfully" });
  } catch (error) {}
};

export default resetPassword;
