import { BedIcon, MapPin, ToiletIcon } from "lucide-react";
import placeholderImage from "../assets/icons/placeholder.png";
import { useNavigate } from "react-router-dom";

export type PropertyType = {
  id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  street: string;
  city: string;
  state: string;
  images: string[];
};

const PropertyCard = ({
  id,
  title,
  price,
  bedrooms,
  bathrooms,
  city,
  state,
  images,
}: PropertyType) => {
  const navigate = useNavigate();

  const mainImage = images?.[0] || placeholderImage;

  return (
    <div
      className="w-full h-72 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={() => navigate(`/view/${id}`)}
    >
      {/* Top Image */}
      <div className="h-1/2 w-full">
        <img
          src={mainImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onClick={(e) => {
            e.stopPropagation();
            window.open(mainImage, "_blank");
          }}
        />
      </div>

      {/* Details */}
      <div className="p-3 flex flex-col justify-between h-1/2">
        <p className="font-semibold text-base truncate" title={title}>
          {title}
        </p>

        <p className="text-blue-500 text-sm font-semibold">
          <span className="line-through">N</span>
          {Math.floor(Number(price)).toLocaleString()}/year
        </p>

        <div className="flex items-center gap-3 text-xs text-gray-700">
          <div className="flex gap-1 items-center">
            <BedIcon className="w-4 h-4" />
            <span>{bedrooms} Beds</span>
          </div>

          <div className="flex gap-1 items-center">
            <ToiletIcon className="w-4 h-4" />
            <span>{bathrooms} Baths</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <MapPin className="w-4 h-4" />
          <p className="truncate">
            {city}, {state}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
