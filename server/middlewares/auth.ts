import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: any;
}

const verifyUser = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.userId;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized. Token missing." });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res
      .status(500)
      .json({ success: false, message: "JWT secret not configured." });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token." });
  }
};

export default verifyUser;
