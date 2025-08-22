import { Request, Response } from "express";
import { StreamChat } from "stream-chat";

interface CustomRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

const generateStreamToken = (req: CustomRequest, res: Response) => {
  const userId = req.user?.id?.toLowerCase();
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const apiKey = process.env.STREAM_API_KEY;
    const apiSecret = process.env.STREAM_API_SECRET;
    if (!apiKey || !apiSecret) {
      return res
        .status(500)
        .json({ error: "Stream API credentials are not set" });
    }
    const client = StreamChat.getInstance(apiKey, apiSecret);
    const token = client.createToken(userId);
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating Stream token:", error);
    return res.status(500).json({ error: "Failed to generate token" });
  }
};

export default generateStreamToken;
