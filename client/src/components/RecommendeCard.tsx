import { BedIcon, ToiletIcon } from "lucide-react";

type RecommendType = {
  image: string;
  name: string;
  price: number;
  bedrooms: number;
  toilets: number;
};

const RecommendeCard = ({
  image,
  name,
  price,
  bedrooms,
  toilets,
}: RecommendType) => {
  return (
    <div className="w-full h-24 flex gap-2">
      <div className="w-[30%]  h-full rounded-md p-2">
        <img
          src={image}
          alt={name}
          className="w-full h-full rounded-2xl object-cover"
        />
      </div>
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-blue-500 mb-2 font-semibold">
          <span className="line-through">N</span>
          {Math.floor(price).toLocaleString()}/year
        </p>
        <div className="flex gap-4">
          <div className="flex gap-2">
            <BedIcon />
            <p>{bedrooms} Bedrooms</p>
          </div>

          <div className="flex gap-2">
            <ToiletIcon />
            <p>{toilets} Toilets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendeCard;
