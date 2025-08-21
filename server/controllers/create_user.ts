import db from "../database/database";
import bcrypt from "bcryptjs";
import generateOTP from "../helpers/generakeOTP";
import sendOTP from "../helpers/sendOTP";
import { Request, Response, NextFunction } from "express";

interface CustomUserRequest extends Request {
  body: {
    email: string;
    password: string;
    avatar?: string;
  };
}

const createUser = async (
  req: CustomUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }
  try {
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
    };

    const [user] = await db("users")
      .insert(newUser)
      .returning(["id", "email", "avatar"]);

    const generatedOTP = (await generateOTP(user.email)) as string;
    await sendOTP(user.email, generatedOTP);
    res.locals.user = {
      id: user.id,
      name:
        `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() ||
        user.email,
    };
    res.status(201).json({
      id: user.id,
      email: user.email,
      avatar: user.avatar,
      message: `OTP sent succesfully to ${user.email}. Check inbox`,
    });
    next();
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

type addressParams = {
  street: string;
  city: string;
  state: string;
  country: string;
};

interface CustomUserDetailsRequest extends Request {
  body: {
    role: string;
    firstName: string;
    lastName: string;
    address: addressParams;
    dob: string;
    userId: string;
  };
}

const addUserDetails = async (req: CustomUserDetailsRequest, res: Response) => {
  const { role, firstName, lastName, address, dob, userId } = req.body;

  if (!role || !firstName || !lastName || !address || !dob || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const userExists = await db("users").where({ id: userId }).first();

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    const existingInfo = await db("user_info")
      .where({ user_id: userId })
      .first();
    const existingAddress = await db("user_address")
      .where({ user_id: userId })
      .first();

    if (existingInfo || existingAddress) {
      return res.status(409).json({
        success: false,
        message: "User details already exist. Update instead.",
      });
    }

    const parsedDob = new Date(dob);
    if (isNaN(parsedDob.getTime())) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid DOB format" });
    }

    const userInfo = {
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      dob: parsedDob,
      role,
    };

    const userAddress = {
      user_id: userId,
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
    };

    const [insertedInfo] = await db("user_info")
      .insert(userInfo)
      .returning("*");
    const [insertedAddress] = await db("user_address")
      .insert(userAddress)
      .returning("*");

    return res.status(201).json({
      success: true,
      message: "User details added successfully!",
      user: {
        ...insertedInfo,
        address: insertedAddress,
      },
    });
  } catch (error) {
    console.error("Error adding user details:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export { createUser, addUserDetails };
