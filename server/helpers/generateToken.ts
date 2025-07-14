import jwt, { SignOptions } from "jsonwebtoken";

const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  const options: SignOptions = {
    expiresIn: "1d",
  };

  const token = jwt.sign({ userId }, secret, options);
  return token;
};

export default generateToken;
