import { useState } from "react";

const Signin2 = () => {
  const [selected, setSelected] = useState<string>("🏘Rent");

  const select: string[] = ["🏘Rent", "🏡Lease"];

  const handleSelectClick = (keyword: string) => {
    const isMatch = selected === keyword;
    if (!isMatch) {
      setSelected(keyword);
    } else return;
  };

  return (
    <div className="w-full h-full">
      <form className="h-full w-full p-4 space-y-4">
        <h1 className="text-center font-bold text-2xl text-blue-500">
          Personal Information
        </h1>
        <p className="font-bold text-xl">What are you here for?</p>
        <div className="flex justify-center items-center gap-3 w-full h-20 px-10">
          {select.map((word, index) => (
            <div
              className={`w-1/2 h-full ${
                selected === word
                  ? "gradient text-white"
                  : "bg-gray-200 text-gray-400"
              }  rounded-md flex justify-center items-center text-xl font-bold `}
              key={index}
              onClick={() => handleSelectClick(word)}
            >
              {word}
            </div>
          ))}
        </div>

        <input
          type="text"
          name="first_name"
          id="name1"
          required
          placeholder="First Name"
          className="w-full h-12 border-2 border-blue-500 rounded-md pl-5 outline-none"
        />
        <input
          type="text"
          name="last_name"
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
          <button className="gradient w-full p-4 font-bold text-white">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin2;
