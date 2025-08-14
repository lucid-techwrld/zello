import { X, Loader } from "lucide-react";
import profileImage from "../assets/icons/placeholder.png";
import useUserStore from "../hooks/useUserStore";
import type { UserData } from "../hooks/useUserStore";

interface EditProfileProp {
  user: UserData | null;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileProp> = ({ user, onClose }) => {
  const updateUserDetails = useUserStore((state) => state.updateUserDetails);
  const loading = useUserStore((state) => state.loading.UpdateUser);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const result = await updateUserDetails(data as Partial<UserData>);
    if (result) onClose();
    console.log("Form submitted", data);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] sm:w-[400px] rounded-2xl p-6 relative ">
        {/* Close */}
        <button onClick={onClose} className="absolute top-3 right-3">
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <img
            // src={user?.avatar}
            src={profileImage}
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>

        <h2 className="text-center text-lg font-semibold mb-4">Edit Profile</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            name="firstName"
            defaultValue={user?.first_name}
            placeholder="First Name"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="lastName"
            defaultValue={user?.last_name}
            placeholder="Last Name"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="street"
            defaultValue={user?.street}
            placeholder="Street"
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="city"
            defaultValue={user?.city}
            placeholder="City"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="state"
            defaultValue={user?.state}
            placeholder="State"
            className="w-full border p-2 rounded"
          />
          <div className="flex gap-2">
            <input
              type="date"
              name="dob"
              id="dob"
              defaultValue={user?.dob ? user.dob.split("T")[0] : ""}
              className="w-full bg-blue-500 rounded-md p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold flex justify-center items-center"
          >
            {loading ? <Loader className="w-5 h-5 animate-spin" /> : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
