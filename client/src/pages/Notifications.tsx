import { Bell, ArrowLeft } from "lucide-react";
import NotificationCard from "../components/NotificationCard";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Notifications = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-gray-50 grid grid-cols-1 md:grid-cols-4">
      <aside className="hidden md:block md:col-span-1 lg:col-span-1 h-screen sticky top-0">
        <NavBar />
      </aside>
      <div className="w-full h-full col-span-1 md:col-span-3 flex flex-col">
        <div className="w-full h-12 flex justify-between items-center p-4 bg-white shadow-md fixed top-0">
          <ArrowLeft
            size={25}
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
          <p className="text-lg md:text-xl font-bold">Notifications</p>
          <Bell size={22} className="text-gray-600" />
        </div>

        <div className="pt-16 px-3 md:px-6 max-w-3xl mx-auto space-y-4">
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
    </div>
  );
};

export default Notifications;
