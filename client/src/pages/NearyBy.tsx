import Search from "../components/Search";
import PropertyCard from "../components/PropertyCard";
import { useProperty } from "../hooks/propertieContext";

const NearyBy = () => {
  const { properties } = useProperty();

  return (
    <div className="w-full h-full">
      <Search />
      <div className="w-full h-full p-3">
        <h1 className="text-xl font-bold">Nearby Properties</h1>
        <div className="w-full h-full grid grid-cols-2 gap-4 mt-3">
          {properties?.map((prop, i) => (
            <PropertyCard key={i} {...prop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NearyBy;
