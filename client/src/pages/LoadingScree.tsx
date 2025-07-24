import { Loader2Icon } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Loader2Icon className="text-blue-500 font-bold w-7 h-7 animate-spin" />
    </div>
  );
};

export default LoadingScreen;
