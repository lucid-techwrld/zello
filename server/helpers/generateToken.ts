import jwt from "jsonwebtoken";

function generateToken(userId: string) {
  const token = jwt.sign(userId, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
}

export default generateToken;
