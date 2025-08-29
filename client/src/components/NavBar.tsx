import {
  Bell,
  Home,
  MessageCircle,
  BookMarked,
  LogOut,
  LogIn,
  X,
  PlusCircle,
  Building,
  User2,
} from "lucide-react";
import logo from "../assets/icons/zello logo.png";

import { NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../hooks/useUserStore";
import SearchCard from "./SearchCard";

interface NavBarProps {
  isMenuOpen?: boolean;
  handleMenu?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isMenuOpen, handleMenu }) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const User = useUserStore((state) => state.User);
  const logOut = useUserStore((state) => state.logOut);
  const user = User || null;
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const result = await logOut();
    if (result) {
      navigate("/auth/join");
    }
  };
  return (
    <>
      {/* Desktop view */}
      <div className="w-full bg-white overflow-y-auto shadow-sm hidden  md:flex flex-col h-screen sticky top-0 col-span-3">
        {/* logo */}
        <div className="w-full h-auto p-3 fixed bg-white top-0">
          <img src={logo} alt="zello logo" className="w-50 h-16" />
        </div>
        <div className="w-full mt-32 h-full pr-10 pb-10">
          <ul className="w-full h-auto flex flex-col  space-y-7 text-md text-gray-800">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                  isActive
                    ? "font-bold text-white bg-blue-500 p-3 rounded-r-full w-full"
                    : "px-5"
                } `
              }
            >
              {" "}
              <Home /> <span>Home</span>
            </NavLink>

            {user?.role == "lease" && (
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                    isActive
                      ? "font-bold text-white bg-blue-500 p-3 rounded-r-full w-full"
                      : "px-5"
                  } `
                }
              >
                {" "}
                <PlusCircle /> <span>List Property</span>
              </NavLink>
            )}

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                  isActive
                    ? "font-bold text-white bg-blue-500 p-3 rounded-r-full w-full"
                    : "px-5"
                } `
              }
            >
              {" "}
              <User2 /> <span>Profile</span>
            </NavLink>

            <NavLink
              to="/properties"
              className={({ isActive }) =>
                `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                  isActive
                    ? "font-bold text-white bg-blue-500 p-3 rounded-r-full w-full"
                    : "px-5"
                } `
              }
            >
              {" "}
              <Building /> <span>Properties</span>
            </NavLink>

            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                  isActive
                    ? "font-bold text-white bg-blue-500 p-3 rounded-r-full w-full"
                    : "px-5"
                } `
              }
            >
              {" "}
              <Bell /> <span>Notifications</span>
            </NavLink>

            <NavLink
              to="/messages"
              className={({ isActive }) =>
                `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                  isActive
                    ? "font-bold text-white bg-blue-500 p-3 rounded-r-full w-full"
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
                    ? "font-bold text-white bg-blue-500 p-3 rounded-r-full w-full"
                    : "px-5"
                } `
              }
            >
              {" "}
              <BookMarked /> <span>Bookmarks</span>
            </NavLink>

            {isAuthenticated ? (
              <button
                onClick={handleLogOut}
                className="flex justify-start p-5 text-red-500 gap-2 font-bold hover:text-red-400"
              >
                <LogOut /> Log Out
              </button>
            ) : (
              <NavLink
                to={"/auth/login"}
                className={({ isActive }) =>
                  `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                    isActive
                      ? "font-bold text-blue-500 bg-white p-3 rounded-r-full w-full"
                      : "px-5"
                  } `
                }
              >
                <>
                  <LogIn /> <span>Login</span>
                </>
              </NavLink>
            )}
          </ul>

          <div className="flex justify-center items-center">
            <SearchCard />
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div
        className={`fixed w-full h-full md:hidden lg:hidden block  gradient-extra z-50 top-0 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="w-full h-full relative flex justify-center items-center">
          <X
            className="w-8 h-8 text-white right-5 top-5 absolute"
            onClick={handleMenu}
          />
          <ul className="w-full h-full flex flex-col justify-center space-y-7 text-md text-white">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                  isActive
                    ? "font-bold text-blue-500 bg-white p-3 rounded-r-full w-1/2"
                    : "p-5"
                } `
              }
            >
              {" "}
              <Home /> <span>Home</span>
            </NavLink>

            {user?.role == "lease" && (
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                    isActive
                      ? "font-bold text-blue-500 bg-white p-3 rounded-r-full w-1/2"
                      : "px-5"
                  } `
                }
              >
                {" "}
                <PlusCircle /> <span>List Property</span>
              </NavLink>
            )}

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                  isActive
                    ? "font-bold text-blue-500 bg-white p-3 rounded-r-full w-1/2"
                    : "px-5"
                } `
              }
            >
              {" "}
              <User2 /> <span>Profile</span>
            </NavLink>

            <NavLink
              to="/properties"
              className={({ isActive }) =>
                `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                  isActive
                    ? "font-bold text-blue-500 bg-white p-3 rounded-r-full w-1/2"
                    : "px-5"
                } `
              }
            >
              {" "}
              <Building /> <span>Properties</span>
            </NavLink>

            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                  isActive
                    ? "font-bold text-blue-500 bg-white p-3 rounded-r-full w-1/2"
                    : "px-5"
                } `
              }
            >
              {" "}
              <Bell /> <span>Notifications</span>
            </NavLink>

            <NavLink
              to="/messages"
              className={({ isActive }) =>
                `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                  isActive
                    ? "font-bold text-blue-500 bg-white p-3 rounded-r-full w-1/2"
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
                    ? "font-bold text-blue-500 bg-white p-3 rounded-r-full w-1/2"
                    : "px-5"
                } `
              }
            >
              {" "}
              <BookMarked /> <span>Bookmarks</span>
            </NavLink>

            {isAuthenticated ? (
              <button
                onClick={handleLogOut}
                className="flex justify-start p-5 text-red-500 gap-2 font-bold hover:text-red-400"
              >
                <LogOut /> Log Out
              </button>
            ) : (
              <NavLink
                to={"/auth/login"}
                className={({ isActive }) =>
                  `flex gap-3 items-center transition-all ease-in-out duration-300 ${
                    isActive
                      ? "font-bold text-blue-500 bg-white p-3 rounded-r-full w-1/2"
                      : "px-5"
                  } `
                }
              >
                <>
                  <LogIn /> <span>Login</span>
                </>
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
