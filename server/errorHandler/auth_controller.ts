import { Request, Response } from "express";

interface create_user_body {
  email: string;
  password: string;
  username: string;
}

const create_user = async (
  req: Request<{}, {}, create_user_body>,
  res: Response
) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ success: false, message: "All filed are required" });
  }
  try {
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong please try again later",
      });
  }
};
