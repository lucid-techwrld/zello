import { useProperty } from "../hooks/propertieContext";
import PropertyCard from "../components/PropertyCard";

const BookmarkPage = () => {
  const { bookmarkedProperties } = useProperty();

  return (
    <div className="w-full min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bookmarked Properties</h1>

      {bookmarkedProperties?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bookmarkedProperties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      ) : (
        <div className="w-full text-center mt-20 text-gray-500">
          <p className="text-lg">You haven’t bookmarked any properties yet.</p>
          <p className="text-sm mt-2">
            Tap the <span className="font-semibold">❤️</span> icon on a property
            to save it here.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;
