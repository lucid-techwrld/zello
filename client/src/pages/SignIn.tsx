import { KeySquareIcon, MailIcon } from "lucide-react";
import googleIcon from "../assets/icons/google logo.png";
import logo from "../assets/icons/zello logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const hanldeSbumit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).psw.value;

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/register",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.status !== 201) {
        throw new Error("Failed to create user");
      }
      console.log("User created successfully:", res.data);
      navigate("/auth/otp");
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

      console.log("Login Error:", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full ">
      <form
        className="w-full h-full p-4 space-y-5 flex flex-col justify-center items-center"
        onSubmit={(e) => hanldeSbumit(e)}
      >
        <div className="w-full h-auto px-20 mt-5">
          <img src={logo} alt="zello logo" className="w-full h-full" />
        </div>

        <p className="text-center font-bold text-4xl mt-10">Create Account</p>
        <div className="relative w-full">
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            placeholder="Email"
            className="w-full h-10 bg-gray-200 rounded-md p-3 outline-blue-500"
          />
          <MailIcon className="absolute top-2 right-3 w-5 h-5" />
        </div>
        <div className="relative w-full">
          <input
            type="password"
            name="psw"
            id="psw"
            required
            placeholder="Password"
            autoComplete="current-password"
            className="w-full h-12 bg-gray-200 rounded-md p-3 outline-blue-500"
          />
          <KeySquareIcon className="absolute top-2 right-3 w-5 h-5" />
        </div>
        <button
          type="submit"
          className="w-full h-12 gradient font-bold text-white"
        >
          {loading ? (
            <Loader className="text-white w-7 h-7 animate-spin" />
          ) : (
            "Get Started"
          )}
        </button>

        <div className="w-full h-full p-3">
          <p className="text-center">or continue with google </p>
          <button
            type="button"
            className="mt-5 rounded-md border-2 border-black w-full h-12 font-bold  hover:bg-white bg-black p-2"
          >
            <img
              src={googleIcon}
              alt="google"
              className="w-full h-full object-contain"
            />
          </button>
        </div>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <span className="font-bold" onClick={() => navigate("/auth/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
