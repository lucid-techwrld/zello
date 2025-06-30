import { KeySquareIcon, MailIcon } from "lucide-react";
import googleIcon from "../assets/icons/google icon.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pt-10">
      <h1 className="text-4xl font-bold ">Zello</h1>
      <p className="mt-5 text-3xl mb-20">Welcome Back</p>

      <form className="w-full h-full p-4 space-y-5">
        <div className="relative">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full h-10 bg-gray-200 rounded-md p-3 outline-blue-500"
          />
          <MailIcon className="absolute top-2 right-3 w-5 h-5" />
        </div>
        <div className="relative">
          <input
            type="password"
            name="psw"
            id="psw"
            placeholder="Password"
            className="w-full h-10 bg-gray-200 rounded-md p-3 outline-blue-500"
          />
          <KeySquareIcon className="absolute top-2 right-3 w-5 h-5" />
        </div>
        <button
          type="submit"
          className="w-full h-10 gradient font-bold text-white"
        >
          Login
        </button>
        <p className="text-center">
          Dont't have an account?{" "}
          <span className="font-bold" onClick={() => navigate("/auth/join")}>
            SignUp
          </span>
        </p>
      </form>

      <div className="w-full h-full p-3">
        <p className="text-center">continue with google </p>
        <button className="mt-10 border-2 border-black w-full h-10 font-bold  hover:border-4">
          <img
            src={googleIcon}
            alt="google"
            className="w-full h-full object-contain"
          />
        </button>
      </div>
    </div>
  );
};

export default Login;
