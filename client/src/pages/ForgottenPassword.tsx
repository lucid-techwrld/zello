import axios from "axios";
import { ArrowLeft, Loader } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Success from "../components/Success";
import extractAxiosErrorMessage from "../components/extractError";

const ForgottenPassword = () => {
  const navigate = useNavigate();
  const { email } = useParams<{ email: string }>();
  if (!email) {
    navigate("/");
    return null;
  }
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [otpCode, setOTP] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [displayToast, setDisplay] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError(true);
      return;
    }

    if (
      otpCode.length > 4 ||
      otpCode.length < 4 ||
      typeof otpCode !== "string"
    ) {
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/auth/reset-password",
        { email, newPassword, otpCode }
      );

      if (res.status !== 200) {
        throw new Error("Fail to reset password");
      }

      setDisplay(true);

      setTimeout(() => {
        setDisplay(false);
        navigate("/");
      }, 3000);

      console.log("Successfully reset password", res.data);
    } catch (error) {
      const message = extractAxiosErrorMessage(error);
      console.log("Login Error:", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen max-w-md flex flex-col p-3 relative">
      <ArrowLeft
        className="absolute top-3 left-3"
        onClick={() => navigate(-1)}
      />
      <div className="w-full mt-10">
        <h1 className="text-3xl font-bold">Create new password</h1>
        <p className="text-md text-gray-500">
          Set your new password so you can login and use zello!
        </p>
      </div>
      <form
        onSubmit={(e) => resetPassword(e)}
        className="w-full h-full space-y-10 mt-3"
      >
        <label htmlFor="password">
          New Password
          <input
            type="password"
            name="newPassword"
            id="password"
            className="w-full h-full border-2 border-gray-300 p-3 rounded-md"
            autoComplete="current-password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>

        <label htmlFor="c-password">
          Confirm Password
          <input
            type="password"
            name="c-password"
            id="c-password"
            className="w-full h-full border-2 border-gray-300 p-3 rounded-md"
            autoComplete="current-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && (
            <p className="text-xs text-red-700 mt-5 mb-3">
              Password does not match, Please try again
            </p>
          )}
        </label>

        <label htmlFor="otpCode" className="">
          <p className="mt-10">
            Enter the OTP Verification number sent to your email
          </p>
          <input
            type="text"
            name="otpCode"
            id="otpCode"
            placeholder="OTP"
            className="w-full h-full border-2 border-gray-300 p-3 rounded-md"
            autoComplete="current-password"
            onChange={(e) => setOTP(e.target.value)}
            maxLength={4}
            required
          />
        </label>
        <button
          type="submit"
          className="h-full w-full gradient-extra  p-3 rounded-full text-white font-bold flex justify-center items-center"
        >
          {loading ? (
            <Loader className="w-6 h-6 animate-spin text-white" />
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
      {displayToast && (
        <Success
          message="Password Changed Succesfully"
          subText="Password updated successfully, you can now log in with your new password"
        />
      )}
    </div>
  );
};

export default ForgottenPassword;
