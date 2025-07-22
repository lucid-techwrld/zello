import logo from "../assets/icons/zello logo.png";
const LoadingScreen = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <img src={logo} alt="logo" className="w-64 h-52" />
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
