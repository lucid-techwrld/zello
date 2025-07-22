import { useUser } from "../hooks/userContext";

const ViewProfile = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 via-white to-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src={user?.avatar}
            alt="Profile avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />

          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-gray-800">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-600">Role:</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold capitalize">
                  {user?.role}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">
                  Date of Birth:
                </span>{" "}
                <span className="text-gray-800">
                  {user?.dob &&
                    new Date(user.dob).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="font-medium text-gray-600">Address:</span>{" "}
                <span className="text-gray-800">
                  {user?.street}, {user?.city}
                </span>
              </div>
            </div>

            <div className="mt-8 text-right">
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-xl shadow-sm transition">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
