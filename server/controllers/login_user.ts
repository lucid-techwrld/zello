import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import db from "../database/database";
import generateToken from "../helpers/generateToken";
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
      res.status(409).json({ message: "User does not exist" });
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).json({ error: "Email or password is incorrect" });
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

export { loginUser };
