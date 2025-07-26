import {
  Bell,
  Home,
  User,
  MessageCircle,
  BookMarked,
  LogOut,
  LogIn,
  X,
  PlusCircle,
  Building,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/userContext";

interface NavBarProps {
  isMenuOpen: boolean;
  handleMenu: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isMenuOpen, handleMenu }) => {
  const { authenticated, user, logOut } = useUser();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const result = await logOut();
    if (result) {
      navigate("/auth/join");
    }
  };
  return (
    <div
      className={`fixed w-full h-full  gradient-extra z-50 top-0 ${
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
            <User /> <span>Profile</span>
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

          {authenticated ? (
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
  );
};

export default NavBar;
