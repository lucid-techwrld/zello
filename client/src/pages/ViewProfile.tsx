import { useUser } from "../hooks/userContext";
import { useState } from "react";
import profileImage from "../assets/images/profile.jpg";
import EditProfileModal from "../components/EditProfileModal";

const ViewProfile = () => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-4 gap-2 ">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || profileImage}
            alt="profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="text-gray-600 text-sm">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
        >
          Edit Profile
        </button>
      </div>

      {/* Role-based Section */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Your Properties</h3>
        {/* TODO: map through propeties user have posted, if none return no start listing property */}
      </div>

      {/* TODO: show property you may like component */}

      {/* Modal */}
      {isModalOpen && (
        <EditProfileModal user={user} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default ViewProfile;
