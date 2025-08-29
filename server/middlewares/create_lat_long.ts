import axios from "axios";
import { Request, Response, NextFunction } from "express";

const geocodeAddress = async (
  res: Response,
  req: Request,
  next: NextFunction
) => {
  try {
    const { street, city, state } = req.body;

    if (!(street || city || state)) {
      res
        .status(400)
        .json({ success: false, message: "Please provide full address" });
      return;
    }

    const fullAddress = `${street}, ${city}, ${state}, Nigeria`;

    const geoRes = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: fullAddress,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      }
    );

    if (!geoRes.data.results.length) {
      return res.status(400).json({ error: "Invalid address provided" });
    }

    const location = geoRes.data.results[0].geometry.location;

    req.body.latitude = location.lat;
    req.body.longitude = location.lng;

    next();
  } catch (error) {
    console.error("Geocoding failed:", error);
    res.status(500).json({ error: "Failed to geocode address" });
  }
};

export default geocodeAddress;
