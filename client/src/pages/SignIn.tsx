import { KeySquareIcon, MailIcon, User } from "lucide-react";
import googleIcon from "../assets/icons/google icon.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState<string[]>(["Rent/Buy"]);

  const handleItemFilter = (item: string): void => {
    if (selectedItems.includes(item)) {
      const newSelect = selectedItems.filter((prod: string) => prod !== item);
      setSelectedItems(newSelect);
    } else {
      setSelectedItems((prevItem) => [...prevItem, item]);
    }
  };

  const option: string[] = ["Rent/Buy", "Sell"];
  return (
    <div className="w-full full flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-center mb-10">Zello</h1>

      <p className="mb-4">What are you Zello for?</p>
      <div className="flex gap-2 ">
        {option.map((item, index) => (
          <div
            className={`px-5 py-4 ${
              selectedItems.includes(item)
                ? "gradient text-white "
                : "bg-gray-100 rounded-md text-gray-600"
            }`}
            key={index}
            onClick={() => handleItemFilter(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <form className="w-full h-full p-4 space-y-5 ">
        <p className="text-center font-bold text-2xl">Sign Up</p>
        <div className="relative">
          <input
            type="text"
            name="user"
            id="user"
            placeholder="Username"
            className="w-full h-10 bg-gray-200 rounded-md p-3 outline-blue-500"
          />
          <User className="absolute top-2 right-3 w-5 h-5" />
        </div>
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
          Get Started
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <span className="font-bold" onClick={() => navigate("/auth/login")}>
            Login
          </span>
        </p>
      </form>

      <div className="w-full h-full p-3">
        <p className="text-center">continue with google </p>
        <button className="mt-5 border-2 border-black w-full h-10 font-bold  hover:border-4">
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

export default SignIn;
