import { X } from "lucide-react";

type UserData = {
  id: string;
  email: string;
  avatar: string;
  first_name: string;
  last_name: string;
  role: string;
  dob: string;
  street: string;
  city: string;
  state: string;
  country: string;
};

interface EditProfileProp {
  user: UserData | null;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileProp> = ({ user, onClose }) => {
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
            src={user?.avatar}
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>

        <h2 className="text-center text-lg font-semibold mb-4">Edit Profile</h2>

        <form className="space-y-4">
          <input
            type="text"
            defaultValue={user?.first_name}
            placeholder="First Name"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            defaultValue={user?.last_name}
            placeholder="Last Name"
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            defaultValue={user?.email}
            placeholder="Email"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            defaultValue={user?.street}
            placeholder="Street"
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            defaultValue={user?.city}
            placeholder="City"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            defaultValue={user?.state}
            placeholder="State"
            className="w-full border p-2 rounded"
          />
          <div className="flex gap-2">
            <input
              type="date"
              name="dob"
              id="dob"
              className="w-full bg-blue-500 rounded-md p-3"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
