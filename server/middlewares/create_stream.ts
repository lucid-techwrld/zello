// middlewares/createStreamUser.ts
import { Request, Response, NextFunction } from "express";
import { StreamChat } from "stream-chat";

export const createStreamUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const apiKey = process.env.STREAM_API_KEY;
    const apiSecret = process.env.STREAM_API_SECRET;

    if (!apiKey || !apiSecret) {
      console.error("Stream API credentials are not set");
      return next();
    }

    const serverClient = StreamChat.getInstance(apiKey, apiSecret);
    const { id, name } = res.locals.user;
    if (!id || !name) {
      console.warn("User info missing for Stream creation");
      return next();
    }

    await serverClient.upsertUser({
      id: id.toString(),
      name,
    });

    console.log(`✅ Stream user created for userId: ${id}`);
    next();
  } catch (err) {
    console.error("Error creating Stream user:", err);
    next();
  }
};
