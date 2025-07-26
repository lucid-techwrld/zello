import { Request, Response } from "express";
import db from "../database/database";
import { uploadImage, deleteUploadedImage } from "./upload_image";

interface CustomPropertyRequest extends Request {
  body: {
    title: string;
    description: string;
    type: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    street: string;
    city: string;
    state: string;
  };

  user?: {
    id: string;
    email: string;
    role: string;
  };
}

let imageURLS: any;

const addProperty = async (req: CustomPropertyRequest, res: Response) => {
  const {
    title,
    description,
    type,
    price,
    bedrooms,
    bathrooms,
    street,
    city,
    state,
  } = req.body;

  const images = req.files as Express.Multer.File[];

  const userId = req.user?.id;
  const role = req.user?.role;

  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "Please login and try again" });
  }

  if (role !== "lease") {
    return res.status(401).json({
      success: false,
      message: "User with the role of rent cannot access this route",
    });
  }
  if (
    !title ||
    !description ||
    !type ||
    !price ||
    !bedrooms ||
    !bathrooms ||
    !street ||
    !city ||
    !state
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All field are required" });
  }

  try {
    const user = await db("users").where({ id: userId }).first();

    if (!user) {
      return res.json({
        success: false,
        message: "Please create and account and try again later",
      });
    }

    imageURLS = await uploadImage(images);

    const property = {
      user_id: userId,
      title,
      description,
      type,
      price,
      bedrooms,
      bathrooms,
      street,
      city,
      state,
      images: JSON.stringify(imageURLS?.urls),
    };

    const [addedProperty] = await db("properties")
      .insert(property)
      .returning("*");

    if (!addedProperty) {
      await deleteUploadedImage(imageURLS.publicIds);
      return res.status(500).json({
        success: false,
        message: "Failed to save property. Images have been deleted.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Property uploaded successfully",
      addedProperty,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong please try again later",
    });
  }
};

export default addProperty;
