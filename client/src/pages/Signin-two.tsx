import axios from "axios";
import { ArrowLeft, Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Success from "../components/Success";
import extractAxiosErrorMessage from "../components/extractError";

const Signin2 = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  if (!id) {
    navigate("/auth/join");
    return null;
  }
  const [role, setRoleSlected] = useState<string>("Rent");
  const [loading, setLoading] = useState<boolean>(false);
  const [displayToast, setDisplay] = useState<boolean>(false);

  const select: string[] = ["Rent", "Lease"];

  const handleSelectClick = (keyword: string) => {
    const isMatch = role === keyword;
    if (!isMatch) {
      setRoleSlected(keyword);
    } else return;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const rawData = Object.fromEntries(formData.entries());

    const { street, city, state, country, ...rest } = rawData;
    const payload = {
      ...rest,
      role: role.toLocaleLowerCase(),
      userId: id,
      address: {
        street,
        city,
        state,
        country,
      },
    };

    try {
      setLoading(true);
      // console.log("submitting data:", payload);
      const res = await axios.post(
        `http://localhost:5000/auth/add-details`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.status !== 201) {
        throw new Error("Failed to add details");
      }
      console.log("User details added successfully:", res.data);
      setDisplay(true);

      setTimeout(() => {
        setDisplay(false);
        navigate("/auth/login");
      }, 3000);
    } catch (error) {
      const message = extractAxiosErrorMessage(error);

      console.log("Login Error:", message);
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="h-full w-full p-4 space-y-4"
      >
        <div className="w-full flex justify-center items-center relative">
          <ArrowLeft className="absolute left-0" onClick={() => navigate(-1)} />
          <h1 className="text-center font-bold text-xl text-blue-500">
            Personal Information
          </h1>
        </div>
        <p className="font-bold text-xl">What are you here for?</p>
        <div className="flex justify-center items-center gap-3 w-full h-20 px-10">
          {select.map((word, index) => (
            <div
              className={`w-1/2 h-full ${
                role === word
                  ? "gradient text-white"
                  : "bg-gray-200 text-gray-400"
              }  rounded-md flex justify-center items-center text-xl font-bold `}
              key={index}
              onClick={() => handleSelectClick(word)}
            >
              🏘{word}
            </div>
          ))}
        </div>

        <input
          type="text"
          name="firstName"
          id="name1"
          required
          placeholder="First Name"
          className="w-full h-12 border-2 border-blue-500 rounded-md pl-5 outline-none"
        />
        <input
          type="text"
          name="lastName"
          id="name2"
          required
          placeholder="Last Name"
          className="w-full h-12 border-2 border-blue-500 rounded-md pl-5 outline-none"
        />
        <p className="text-xl font-bold">Date of Birth</p>
        <input
          type="date"
          name="dob"
          id="dob"
          required
          className="w-full bg-gray-200 p-3 rounded-md text-blue-500"
        />
        <p className="text-xl font-bold">Address</p>
        <input
          type="text"
          name="street"
          id="str"
          required
          placeholder="Street, eg: No. 3b Solebo Street, Benson"
          className="w-full h-12 border-2 border-blue-500 rounded-md pl-5 outline-none"
        />
        <input
          type="text"
          name="city"
          id="city"
          required
          placeholder="City, eg: Ikorodu"
          className="w-full h-12 border-2 border-blue-500 rounded-md pl-5 outline-none"
        />
        <input
          type="text"
          name="state"
          id="state"
          required
          placeholder="State, eg: Lagos"
          className="w-full h-12 border-2 border-blue-500 rounded-md pl-5 outline-none"
        />
        <input
          type="text"
          name="country"
          id="country"
          value="Nigeria"
          required
          className="w-full h-12 border-2 border-blue-500 rounded-md pl-5 outline-none"
        />

        <div className="w-full h-24 flex justify-center items-center px-20">
          <button className="gradient-extra rounded-full w-full p-4 font-bold text-white flex justify-center items-center">
            {loading ? (
              <Loader className="text-white w-6 h-6 animate-spin" />
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </form>
      {displayToast && (
        <Success
          message="OTP Verified Succesfully"
          subText="OTP Code has been verified successfully, you will be redirect shortly."
        />
      )}
    </div>
  );
};

export default Signin2;
