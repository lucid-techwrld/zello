import NearYouCard from "./NearYouCard";
import nearyou1 from "../assets/images/0679a17c306c34-luxurious-4-bedroom-fully-detached-duplex-detached-duplexes-for-sale-lekki-lagos.jpg";
import nearyou2 from "../assets/images/06838e88dc8d4c-luxury-5-bedroom-fully-detached-duplex-detached-duplexes-for-sale-lekki-lagos.jpeg";

const NearYou = () => {
  return (
    <div className="p-3 w-full h-auto">
      <div className="flex justify-between">
        <p className="text-lg font-bold">Location near you</p>
        <p className="text-gray-500">See more</p>
      </div>

      <div className="flex flex-row overflow-x-auto gap-x-5">
        <NearYouCard
          img={nearyou1}
          name="DreamsVille House"
          address="No. 2, Vicent Crescent, Lekki, Lagos"
          km={16}
        />

        <NearYouCard
          img={nearyou2}
          name="Luxury 5 Bedroom fully deatched duplex"
          address="Zone B, Gloria Estate, Lekki, Lagos"
          km={16}
        />
      </div>
    </div>
  );
};

export default NearYou;
