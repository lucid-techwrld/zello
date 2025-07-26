import { url } from "inspector";
import cloudinary from "../config/cloudinary";

const uploadImage = async (files: Express.Multer.File[]) => {
  try {
    type UploadResult = {
      urls: string[];
      publicIds: string[];
    };

    const uploads: UploadResult = {
      urls: [],
      publicIds: [],
    };

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "property-images",
      });
      uploads.urls.push(result.secure_url);
      uploads.publicIds.push(result.public_id);
    }
    return uploads;
  } catch (error) {
    console.log(error);
  }
};

const deleteUploadedImage = async (publicIds: string[]) => {
  try {
    if (!publicIds || !publicIds.length) return;

    const deletePromises = publicIds.map((publicId) =>
      cloudinary.uploader.destroy(publicId)
    );

    const results = await Promise.all(deletePromises);

    results.forEach((result, i) => {
      if (result.result === "ok") {
        console.log(`✅ Deleted ${publicIds[i]}`);
      } else {
        console.warn(` Failed to delete ${publicIds[i]}`, result);
      }
    });
  } catch (error) {
    console.error("Error deleting images:", publicIds, error);
  }
};

export { uploadImage, deleteUploadedImage };
