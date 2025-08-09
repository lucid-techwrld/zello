import { useProperty } from "../hooks/propertieContext";
import PropertyCard from "../components/PropertyCard";
import { useEffect } from "react";
import { Bookmark, Loader } from "lucide-react";

const BookmarkPage = () => {
  const { bookmarkedProperties, getBookMarkeds, deleteBookMark, loading } =
    useProperty();

  useEffect(() => {
    getBookMarkeds();
  }, []);
  if (!bookmarkedProperties) {
    return <p>No Bookmarks</p>;
  }
  return (
    <div className="w-full min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bookmarked Properties</h1>
      {loading.bookmarks && (
        <div className="flex justify-center items-center">
          <Loader className="w-7 h-7 text-blue-500 animate-spin" />
        </div>
      )}
      {bookmarkedProperties?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          {bookmarkedProperties.map((property, index) => (
            <PropertyCard
              key={index}
              {...property}
              onRemove={() => deleteBookMark(property?.property_id)}
            />
          ))}
        </div>
      ) : (
        <div className="w-full text-center mt-20 text-gray-500 flex flex-col justify-center items-center">
          <p className="text-lg">You haven’t bookmarked any properties yet.</p>
          <p className="text-sm mt-2">
            Tap the <Bookmark className="w-5 h-5" /> icon on a property to save
            it here.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;
