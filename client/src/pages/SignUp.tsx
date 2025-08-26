import { KeySquareIcon, MailIcon, Loader } from "lucide-react";
import logo from "../assets/icons/zello logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useUserStore from "../hooks/useUserStore";
import { UserSchema } from "../utils/zod";
import ErrorMessages from "../components/ErrorMessages";

const Signup = () => {
  const navigate = useNavigate();
  const createUser = useUserStore((state) => state.createUser);
  const loading = useUserStore((state) => state.loading.SignUp);
  const [error, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const result = UserSchema.safeParse({
      email: data.email as string,
      password: data.psw as string,
    });
    if (!result.success) {
      console.log(result);
      setErrors(result.error.issues.map((err) => err.message));

      setTimeout(() => {
        setErrors([]);
      }, 3000);
      return;
    }
    setErrors([]);

    const res = await createUser({
      email: data.email as string,
      password: data.psw as string,
    });
    if (!res || !res.success) {
      const message =
        typeof res === "object" && res !== null
          ? res.message
          : "Failed to create account. Please try again.";
      console.log("1", message);
      setErrors([message]);

      form.reset();
      setTimeout(() => {
        setErrors([]);
      }, 3000);
      return;
    }
    navigate(`/auth/otp/${res.res?.email}`);

    form.reset();
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <ErrorMessages messages={error} />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <div className="w-full flex justify-center">
          <img src={logo} alt="zello logo" className="w-44 h-44" />
        </div>

        <h1 className="text-center text-3xl font-bold mt-4 text-black">
          Sign Up
        </h1>

        <div className="relative">
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            autoComplete="email"
            className="w-full h-12 bg-gray-100 rounded-md pl-4 pr-10 outline-blue-500 text-black"
          />
          <MailIcon className="absolute top-3 right-3 w-5 h-5 text-gray-500" />
        </div>

        <div className="relative">
          <input
            type="password"
            name="psw"
            required
            placeholder="Password"
            autoComplete="new-password"
            className="w-full h-12 bg-gray-100 rounded-md pl-4 pr-10 outline-blue-500 text-black"
          />
          <KeySquareIcon className="absolute top-3 right-3 w-5 h-5 text-gray-500" />
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-md bg-blue-600 text-white font-semibold flex items-center justify-center hover:bg-blue-700 transition"
        >
          {loading ? (
            <Loader className="w-6 h-6 animate-spin" aria-label="loading" />
          ) : (
            "Create Account"
          )}
        </button>

        <div className="flex items-center justify-between">
          <div className="w-full border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          className="w-full h-12 flex items-center justify-center gap-3 rounded-md border border-gray-400 bg-white hover:bg-gray-50 transition"
        >
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
