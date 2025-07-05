import {
  BellDot,
  Home,
  User,
  MessageCircle,
  BookMarked,
  MapPinIcon as MapPin,
  LogOut,
  LogIn,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

interface NavBarProps {
  isMenuOpen: boolean;
  handleMenu: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isMenuOpen, handleMenu }) => {
  const isLoggedIn = true;
  return (
    <div
      className={`fixed w-full h-full  gradient z-50 top-0 ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="w-full h-full relative flex justify-center items-center">
        <X
          className="w-8 h-8 text-white right-5 top-5 absolute"
          onClick={handleMenu}
        />
        <ul className="w-full h-full flex flex-col justify-center space-y-6 text-xl text-white">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                isActive
                  ? "font-bold text-blue-500 bg-white p-5 rounded-r-full w-1/2"
                  : "p-5"
              } `
            }
          >
            {" "}
            <Home /> <span>Home</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                isActive
                  ? "font-bold text-blue-500 bg-white p-5 rounded-r-full w-1/2"
                  : "px-5"
              } `
            }
          >
            {" "}
            <User /> <span>Profile</span>
          </NavLink>

          <NavLink
            to="/nearby"
            className={({ isActive }) =>
              `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                isActive
                  ? "font-bold text-blue-500 bg-white p-5 rounded-r-full w-1/2"
                  : "px-5"
              } `
            }
          >
            {" "}
            <MapPin /> <span>Nearby</span>
          </NavLink>

          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                isActive
                  ? "font-bold text-blue-500 bg-white p-5 rounded-r-full w-1/2"
                  : "px-5"
              } `
            }
          >
            {" "}
            <BellDot /> <span>Notifications</span>
          </NavLink>

          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                isActive
                  ? "font-bold text-blue-500 bg-white p-5 rounded-r-full w-1/2"
                  : "px-5"
              } `
            }
          >
            {" "}
            <MessageCircle /> <span>Messages</span>
          </NavLink>

          <NavLink
            to="/bookmarks"
            className={({ isActive }) =>
              `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                isActive
                  ? "font-bold text-blue-500 bg-white p-5 rounded-r-full w-1/2"
                  : "px-5"
              } `
            }
          >
            {" "}
            <BookMarked /> <span>Bookmarks</span>
          </NavLink>

          <NavLink
            to={isLoggedIn ? "/" : "/auth/login"}
            className={({ isActive }) =>
              `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                isActive
                  ? "font-bold text-blue-500 bg-white p-5 rounded-r-full w-1/2"
                  : "px-5"
              } `
            }
          >
            {" "}
            {isLoggedIn ? (
              <>
                <LogOut /> <span>Sign Out</span>
              </>
            ) : (
              <>
                <LogIn /> <span>Login</span>
              </>
            )}
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
