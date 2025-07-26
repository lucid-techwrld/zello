import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import db from "../database/database";
import generateToken from "../helpers/generateToken";
import generateOTP from "../helpers/generakeOTP";
import sendOTP from "../helpers/sendOTP";
import sendCookie from "../helpers/sendCookie";

interface CustomLoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

const loginUser = async (req: CustomLoginRequest, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }
  try {
    const user = await db("users").where({ email }).first();
    if (!user) {
      res.status(404).json({ message: "User does not exist" });
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).json({ error: "Email or password is incorrect" });
    }

    if (!user.isVerified) {
      const generatedOTP = (await generateOTP(user.email)) as string;
      await sendOTP(user.email, generatedOTP);

      return res.status(200).json({
        success: true,
        message: "OTP Verification has been sent to your email",
      });
    }

    const userInfo = await db("users")
      .join("user_info", "users.id", "user_info.user_id")
      .select("users.id", "users.email", "user_info.role")
      .where("users.id", user.id)
      .first();

    if (!userInfo) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const token = generateToken(userInfo);
    sendCookie(req, res, token);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

const logOUt = async (req: Request, res: Response) => {
  try {
    res.clearCookie("userId", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Something went wrong while logging out." });
  }
};
export { loginUser, logOUt };
