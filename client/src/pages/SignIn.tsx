import { KeySquareIcon, MailIcon } from "lucide-react";
import googleIcon from "../assets/icons/google logo.png";
import logo from "../assets/icons/zello logo.png";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full ">
      <form
        className="w-full h-full p-4 space-y-5 flex flex-col justify-center items-center"
        onSubmit={() => navigate("/auth/join/info")}
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
            className="w-full h-12 bg-gray-200 rounded-md p-3 outline-blue-500"
          />
          <KeySquareIcon className="absolute top-2 right-3 w-5 h-5" />
        </div>
        <button
          type="submit"
          className="w-full h-12 gradient font-bold text-white"
        >
          Get Started
        </button>

        <div className="w-full h-full p-3">
          <p className="text-center">or continue with google </p>
          <button className="mt-5 rounded-md border-2 border-black w-full h-12 font-bold  hover:bg-white bg-black p-2">
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
