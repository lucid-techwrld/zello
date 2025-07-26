import { Request, Response } from "express";
import db from "../database/database";

const getProperties = async (req: Request, res: Response) => {
  try {
    const properties = await db("properties").select("*");
    res.json({ success: true, properties });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again later",
    });
  }
};

interface CustomerGetPropertyRequest extends Request {
  query: {
    propertyId?: string;
  };
}

const getProperty = async (req: CustomerGetPropertyRequest, res: Response) => {
  const propId = req.query?.propertyId;
  if (!propId) {
    return res
      .status(400)
      .json({ success: false, message: "Property id not provided" });
  }
  try {
    const property = await db("properties").where({ id: propId }).first();
    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res.status(200).json({ success: true, property });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again later",
    });
  }
};

const searchProperties = async (req: Request, res: Response) => {
  const search = req.query.q as string;

  if (!search) {
    return res
      .status(400)
      .json({ success: false, message: "Search query is required" });
  }

  try {
    const results = await db("properties")
      .select("*")
      .whereRaw(`search_vector @@ plainto_tsquery('english', ?)`, [search])
      .orderByRaw(
        `ts_rank(search_vector, plainto_tsquery('english', ?)) DESC`,
        [search]
      );

    return res.status(200).json({ success: true, results });
  } catch (error) {
    console.error("Search failed:", error);
    return res.status(500).json({ success: false, message: "Search failed" });
  }
};

export { getProperties, getProperty, searchProperties };
