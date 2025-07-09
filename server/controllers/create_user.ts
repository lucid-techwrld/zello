import db from "../database/database";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

interface CustomUserRequest extends Request {
  body: {
    email: string;
    password: string;
    avatar?: string;
  };
}

const createUser = async (req: CustomUserRequest, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }
  try {
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
    };

    const [user] = await db("users")
      .insert(newUser)
      .returning(["id", "email", "avatar"]);
    res.status(201).json({
      id: user.id,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

interface CustomLoginReq extends Request {
  body: {
    email: string;
    password: string;
  };
}

const loginUser = async (req: CustomLoginReq, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }
  try {
    const [user] = await db("user").where({ email }).first();
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" });
    }

    const correctPassword = bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.json({
        success: false,
        message: "Email or password is incorrect",
      });
    }
  } catch (error) {}
};

type addressParams = {
  street: string;
  city: string;
  state: string;
  country: string;
};

interface CustomUserDeatilsRequest extends Request {
  body: {
    role: string;
    firstName: string;
    lastName: string;
    address: addressParams;
    dob: string;
    userId: string;
  };
}
const addUserDetails = async (req: CustomUserDeatilsRequest, res: Response) => {
  const { role, firstName, lastName, address, dob, userId } = req.body;
  if (!role || !firstName || !lastName || !address || !dob || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "All field are required" });
  }

  try {
    const userExist = await db("users").where("userId").first();
    if (!userExist) {
      return res.status(409).json({
        success: false,
        message: "Create and account and try again later",
      });
    }
    const userInfo = {
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      dob,
      role,
    };

    const { street, city, state, country } = address;
    const addressInfo = {
      street,
      city,
      state,
      country,
    };

    const [userAddress] = await db("user_address")
      .insert(addressInfo)
      .returning("*");
    const [userDetails] = await db("user_info").insert(userInfo).returning("*");

    res.status(401).json({
      success: true,
      message: "User details addedd successfully!",
      userDetails,
      userAddress,
    });
  } catch (error) {}
};

export { createUser, addUserDetails };
