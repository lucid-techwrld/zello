import { Bell, HelpCircle, Info, Trash2 } from "lucide-react";
import profileImage from "../assets/images/profile.jpg";
import { NavLink } from "react-router-dom";
import { useUser } from "../hooks/userContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  console.log(user);
  return (
    <div className="profile">
      <h1 className="text-xl font-bold">Profile</h1>

      {/* profile card */}
      <div className="profile-card">
        <div className="avatar">
          <img
            src={user?.avatar || profileImage}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="text-sm text-gray-500">
            {" "}
            <p className="text-xl font-bold text-black">
              {user?.first_name} {user?.last_name}
            </p>
            <p>{user?.email}</p>
            <p>{user?.role}</p>
          </div>
          <div className="w-full h-full flex ">
            <button
              onClick={() => navigate("/profile/view")}
              className="flex flex-grow-0 w-full gradient p-2 justify-center items-center text-white font-bold mt-4"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* other settings */}
      <div className="w-full h-full mt-5 flex flex-col space-y-8 ">
        <h1 className="text-xl font-bold">Others</h1>

        <NavLink
          to="/notifications"
          className=" flex gap-4 text-md hover:bg-gray-100 rounded-md  p-2"
        >
          <Bell className="w-7 h-7" />
          <p>Notifications</p>
        </NavLink>

        <NavLink
          to="/faq"
          className=" flex gap-4 text-md hover:bg-gray-100 rounded-md  p-2"
        >
          <HelpCircle className="w-7 h-7" />
          <p>FAQ</p>
        </NavLink>

        <NavLink
          to="/about"
          className=" flex gap-4 text-md hover:bg-gray-100 rounded-md  p-2"
        >
          <Info className="w-7 h-7" />
          <p>About App</p>
        </NavLink>

        <div className=" flex gap-4 text-md text-red-600 mt-8 hover:bg-gray-100 rounded-md  p-2">
          <Trash2 className="w-7 h-7" />
          <p>Deactivate my account</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
