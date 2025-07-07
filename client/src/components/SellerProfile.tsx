import { MessageCircle, Phone } from "lucide-react";
import image from "../assets/images/man-face.jpeg";

const SellerProfile = () => {
  return (
    <div className="w-full h-20 flex p-3">
      <div className="w-16 h-16 relative rounded-full overflow-hidden">
        <img src={image} alt="profile" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col ml-3 text-md">
        <p className="font-bold ">Davis Ayomide</p>
        <p>Owner</p>
      </div>
      <div className="flex  gap-2 ml-auto">
        <button className="flex items-center justify-center gradient p-4 text-white">
          <Phone className="w-6 h-6" />
        </button>
        <button className="flex items-center justify-center gradient p-4 text-white">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default SellerProfile;
