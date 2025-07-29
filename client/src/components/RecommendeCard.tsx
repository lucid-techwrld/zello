import { BedIcon, MapPin, ToiletIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import placeholderImage from "../assets/icons/placeholder.png";
import type { PropertyType } from "./PropertyCard";

const RecommendCard = ({
  id,
  images,
  title,
  price,
  bedrooms,
  bathrooms,
  street,
  city,
  state,
}: PropertyType) => {
  const navigate = useNavigate();

  const mainImage = images?.[0] || placeholderImage;
  return (
    <div
      className="w-full h-28 flex gap-2 bg-white rounded-md shadow-md overflow-hidden"
      onClick={() => navigate(`/view/${id}`)}
    >
      <div className="w-[30%] h-full rounded-md p-2 flex items-center">
        <img
          src={mainImage}
          alt={title}
          className="w-full h-full rounded-2xl object-cover"
          onClick={() => window.open(mainImage, "_blank")}
        />
      </div>

      <div className="flex flex-col justify-between p-2 w-[70%] overflow-hidden">
        <p className="font-bold text-base truncate">{title}</p>
        <p className="text-blue-500 mb-2 font-semibold text-sm">
          <span className="line-through">N</span>
          {Math.floor(price).toLocaleString()}/year
        </p>

        <div className="flex gap-4 text-xs">
          <div className="flex gap-1 items-center">
            <BedIcon className="w-4 h-4" />
            <p className="whitespace-nowrap">{bedrooms} Bedrooms</p>
          </div>

          <div className="flex gap-1 items-center">
            <ToiletIcon className="w-4 h-4" />
            <p className="whitespace-nowrap">{bathrooms} Toilets</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <MapPin className="w-4 h-4" />
          <p className="truncate">
            {street}, {city}, {state}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecommendCard;
