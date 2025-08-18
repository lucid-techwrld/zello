import illustrator from "../assets/icons/16180.jpg";
import { ArrowLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Success from "../components/Success";
import extractAxiosErrorMessage from "../components/extractError";
import API from "../utils/axiosInstance";
const RequestOTP = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [displayToast, setDisplay] = useState<boolean>(false);
  const getOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await API.post(
        `verify/request-otp`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        throw new Error("Failed to request OTP");
      }
      console.log("OTP requested successfully:", res.data);
      setDisplay(true);

      setTimeout(() => {
        setDisplay(false);
        navigate(`/auth/forgot-password/${email}`);
      }, 3000);
    } catch (error) {
      const message = extractAxiosErrorMessage(error);

      console.log("Login Error:", message);
    } finally {
      setEmail("");
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
      <p className="text-gray-600 mt-4">
        Please enter your email address to receive an OTP.
      </p>

      <form
        onSubmit={(e) => getOTP(e)}
        className="w-full h-full max-w-md mt-4 flex flex-col items-center space-y-10 px-5"
      >
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full h-16 bg-gray-200 border-none p-3 rounded-md"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="flex justify-center items-center w-full h-16 gradient-extra rounded-full font-bold text-white mt-8"
        >
          {loading ? (
            <Loader className="w-6 h-6 animate-spin text-white" />
          ) : (
            "Get OTP"
          )}
        </button>
      </form>
      {displayToast && (
        <Success
          message="OTP Sent Succesfully"
          subText="OTP code has been sent to the provided email, please check inbox to continue verification"
        />
      )}
    </div>
  );
};

export default RequestOTP;
