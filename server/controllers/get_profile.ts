import { Request, Response } from "express";
import db from "../database/database";

interface CustomRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}
const getProfile = async (req: CustomRequest, res: Response) => {
  console.log(req.user);
  const userId = req.user?.id;
  console.log("User ID from request:", userId);
  return res.status(200).json({
    success: true,
  });
};

export default getProfile;
