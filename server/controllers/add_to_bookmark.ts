import db from "../database/database";
import { Request, Response } from "express";

interface CustomPropertyRequest extends Request {
  body: {
    id: string;
    title: string;
    description: string;
    type: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    street: string;
    city: string;
    state: string;
    images: string[];
  };

  user?: {
    id: string;
    email: string;
    role: string;
  };
}

const addBookMark = async (req: CustomPropertyRequest, res: Response) => {
  const userId = req.user?.id;

  const {
    images,
    title,
    description,
    price,
    bedrooms,
    bathrooms,
    state,
    street,
    city,
    type,
    id,
  } = req.body;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please login and try again" });
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
    !state ||
    !images ||
    !id
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All field are required" });
  }

  try {
    const user = await db("users").where({ id: userId }).first();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exists" });
    }

    const existBookMark = await db("bookmarks")
      .where({ user_id: userId })
      .andWhere({ property_id: id })
      .first();
    if (existBookMark) {
      return res.status(400).json({
        success: false,
        message: "Property already exists in BookMark",
      });
    }
    const bookmarkProperties = {
      property_id: id,
      title,
      description,
      type,
      price,
      bedrooms,
      bathrooms,
      images: JSON.stringify(images),
      street,
      city,
      state,
      user_id: userId,
    };

    const bookmark = await db("bookmarks")
      .insert(bookmarkProperties)
      .returning("*");

    console.log("id", id, "savedid", bookmark);
    res.status(200).json({
      success: true,
      message: "Property Bookmarked successfully",
      bookmark,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again later",
    });
  }
};

interface CustomGetBookmarkRequest extends Request {
  query: {
    page?: string;
    limit?: string;
  };
  user?: {
    id: string;
  };
}
const getBookMarks = async (req: CustomGetBookmarkRequest, res: Response) => {
  const userId = req.user?.id;
  const page = Math.max(1, parseInt(req.query.page || "1", 10));
  const limit = Math.max(1, parseInt(req.query.limit || "10", 10));

  const offset = (page - 1) * limit;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please login and try again" });
  }

  try {
    const user = await db("users").where({ id: userId }).first();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exists" });
    }

    const bookmarks = await db("bookmarks")
      .select("*")
      .where({ user_id: userId })
      .offset(offset)
      .limit(limit);

    const total = await db("bookmarks")
      .where({ user_id: userId })
      .count("id as count")
      .first();

    res.status(200).json({
      success: true,
      message: "Bookmarks fecthed succesfully",
      bookmarks,
      pagination: {
        page,
        limit,
        total: Number(total?.count),
        totalPages: Math.ceil(Number(total?.count) / limit),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again later",
    });
  }
};

interface CustomDeleteRequest extends Request {
  query: {
    id: string;
  };
  user?: {
    id: string;
  };
}

const deleteBookMark = async (req: CustomDeleteRequest, res: Response) => {
  const userId = req.user?.id;
  const propertyId = req.query.id;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please login and try again" });
  }
  if (
    !propertyId ||
    typeof propertyId !== "string" ||
    propertyId.trim() === ""
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or missing property ID" });
  }

  try {
    const user = await db("users").where({ id: userId }).first();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exists" });
    }

    //console.log(propertyId);
    console.log("Deleting property:", propertyId, "for user:", userId);
    const deleted = await db("bookmarks")
      .where({ property_id: propertyId, user_id: userId })
      .delete();
    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        message: "Bookmark not found or already deleted",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "property deledted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again later",
    });
  }
};

export { addBookMark, getBookMarks, deleteBookMark };
