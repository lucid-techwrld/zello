import RecommendeCard from "../components/RecommendeCard";
import Search from "../components/Search";
import image1 from "../assets/images/IMG-20241123-WA0419-592x444.jpg";
import image2 from "../assets/images/06854e7d3c51c5-comfortable-modern-living-in-prime-area-detached-duplexes-for-sale-ajah-lagos.jpeg";
import image3 from "../assets/images/06838e88dc8d4c-luxury-5-bedroom-fully-detached-duplex-detached-duplexes-for-sale-lekki-lagos.jpeg";

const NearyBy = () => {
  return (
    <div className="w-full h-full">
      <Search />
      <div className="w-full h-full p-3">
        <h1 className="text-xl font-bold">Nearby Places</h1>
        <div className="w-full h-full grid grid-cols-1 gap-4">
          <RecommendeCard
            image={image1}
            name="Beautiful Duplex Non Detached"
            price={3200008}
            bedrooms={5}
            toilets={6}
            location="Lekki, Lagos"
            onClick={() => console.log("Card clicked")}
          />
          <RecommendeCard
            image={image2}
            name="Modern Family Home"
            price={2500000}
            bedrooms={4}
            toilets={5}
            location="Victoria Island, Lagos"
          />
          <RecommendeCard
            image={image3}
            name="Luxury 5 Bedroom Duplex"
            price={4500000}
            bedrooms={5}
            toilets={6}
            location="Ikoyi, Lagos"
          />
          <RecommendeCard
            image={image1}
            name="Cozy Urban Apartment"
            price={1800000}
            bedrooms={3}
            toilets={4}
            location="Surulere, Lagos"
          />
          <RecommendeCard
            image={image2}
            name="Prime Area Detached Duplex"
            price={3900000}
            bedrooms={6}
            toilets={7}
            location="Lekki Phase 1, Lagos"
          />
          <RecommendeCard
            image={image3}
            name="Lekki Executive Residence"
            price={5200000}
            bedrooms={7}
            toilets={8}
            location="Sagamu, Ogun State"
          />
        </div>
      </div>
    </div>
  );
};

export default NearyBy;
