import { MapPin } from "lucide-react";

type NearYouType = {
  img: string;
  name: string;
  address: string;
  km: number;
};

const NearYouCard = ({ img, name, address, km }: NearYouType) => {
  return (
    <div className="relative w-64 min-w-64 h-80 overflow-hidden rounded-2xl ">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
      <img src={img} alt="name" className="w-full h-full object-cover" />

      <div className="absolute top-0 right-0 p-2 flex gap-1 justify-center items-center text-white">
        <MapPin className="w-5 h-5 " />
        <p>{km} km</p>
      </div>

      <div className="absolute bottom-0 p-3  text-white">
        <p className="font-bold">{name}</p> <p>{address}</p>
      </div>
    </div>
  );
};

export default NearYouCard;
