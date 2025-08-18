import { Monitor } from "lucide-react";

const NotOptimized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-500 via-pink-500 to-purple-600">
      <div className="text-center p-8 bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl max-w-sm">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-red-100 rounded-full">
            <Monitor className="w-12 h-12 text-red-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          Not Optimized for Large Screens
        </h1>
        <p className="mt-3 text-gray-600 leading-relaxed">
          This website is best experienced on a{" "}
          <span className="font-semibold">mobile phone</span> or{" "}
          <span className="font-semibold">tablet</span>.
        </p>
      </div>
    </div>
  );
};

export default NotOptimized;
