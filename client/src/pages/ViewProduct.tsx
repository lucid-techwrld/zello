import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import map from "../assets/images/map.jfif";
import mockProducts from "../mockProducts";
import {
  ArrowLeftCircle,
  BedDouble,
  Bookmark,
  Map,
  Toilet,
} from "lucide-react";
import SellerProfile from "../components/SellerProfile";
import Gallery from "../components/Gallery";

const ViewProduct = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const matchingProduct = mockProducts.find((prod) => prod.id === Number(id));

  if (!matchingProduct) {
    return <div>Product not found</div>;
  }
  const { image, name, desc, price, size, bedroooms, toilets, location } =
    matchingProduct;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[500px] relative rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

        <div className="w-full absolute flex justify-between p-4 text-white top-0">
          <ArrowLeftCircle className="w-8 h-8" onClick={() => navigate(-1)} />
          <Bookmark className="w-6 h-6" />
        </div>

        <img src={image} alt="name" className="w-full h-full object-cover" />

        <div className="absolute bottom-0 p-4">
          <p className="text-white font-bold text-3xl">{name}</p>
          <p className="text-gray-300 text-md">{location}</p>
        </div>
      </div>

      <div className="w-full h-full p-3">
        <p className="text-blue-500 mb-2 font-bold text-2xl">
          <span className="line-through">N</span>
          {Math.floor(price).toLocaleString()}/year
        </p>
        <div className="w-full flex gap-4 mt-5 text-md">
          <div className="flex items-center gap-2 ">
            <BedDouble className="w-5 h-5" />{" "}
            <span className="text-gray-500">{bedroooms}</span>
          </div>
          <div className="flex gap-2">
            <Toilet className="w-5 h-5" />{" "}
            <span className="text-gray-500">{toilets}</span>
          </div>
          <div className="flex gap-2">
            <Map className="w-5 h-5" />
            <span className="text-gray-500">{size}</span>
          </div>
        </div>

        <hr className="border mt-4 border-gray-300" />
        <p className="mt-2 text-md font-bold text-blue-500">Description</p>
        <p className="text-md  text-gray-600">{desc}</p>
      </div>

      <SellerProfile />

      <Gallery />

      <div className="w-full p-4">
        <h1 className="font-bold text-xl">Distance from you</h1>
        <img
          src={map}
          alt="map"
          className="w-full h-[300px] object-cover rounded-md mt-4"
        />
      </div>

      <div className="w-full h-16 flex justify-center items-center mt-4">
        <button className="gradient-extra w-[80%] h-12 rounded-full text-xl font-bold text-white">
          Rent
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;
