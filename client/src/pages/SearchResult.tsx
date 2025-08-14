import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import RecommendCard from "../components/RecommendeCard";
import Search from "../components/Search";
import { Loader } from "lucide-react";
import usePropertyStore from "../hooks/usePropertyStore";

const SearchResult = () => {
  const navigate = useNavigate();
  const { search } = useParams<{ search: string }>();

  const searchProperties = usePropertyStore((state) => state.searchProperties);
  const searchResult = usePropertyStore((state) => state.searchResult);
  const loading = usePropertyStore((state) => state.loading.search);

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
        {loading && (
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
            {!loading && `No matching product found for ${search}. Try again.`}
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
