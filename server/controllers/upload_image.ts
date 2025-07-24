import { url } from "inspector";
import cloudinary from "../config/cloudinary";

const uploadImage = async (files: Express.Multer.File[]) => {
  try {
    const urls: string[] = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "property-images",
      });
      urls.push(result.secure_url);
    }
    return urls;
  } catch (error) {
    console.log(error);
  }
};

export default uploadImage;
