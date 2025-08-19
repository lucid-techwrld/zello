import { Request, Response } from "express";
import db from "../database/database";
import redis from "../utils/redis";

interface CustomRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}
const getProfile = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please login and try again" });
  }
  const cacheKey = `profile:${userId}`;

  try {
    const cachedProfile = await redis.get(cacheKey);
    if (cachedProfile) {
      console.log("Profile Cached Hit Sucessfylly");
      return res.json({ success: true, profile: JSON.parse(cachedProfile) });
    }
  } catch (error) {
    console.error("Redis Profile cache error:", error);
  }
  try {
    const profile = await db("users")
      .join("user_info", "users.id", "user_info.user_id")
      .join("user_address", "users.id", "user_address.user_id")
      .select(
        "users.id",
        "users.email",
        "users.avatar",
        "users.isVerified",
        "user_info.first_name",
        "user_info.last_name",
        "user_info.role",
        "user_info.dob",
        "user_address.street",
        "user_address.city",
        "user_address.state",
        "user_address.country"
      )
      .where("users.id", userId)
      .first();

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    try {
      await redis.set(cacheKey, JSON.stringify(profile), "EX", 60 * 5);
      console.log("Profile Cached Sucessfylly");
    } catch (cacheError) {
      console.log("❌ Redis error (set):", cacheError);
    }

    return res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getProfile;
