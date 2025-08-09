import { Request, Response } from "express";
import db from "../database/database";
import redis from "../utils/redis";

interface CustomePropertiesRequest extends Request {
  query: {
    page?: string;
    limit?: string;
  };
}

const getProperties = async (req: CustomePropertiesRequest, res: Response) => {
  const page = Math.max(1, parseInt(req.query.page || "1", 10));
  const limit = Math.max(1, parseInt(req.query.limit || "10", 10));
  const offset = (page - 1) * limit;

  const cacheKey = `properties:page=${page}:limit=${limit}`;

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      try {
        return res.json(JSON.parse(cachedData));
      } catch (parseErr) {
        console.error("Error parsing cached properties data:", parseErr);
      }
    }

    const properties = await db("properties")
      .select("*")
      .offset(offset)
      .limit(limit);

    const total = await db("properties").count("id as count").first();

    const response = {
      success: true,
      properties,
      pagination: {
        page,
        limit,
        total: Number(total?.count),
        totalPages: Math.ceil(Number(total?.count) / limit),
      },
    };

    try {
      await redis.set(cacheKey, JSON.stringify(response), "EX", 60 * 5);
    } catch (cacheError) {
      console.log("❌ Redis error (set):", cacheError);
    }

    res.json(response);
  } catch (error) {
    console.error("getProperties error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
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

  const cacheKey = `property:${propId}`;

  try {
    const cachedResponse = await redis.get(cacheKey);
    if (cachedResponse) {
      try {
        return res.json({ success: true, results: JSON.parse(cachedResponse) });
      } catch (error) {
        await redis.del(cacheKey);
        console.error("Error parsing cached property data:", error);
      }
    }

    const property = await db("properties").where({ id: propId }).first();
    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    try {
      await redis.set(cacheKey, JSON.stringify(property), "EX", 60 * 5);
    } catch (cacheError) {
      console.log("❌ Redis error (set):", cacheError);
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
    const cacheKey = `search:${search}`;
    const cachedResults = await redis.get(cacheKey);
    if (cachedResults) {
      try {
        return res.json({ success: true, results: JSON.parse(cachedResults) });
      } catch (error) {
        console.error("Error parsing cached search results:", error);
      }
    }
    const results = await db("properties")
      .select("*")
      .whereRaw(`search_vector @@ plainto_tsquery('english', ?)`, [search])
      .orderByRaw(
        `ts_rank(search_vector, plainto_tsquery('english', ?)) DESC`,
        [search]
      );

    try {
      await redis.set(cacheKey, JSON.stringify(results), "EX", 60 * 5);
    } catch (cacheError) {
      console.log("❌Redis error (set):", cacheError);
    }

    return res.status(200).json({ success: true, results });
  } catch (error) {
    console.error("Search failed:", error);
    return res.status(500).json({ success: false, message: "Search failed" });
  }
};

interface CustomLeaseUserRequest extends Request {
  query: {
    cursor?: string;
    limit?: string;
  };
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

const getUserProperties = async (
  req: CustomLeaseUserRequest,
  res: Response
) => {
  const userId = req.user?.id;
  const role = req.user?.role;
  const limit = Math.max(1, parseInt(req.query.limit || "10", 10)); // default to 10
  const cursor = req.query.cursor?.trim();

  if (!userId || !role) {
    return res
      .status(400)
      .json({ success: false, message: "Please login and try again" });
  }

  const isValidUUID = (str: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      str
    );

  const cacheKey = `leaseUserP:cursor=${cursor || "start"}:limit=${limit}`;
  const cachedResults = await redis.get(cacheKey);
  if (cachedResults) {
    try {
      return res.status(200).json(JSON.parse(cachedResults));
    } catch (error) {
      console.log("Error parsing cached lease user properties", error);
    }
  }

  try {
    const user = await db("users").where({ id: userId }).first();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found, Please create an account and try again",
      });
    }

    if (role !== "lease") {
      return res.status(401).json({
        success: false,
        message: "User with the role of rent cannot access this route",
      });
    }

    let query = db("properties")
      .select("*")
      .where({ user_id: userId })
      .orderBy("id", "asc")
      .limit(limit + 1);

    if (cursor && isValidUUID(cursor)) {
      query = query.andWhere("id", ">", cursor);
    }

    const properties = await query;

    let nextCursor: string | null = null;
    if (properties.length > limit) {
      const nextItem = properties.pop();
      nextCursor = nextItem?.id || null;
    }

    const response = {
      success: true,
      properties,
      nextCursor,
    };

    try {
      await redis.set(cacheKey, JSON.stringify(response), "EX", 60 * 5);
    } catch (error) {
      console.error("Error caching lease user properties", error);
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching user properties", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again later",
    });
  }
};

export { getProperties, getProperty, searchProperties, getUserProperties };
