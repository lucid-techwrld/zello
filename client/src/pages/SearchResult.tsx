import { useParams } from "react-router-dom";
import Search from "../components/Search";
import mockProducts from "../mockProducts";
import RecommendeCard from "../components/RecommendeCard";

const SearchResult = () => {
  const { search } = useParams<{ search: string }>();

  const matchingProducts = mockProducts.filter((prod) => {
    if (search) {
      if (prod.name.toLowerCase().includes(search.toLowerCase())) return prod;
    }
  });

  console.log(matchingProducts);
  if (!matchingProducts) {
    return <div>Product not found</div>;
  }

  return (
    <div className="w-full h-full">
      <Search />
      <div className="w-full h-full p-3">
        <h1 className="font-bold text-xl">
          Here's your search result for "{search}"
        </h1>

        {matchingProducts.length > 0
          ? matchingProducts.map((prod, index) => (
              <RecommendeCard
                key={index}
                name={prod.name}
                image={prod.image}
                price={prod.price}
                bedrooms={prod.bedroooms}
                toilets={prod.toilets}
                location={prod.location}
              />
            ))
          : "No matching product please try again"}
      </div>
    </div>
  );
};

export default SearchResult;
