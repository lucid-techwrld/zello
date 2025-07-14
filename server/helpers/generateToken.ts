import jwt, { SignOptions } from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

const generateToken = (user: TokenPayload): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  const options: SignOptions = {
    expiresIn: "1d",
  };

  const token = jwt.sign(user, secret, options);
  return token;
};

export default generateToken;
