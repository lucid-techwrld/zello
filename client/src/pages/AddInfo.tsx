import { ArrowLeft, Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Success from "../components/Success";
import extractAxiosErrorMessage from "../components/extractError";
import type { UserInfo } from "../hooks/useUserStore";
import useUserStore from "../hooks/useUserStore";

const AddInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    navigate("/auth/join");
    return null;
  }

  enum rolesEnum {
    Rent = "Rent",
    Lease = "Lease",
  }

  const [role, setRole] = useState<rolesEnum>(rolesEnum.Rent);
  const [showToast, setShowToast] = useState<boolean>(false);

  const addUserDetails = useUserStore((state) => state.addUserDetails);
  const loading = useUserStore((state) => state.loading.UserDetails);

  const handleRoleChange = (selected: rolesEnum) => {
    if (selected !== role) setRole(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { street, city, state, country, ...rest } = Object.fromEntries(
      formData.entries()
    );

    const payload: UserInfo = {
      ...rest,
      role: role.toLowerCase(),
      userId: id,
      address: { street, city, state, country },
    };

    try {
      const res = await addUserDetails(payload);
      if (!res) {
        console.error("Failed to add user details");
        return;
      }
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/auth/login");
      }, 3000);
    } catch (error) {
      const message = extractAxiosErrorMessage(error);
      console.log("Signup Error:", message);
    } finally {
      form.reset();
    }
  };

  const roleOptions = Object.values(rolesEnum);

  return (
    <div className="w-full h-full p-6 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Header */}
        <div className="flex items-center relative mb-4">
          <ArrowLeft
            className="absolute left-0 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="mx-auto text-xl font-bold text-blue-600">
            Personal Information
          </h1>
        </div>

        {/* Role Select */}
        <div>
          <p className="font-semibold text-lg mb-2">What are you here for?</p>
          <div className="grid grid-cols-2 gap-4">
            {roleOptions.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => handleRoleChange(option)}
                className={`rounded-md py-3 font-bold text-lg transition-all ${
                  role === option
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                🏘 {option}
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-3">
          <input
            name="firstName"
            placeholder="First Name"
            required
            className="input-field"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            required
            className="input-field"
          />

          <div>
            <label className="block font-semibold text-lg mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              required
              className="w-full bg-gray-100 p-3 rounded-md text-blue-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block font-semibold text-lg mb-1">Address</label>
            <input
              name="street"
              placeholder="Street (e.g., No. 3b Solebo Street)"
              required
              className="input-field"
            />
            <input
              name="city"
              placeholder="City (e.g., Ikorodu)"
              required
              className="input-field"
            />
            <input
              name="state"
              placeholder="State (e.g., Lagos)"
              required
              className="input-field"
            />
            <input
              name="country"
              value="Nigeria"
              readOnly
              className="input-field text-blue-600 font-semibold"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-blue-600 text-white font-bold text-lg flex justify-center items-center transition hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin w-5 h-5" /> : "Continue"}
          </button>
        </div>
      </form>

      {showToast && (
        <Success
          message="Signup Complete"
          subText="Details saved successfully. Redirecting..."
        />
      )}
    </div>
  );
};

export default AddInfo;
