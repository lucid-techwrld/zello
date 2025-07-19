import axios from "axios";
import illustrator from "../assets/icons/16180.jpg";
import { ArrowLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";

const OtpPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { email } = useParams<{ email: string }>();
  if (!email) {
    navigate("/");
    return null;
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = (e.target as HTMLFormElement).otp.value;

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:5000/verify/otp`,
        { email, otpCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        throw new Error("Failed to verify OTP");
      }
      console.log("OTP verified successfully:", res.data);
      navigate("/auth/join/info/" + res.data.id);
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      if (error instanceof Error) {
        message = error.message;
      }

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response === "object"
      ) {
        const err = error as any;
        message =
          err.response?.data?.message || err.response?.data?.error || message;
      }

      console.log("OTP Verification Error:", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center  min-h-screen">
      <ArrowLeft
        className="w-6 h-6 absolute top-5 left-3"
        onClick={() => navigate(-1)}
      />
      <div className="w-80 h-80">
        <img src={illustrator} alt="illus" />
      </div>
      <h1 className="text-3xl font-bold">OTP Verification</h1>
      <p className="text-gray-600 mt-4 text-center">
        Please enter your one-time password (OTP) to continue.
      </p>

      <form
        onSubmit={(e) => handleVerify(e)}
        className="w-full h-full max-w-md mt-4 flex flex-col items-center space-y-10 px-5"
      >
        <input
          type="text"
          placeholder="Enter your OTP"
          name="otp"
          className="w-full h-16 bg-gray-200 border-none p-3 rounded-md"
          maxLength={4}
        />
        <button
          type="submit"
          className="w-full h-16 gradient-extra rounded-full font-bold text-white mt-8"
        >
          {loading ? (
            <Loader className="text-white w-6 h-6 animate-spin" />
          ) : (
            "Verify"
          )}
        </button>
      </form>
    </div>
  );
};

export default OtpPage;
