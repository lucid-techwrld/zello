import { SearchIcon, SlidersHorizontal } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>(["House"]);

  const handleItemFilter = (item: string): void => {
    if (selectedItems.includes(item)) {
      const newSelect = selectedItems.filter((prod: string) => prod !== item);
      setSelectedItems(newSelect);
    } else {
      setSelectedItems((prevItem) => [...prevItem, item]);
    }
  };

  const filterList: string[] = [
    "House",
    "Apartment",
    "Hotel",
    "Villa",
    "Mansion",
    "Duplex",
    "Flat",
  ];

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const keyword = formData.get("search") as string;
    navigate(`/search/${keyword}`);
  };

  return (
    <div className="p-3 w-full h-auto flex flex-col gap-2">
      <div className="w-full flex gap-2 items-center">
        <form
          className="w-[85%] relative"
          onSubmit={(e) => handleSearchSubmit(e)}
        >
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
        <div className="w-[15%] h-10 gradient flex justify-center items-center text-white">
          <SlidersHorizontal className="w-5 h-5" />
        </div>
      </div>

      {/* Filter by products */}
      <ul className="flex gap-4 overflow-scroll">
        {filterList.map((item, index) => (
          <li
            className={`px-4 py-2 ${
              selectedItems.includes(item)
                ? "gradient text-white "
                : "bg-gray-100 rounded-md text-gray-600"
            }`}
            key={index}
            onClick={() => handleItemFilter(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
