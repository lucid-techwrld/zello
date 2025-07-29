import { SearchIcon, SlidersHorizontal } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  const slugify = (text: string) =>
    text.trim().toLowerCase().replace(/\s+/g, "-");

  const [selectedItems, setSelectedItems] = useState<string>("all");

  const handlePropertyFilter = (word: string): void => {
    const slug = slugify(word);
    console.log(slug);
    setSelectedItems(slug);
    if (!slug) return;
    if (slug === "all") {
      navigate(`/properties`);
      return;
    }
    navigate(`/search/${slug}`);
  };

  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  const filterList: string[] = [
    "All",
    "Self Contain",
    "MiniFlat",
    "Single Room",
    "1-Bedroom-Flat",
    "2-Bedroom-Flat",
    "3-Bedroom-Flat",
    "Bungalow",
    "Duplex",
    "Terrace",
    "Detached",
    "Shared Apartment",
    "Penthouse",
    "Mansion",
    "Short Let",
    "Serviced Apartment",
    "Furnished Apartment",
    "Face-me-I-face-you",
    "Office-Space",
    "Shop/Store",
    "Warehouse",
    "Event-Center/Hall",
  ];

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const keyword = formData.get("search") as string;
    const slug = slugify(keyword);
    if (!slug) return;
    navigate(`/search/${slug}`);
    form.reset();
  };

  return (
    <div className="p-3 w-full h-auto flex flex-col gap-2">
      <div className="w-full flex gap-2 items-center">
        <form className="flex-grow relative" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="search"
            id="search"
            className="bg-gray-200 w-full h-10 rounded-md pl-10  border-none outline-none placeholder:text-sm"
            placeholder="Search address or near you"
          />
          <SearchIcon className="absolute top-2 left-3" />
        </form>

        {/*Filter*/}
        <div className="w-10 h-10 gradient flex justify-center items-center text-white">
          <SlidersHorizontal className="w-5 h-5" />
        </div>
      </div>

      {/* Filter by products */}
      <ul className="flex gap-4 overflow-scroll">
        {filterList.map((item, index) => (
          <li
            className={`px-4 py-2 whitespace-nowrap ${
              selectedItems === slugify(item)
                ? "gradient text-white "
                : "bg-gray-100 rounded-md text-gray-600"
            }`}
            key={index}
            onClick={() => handlePropertyFilter(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
