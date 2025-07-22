import axios from "axios";

const extractAxiosErrorMessage = (error: unknown): string => {
  const defaultMessage = "Something went wrong. Please try again later.";

  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    if (
      responseData &&
      typeof responseData === "object" &&
      ("message" in responseData || "error" in responseData)
    ) {
      const data = responseData as { message?: string; error?: string };
      return data.message || data.error || defaultMessage;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
};

export default extractAxiosErrorMessage;
