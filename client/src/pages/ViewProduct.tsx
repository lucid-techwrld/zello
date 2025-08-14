import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import map from "../assets/images/map.jfif";
import placeholderImage from "../assets/icons/placeholder.png";
import {
  ArrowLeftCircle,
  BedDouble,
  Bookmark,
  BookmarkCheck,
  Toilet,
} from "lucide-react";
import SellerProfile from "../components/SellerProfile";
import Gallery from "../components/Gallery";
import { useEffect } from "react";
import LoadingScreen from "./LoadingScree";
import usePropertyStore from "../hooks/usePropertyStore";

const ViewProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const getProperty = usePropertyStore((state) => state.getProperty);
  const property = usePropertyStore((state) => state.property);
  const bookmarkProperty = usePropertyStore((state) => state.bookmarkProperty);
  const bookmarkedProperties = usePropertyStore(
    (state) => state.bookmarkedProperties
  );
  const getBookMarkeds = usePropertyStore((state) => state.getBookMarkeds);

  useEffect(() => {
    if (id) {
      getProperty(id);
    } else {
      navigate("/");
    }
  }, [id]);

  useEffect(() => {
    if (id && property === null) {
      return;
    }
    getBookMarkeds();
  }, [property?.id]);

  if (!property) {
    return <LoadingScreen />;
  }

  const handleBookmark = async () => {
    const result = await bookmarkProperty(property);
    if (result) {
      console.log("Addedd to Bookmarked");
    }
  };

  let isBookMarked: boolean = false;
  if (bookmarkedProperties) {
    isBookMarked =
      bookmarkedProperties?.some((prop) => prop?.property_id === property.id) ??
      false;
  }

  console.log(isBookMarked);
  const address =
    property?.street + ", " + property?.city + ", " + property?.state;
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[500px] relative rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

        <div className="w-full absolute flex justify-between p-4 text-white top-0">
          <ArrowLeftCircle className="w-8 h-8" onClick={() => navigate(-1)} />
          <button
            onClick={handleBookmark}
            disabled={isBookMarked}
            className="hover:bg-gray-300 p-2 rounded-md border-2 border-white"
          >
            {isBookMarked ? (
              <BookmarkCheck className="w-6 h-6" />
            ) : (
              <Bookmark className="w-6 h-6" />
            )}
          </button>
        </div>

        <img
          src={property?.images[0] || placeholderImage}
          alt="name"
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 p-4">
          <p className="text-white font-bold text-3xl">{property?.title}</p>
          <p className="text-gray-300 text-md">{address}</p>
        </div>
      </div>

      <div className="w-full h-full p-3">
        <p className="text-blue-500 mb-2 font-bold text-2xl">
          <span className="line-through">N</span>
          {Math.floor(property?.price).toLocaleString()}/year
        </p>
        <div className="w-full flex gap-4 mt-5 text-md">
          <div className="flex items-center gap-2 ">
            <BedDouble className="w-5 h-5" />{" "}
            <span className="text-gray-500">{property?.bedrooms}</span>
          </div>
          <div className="flex gap-2">
            <Toilet className="w-5 h-5" />{" "}
            <span className="text-gray-500">{property?.bathrooms}</span>
          </div>
        </div>

        <hr className="border mt-4 border-gray-300" />
        <p className="mt-2 text-md font-bold text-blue-500">Description</p>
        <p className="text-md  text-gray-600">{property?.description}</p>
      </div>

      <SellerProfile />

      <Gallery images={property?.images} />

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
