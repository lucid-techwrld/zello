import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import Search from "../components/Search";
import { useProperty } from "../hooks/propertieContext";

const Properties = () => {
  const { properties, getProperties, totalPages } = useProperty();
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const propertiesPage = location.pathname === "/properties";
  const homePage = location.pathname === "/";

  useEffect(() => {
    getProperties(currentPage);
  }, [currentPage, getProperties]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (homePage) {
      navigate("/properties");
      setCurrentPage(2);
    } else {
      if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="w-full h-full">
      {propertiesPage && <Search />}
      <div className="p-3">
        <h1 className="font-bold text-xl">Properties</h1>

        <div className="grid grid-cols-2 gap-2 mt-2">
          {properties?.map((property, idx) => (
            <PropertyCard key={idx} {...property} />
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="font-medium text-gray-700">Page {currentPage}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Properties;
