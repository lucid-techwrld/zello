import RecommendeCard from "./RecommendeCard";
import image1 from "../assets/images/house-in-Nigeria-image-1.jpeg";
import image2 from "../assets/images/contemporary-5-bedroom-detached-duplex-with-swimmi-eSDrmfVzd0vqccjgYRNC.jpeg";

const Recommend = () => {
  return (
    <div className="w-full h-auto p-3">
      <div className="flex justify-between">
        <p className="text-lg font-bold">You might like</p>{" "}
      </div>

      <div className="flex flex-col gap-y-3">
        <RecommendeCard
          image={image1}
          name="Duplex House"
          price={324000000}
          bedrooms={5}
          toilets={3}
          location="Lagos, Nigeria"
        />

        <RecommendeCard
          image={image2}
          name="Contemporary Deatched Duplex"
          price={514020000}
          bedrooms={5}
          toilets={4}
          location="Lekki"
        />
      </div>
    </div>
  );
};

export default Recommend;
