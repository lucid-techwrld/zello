import icon from "../assets/icons/successIcon.png";

type successType = {
  message: string;
  subText: string;
};
const Success = ({ message, subText }: successType) => {
  return (
    <div className="min-w-screen min-h-screen absolute bg-white flex flex-col justify-center items-center gap-5 z-50">
      <div className="w-44 h-44 border-2">
        <img src={icon} alt="success" />
      </div>
      <div className="w-full p-4 text-center">
        <h1 className="text-2xl">{message}</h1>
        <p className="text-md text-gray-600">{subText}</p>
      </div>
    </div>
  );
};

export default Success;
