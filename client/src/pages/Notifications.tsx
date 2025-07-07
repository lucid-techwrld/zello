import { Bell, ArrowLeft } from "lucide-react";
import NotificationCard from "../components/NotificationCard";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full">
      <div className="w-full h-12 flex justify-between items-center p-4 bg-white text-xl font-bold fixed top-0">
        <ArrowLeft size={25} onClick={() => navigate(-1)} />
        <p>Notifications</p>
        <Bell size={25} />
      </div>

      <div className="w-full h-full mt-16 p-3">
        <NotificationCard
          msg="A new property matching your preference is now available in 'Lekki, Phase 2', Check it out before it's gone."
          time="1d"
          link="/view/2"
        />

        <NotificationCard
          msg="A new property matching your preference is now available in 'Lekki, Phase 2', Check it out before it's gone."
          time="1d"
          link="/view/2"
        />

        <NotificationCard
          msg="A new property matching your preference is now available in 'Lekki, Phase 2', Check it out before it's gone."
          time="1d"
          link="/view/2"
        />
      </div>
    </div>
  );
};

export default Notifications;
