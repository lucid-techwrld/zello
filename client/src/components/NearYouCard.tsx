import { useNavigate } from "react-router-dom";
import type { PropertyType } from "./PropertyCard";
import placeholderImage from "../assets/icons/placeholder.png";

const NearYouCard = ({
  id,
  title,
  price,
  bedrooms,
  bathrooms,
  city,
  state,
  street,
  images,
}: PropertyType) => {
  const navigate = useNavigate();

  const mainImage = images?.[0] || placeholderImage;
  return (
    <div
      className="relative w-64 min-w-64 h-80 overflow-hidden rounded-2xl cursor-pointer"
      onClick={() => navigate(`/view/${id}`)}
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
      <img src={mainImage} alt={title} className="w-full h-full object-cover" />

      <div className="absolute bottom-0 p-3 text-white">
        <p className="font-bold">{title}</p>
        <p>{`${street}, ${city}, ${state}`}</p>
      </div>
    </div>
  );
};

export default NearYouCard;
