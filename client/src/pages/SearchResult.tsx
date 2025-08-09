import { useNavigate, useParams } from "react-router-dom";
import { useProperty } from "../hooks/propertieContext";
import { useEffect } from "react";
import RecommendCard from "../components/RecommendeCard";
import Search from "../components/Search";
import { Loader } from "lucide-react";

const SearchResult = () => {
  const navigate = useNavigate();
  const { search } = useParams<{ search: string }>();
  const { searchResult, searchProperties, loading } = useProperty();

  useEffect(() => {
    if (!search) {
      navigate("/");
    }
  }, [search, navigate]);

  useEffect(() => {
    if (search) {
      searchProperties(search);
    }
  }, [search]);

  if (!search) return null;

  return (
    <div className="w-full h-full">
      <Search />
      <div className="w-full h-full p-3">
        <h1 className="font-bold text-xl mb-4">
          Here's your search result for "{search}"
        </h1>
        {loading.search && (
          <div className="flex justify-center items-center">
            <Loader className="w-7 h-7 text-blue-500 animate-spin" />
          </div>
        )}
        {searchResult && searchResult.length > 0 ? (
          searchResult?.map((prod, index) => (
            <RecommendCard key={index} {...prod} />
          ))
        ) : (
          <p>
            {!loading.search &&
              `No matching product found for ${search}. Try again.`}
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
