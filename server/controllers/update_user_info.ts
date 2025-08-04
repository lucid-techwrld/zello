import db from "../database/database";
import { Request, Response } from "express";
import redis from "../utils/redis";

interface UpdateUserInfoRequest extends Request {
  body: {
    firstName?: string;
    lastName?: string;
    street?: string;
    city?: string;
    state?: string;
    dob?: string;
  };
  user?: {
    id: string;
  };
}

const updateUserInfo = async (req: UpdateUserInfoRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const { firstName, lastName, street, city, state, dob } = req.body;
  if (!firstName || !lastName || !street || !city || !state || !dob) {
    return res
      .status(400)
      .json({ success: false, message: "No fields to update" });
  }

  try {
    const user = await db("users").where({ id: userId }).first();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const parsedDob = new Date(dob);
    if (isNaN(parsedDob.getTime())) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid DOB format" });
    }
    const updatedUser = await db("user_info")
      .where({ user_id: userId })
      .update({
        first_name: firstName,
        last_name: lastName,
        dob: parsedDob,
      })
      .returning("*");

    const updatedAddress = await db("user_address")
      .where({ user_id: userId })
      .update({
        street: street,
        city: city,
        state: state,
      })
      .returning("*");

    try {
      await redis.del(`profile:${userId}`);
    } catch (error) {
      console.error("Error deleting user from Redis cache:", error);
    }
    return res.status(200).json({
      success: true,
      message: "User information updated successfully",
    });
  } catch (error) {
    console.error("Error updating user info:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export default updateUserInfo;
