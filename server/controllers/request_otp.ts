import { Request, Response } from "express";
import db from "../database/database";
import generateOTP from "../helpers/generakeOTP";
import sendOTP from "../helpers/sendOTP";

const requestOTP = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }
  try {
    const user = await db("users").where({ email }).first();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const generatedOTP = (await generateOTP(email)) as string;
    await sendOTP(email, generatedOTP);

    return res
      .status(200)
      .json({ success: true, message: "OTP verification sent succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong please try again later",
    });
  }
};

export default requestOTP;
