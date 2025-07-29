import PropertyCard from "../components/PropertyCard";
import Search from "../components/Search";
import { useProperty } from "../hooks/propertieContext";
import { useLocation } from "react-router-dom";

const Properties = () => {
  const { properties } = useProperty();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  return (
    <div className="w-full h-full">
      {!isHomePage && <Search />}
      <div className="p-3">
        <h1 className="font-bold text-xl">Properties</h1>

        <div className="grid grid-cols-2 gap-2 mt-2">
          {properties?.map((property, idx) => (
            <PropertyCard key={idx} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;
