import { MenuIcon } from "lucide-react";

const Header = ({ handleMenu }: { handleMenu: () => void }) => {
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
    <div className="w-full h-16 px-4  flex justify-between items-center fixed top-0 z-40 bg-white">
      <div>
        <h1 className="font-bold text-2xl">Good</h1>
        <p className="text-gray-400">{greeting()}</p>
      </div>

      <MenuIcon
        className="text-blue-500 w-7 h-7"
        onClick={() => handleMenu()}
      />
    </div>
  );
};

export default Header;
