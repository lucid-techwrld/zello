import "dotenv/config";
import axios from "axios";
import db from "../database/database";

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

async function geocodeAddress(address: string) {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address,
          key: GOOGLE_API_KEY,
        },
      }
    );

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      console.error("Geocode failed:", response.data.status, address);
      return null;
    }
  } catch (error) {
    console.error("Error fetching geocode:", error, address);
    return null;
  }
}

async function run() {
  const properties = await db("properties")
    .whereNull("latitude")
    .orWhereNull("longitude");

  for (const property of properties) {
    const fullAddress = `${property.street}, ${property.city}, ${property.state} `;

    console.log("Geocoding:", fullAddress);

    const coords = await geocodeAddress(fullAddress);

    if (coords) {
      await db("properties").where("id", property.id).update({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      console.log("✅ Updated:", property.id, coords);
    } else {
      console.log("❌ Skipped:", property.id);
    }

    // prevent hitting rate limit
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log("🎉 Geocoding finished");
  process.exit(0);
}

run();
