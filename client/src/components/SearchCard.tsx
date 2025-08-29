import house from "../assets/images/contemporary-5-bedroom-detached-duplex-with-swimmi-eSDrmfVzd0vqccjgYRNC.jpeg";

const SearchCard = () => {
  return (
    <div className="bg-blue-800 w-48 h-auto rounded-xl p-4 flex flex-col mt-10">
      <p className="text-xl text-white font-bold">Find your best house</p>
      <div className="flex justify-center items-center w-24 h-24 overflow-hidden">
        <img src={house} alt="house" className="w-full h-full " />
      </div>
      <button className="w-full p-4 rounded-xl text-center text-2xl font-bold bg-white text-black">
        Search
      </button>
    </div>
  );
};

export default SearchCard;
