import { MessageCircle, Phone } from "lucide-react";
import image from "../assets/images/man-face.jpeg";
import { useNavigate } from "react-router-dom";
import type React from "react";

interface SellerProps {
  userId: string;
  firstName: string;
  lastName: string;
}

const SellerProfile: React.FC<SellerProps> = ({
  userId,
  firstName,
  lastName,
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-20 flex p-3">
      <div className="w-16 h-16 relative rounded-full overflow-hidden">
        <img src={image} alt="profile" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col ml-3 text-md">
        <p className="font-bold ">{firstName + " " + lastName}</p>
        <p>Owner/Agent</p>
      </div>
      <div className="flex  gap-2 ml-auto">
        <button className="flex items-center justify-center gradient p-4 text-white">
          <Phone className="w-6 h-6" />
        </button>
        <button
          onClick={() => navigate(`/chat/${userId}`)}
          className="flex items-center justify-center gradient p-4 text-white"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default SellerProfile;
