import { KeySquareIcon, Loader, MailIcon } from "lucide-react";
import googleIcon from "../assets/icons/google logo.png";
import logo from "../assets/icons/zello logo.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/userContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const success = await login({
      email: data.email as string,
      password: data.password as string,
    });
    if (success) {
      navigate("/");
    }
    form.reset();
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pt-10">
      <div className="w-full h-auto px-20">
        <img src={logo} alt="zello logo" className="w-full h-full" />
      </div>

      <form
        onSubmit={(e) => handleLogin(e)}
        className="w-full h-full p-4 space-y-5"
      >
        <p className="text-center font-bold text-2xl">Login</p>
        <div className="relative">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            className="w-full h-12 bg-gray-200 rounded-md p-3 outline-blue-500"
          />
          <MailIcon className="absolute top-2 right-3 w-5 h-5" />
        </div>
        <div className="relative">
          <input
            type="password"
            name="password"
            id="psw"
            placeholder="Password"
            required
            className="w-full h-12 bg-gray-200 rounded-md p-3 outline-blue-500"
          />
          <KeySquareIcon className="absolute top-2 right-3 w-5 h-5" />
        </div>
        <p
          className="text-blue-500 text-sm cursor-pointer"
          onClick={() => navigate("/auth/request-otp")}
        >
          Forgotten password?
        </p>
        <button
          type="submit"
          className="w-full h-12 gradient font-bold text-white flex justify-center items-center"
        >
          {loading ? (
            <Loader className="w-6 h-6 text-white animate-spin" />
          ) : (
            "Login"
          )}
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
