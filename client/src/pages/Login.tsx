import { KeySquareIcon, MailIcon } from "lucide-react";
import googleIcon from "../assets/icons/google logo.png";
import logo from "../assets/icons/zello logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pt-10">
      <div className="w-full h-auto px-20">
        <img src={logo} alt="zello logo" className="w-full h-full" />
      </div>

      <form className="w-full h-full p-4 space-y-5">
        <p className="text-center font-bold text-2xl">Login</p>
        <div className="relative">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full h-12 bg-gray-200 rounded-md p-3 outline-blue-500"
          />
          <MailIcon className="absolute top-2 right-3 w-5 h-5" />
        </div>
        <div className="relative">
          <input
            type="password"
            name="psw"
            id="psw"
            placeholder="Password"
            className="w-full h-12 bg-gray-200 rounded-md p-3 outline-blue-500"
          />
          <KeySquareIcon className="absolute top-2 right-3 w-5 h-5" />
        </div>
        <button
          type="submit"
          className="w-full h-12 gradient font-bold text-white"
        >
          Login
        </button>
      </form>

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
        Dont't have an account?{" "}
        <span className="font-bold" onClick={() => navigate("/auth/join")}>
          SignUp
        </span>
      </p>
    </div>
  );
};

export default Login;
