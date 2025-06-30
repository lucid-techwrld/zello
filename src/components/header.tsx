import { BellDot, User } from "lucide-react";

const Header = () => {
  return (
    <div className="w-full h-16 px-4  flex justify-between items-center ">
      <h1>Logo </h1>
      <div className="flex gap-5 text-blue-500">
        <div>
          <BellDot  />
        </div>
        <User />
      </div>
    </div>
  );
};

export default Header;
