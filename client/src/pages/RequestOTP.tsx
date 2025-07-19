import illustrator from "../assets/icons/16180.jpg";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RequestOTP = () => {
  const navigate = useNavigate();
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

      <form className="w-full h-full max-w-md mt-4 flex flex-col items-center space-y-10 px-5">
        <input
          type="text"
          placeholder="Enter your email address"
          className="w-full h-16 bg-gray-200 border-none p-3 rounded-md"
        />
        <button
          type="submit"
          className="w-full h-16 gradient-extra rounded-full font-bold text-white mt-8"
        >
          Get OTP
        </button>
      </form>
    </div>
  );
};

export default RequestOTP;
