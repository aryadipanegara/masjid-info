import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <div className="search-bar flex items-center border border-gray-300 rounded-lg p-1">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-1 pl-2 text-sm text-gray-900 bg-transparent focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-black text-white py-1 px-2 rounded ml-1 hover:bg-white focus:outline-none hover:text-black"
      >
        <FaSearch size={14} />
      </button>
    </div>
  );
};

export default SearchBar;
