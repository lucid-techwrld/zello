import { KeySquareIcon, Loader, MailIcon } from "lucide-react";
import googleIcon from "../assets/icons/google logo.png";
import logo from "../assets/icons/zello logo.png";
import { useNavigate } from "react-router-dom";
import useUserStore from "../hooks/useUserStore";

const Login = () => {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);
  const loading = useUserStore((state) => state.loading.SignIn);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const success = await login({
      email: data.email as string,
      password: data.password as string,
    });

    if (success) navigate("/");
    form.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Zello Logo"
            className="w-28 h-28 object-contain"
          />
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Welcome back
          </h2>

          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full h-12 px-4 pr-10 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MailIcon className="absolute right-3 top-3 w-5 h-5 text-gray-500" />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full h-12 px-4 pr-10 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <KeySquareIcon className="absolute right-3 top-3 w-5 h-5 text-gray-500" />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/auth/request-otp")}
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md flex items-center justify-center transition"
          >
            {loading ? <Loader className="w-5 h-5 animate-spin" /> : "Login"}
          </button>
        </form>

        <div className="space-y-4">
          <p className="text-center text-sm text-gray-500">or continue with</p>
          <button className="flex items-center justify-center w-full h-12 border border-gray-300 rounded-md bg-white hover:shadow">
            <img src={googleIcon} alt="Google" className="w-14 h-5 mr-2" />
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/auth/join")}
            className="font-semibold text-blue-500 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
