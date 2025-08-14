import NearYouCard from "./NearYouCard";
import { useNavigate } from "react-router-dom";
import usePropertyStore from "../hooks/usePropertyStore";

const NearYou = () => {
  const navigate = useNavigate();
  const nearby = usePropertyStore((state) => state.nearby);

  console.log("nearby tsx", nearby);
  return (
    <div className="p-3 w-full h-auto">
      <div className="flex justify-between">
        <p className="text-lg font-bold">Location near you</p>
        <p
          className="text-gray-600 cursor-pointer"
          onClick={() => navigate("/nearby")}
        >
          See more
        </p>
      </div>

      <div className="flex flex-row overflow-x-auto gap-x-5">
        {nearby?.map((property) => (
          <NearYouCard
            key={property.id}
            id={property.id}
            description={property.description}
            type={property.type}
            title={property.title}
            price={property.price}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            city={property.city}
            state={property.state}
            street={property.street}
            images={property.images}
          />
        ))}
      </div>
    </div>
  );
};

export default NearYou;
