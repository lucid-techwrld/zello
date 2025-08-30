import extractAxiosErrorMessage from "../components/extractError";
import API from "./axiosInstance";

export async function generateDescription(
  title: string,
  type: string,
  bathrooms: string,
  bedrooms: string,
  price: string
) {
  try {
    const response = await API.post("/ai/generate-description", {
      title,
      type,
      bathrooms,
      bedrooms,
      price,
    });

    if (response.status !== 200) {
      throw new Error("Failed to generate description");
    }
    console.log(response.data);
    return response.data.result;
  } catch (error) {
    console.log(extractAxiosErrorMessage(error));
    return null;
  }
}
