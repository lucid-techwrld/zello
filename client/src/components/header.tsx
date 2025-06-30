import { BellDot, User } from "lucide-react";

const Header = () => {
  const date: Date = new Date();
  const now: number = date.getHours();

  const greeting = () => {
    if (now <= 5 && now < 12) {
      return "Morning";
    } else if (now <= 12 && now < 17) {
      return "Afternoon";
    } else if (now <= 17 && now < 21) {
      return "Evening";
    } else if (now <= 12 || now < 5) {
      return "Night";
    }
  };

  return (
    <div className="w-full h-16 px-4  flex justify-between items-center fixed top-0 z-50 bg-white">
      <div>
        <h1 className="font-bold">Good {greeting()}</h1>
        <p>User</p>
      </div>
      <div className="flex gap-5 text-blue-500">
        <div>
          <BellDot />
        </div>
        <User />
      </div>
    </div>
  );
};

export default Header;
