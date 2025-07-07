import { Bell, HelpCircle, Info, Lock, Trash2, UserPen } from "lucide-react";
import profileImage from "../assets/images/profile.jpg";
import { NavLink } from "react-router-dom";

const Profile = () => {
  return (
    <div className="profile">
      <h1 className="text-xl font-bold">Profile</h1>

      {/* profile card */}
      <div className="profile-card">
        <div className="avatar">
          <img
            src={profileImage}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="text-sm text-gray-500">
            {" "}
            <p className="text-xl font-bold text-black">Davis Ayomide</p>
            <p>davisayomide999@gmail.com</p>
            <p>Rent</p>
          </div>
          <div className="w-full h-full flex relative">
            <button className="flex flex-grow-0 w-full gradient p-2 justify-center items-center text-white font-bold mt-4">
              Edit Profile
            </button>
            <button className="border-2 rounded-full border-black flex justify-center items-center w-8 h-8 bg-white absolute top-0 right-0 ">
              <UserPen className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* other settings */}
      <div className="w-full h-full mt-5 flex flex-col space-y-8 ">
        <h1 className="text-xl font-bold">Others</h1>
        <NavLink
          to="/reset-password"
          className=" flex gap-4 text-md hover:bg-gray-100 rounded-md  p-2"
        >
          <Lock className="w-7 h-7" />
          <p>Password</p>
        </NavLink>

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
