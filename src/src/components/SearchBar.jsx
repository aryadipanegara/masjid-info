import { Input } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="relative flex w-full gap-2 md:w-max">
      <Input
        type="search"
        placeholder="Search"
        containerProps={{
          className: "min-w-[288px]",
        }}
        className="!border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <div className="!absolute left-3 top-[13px]">
        <FaSearch size={16} color="#CFD8DC" />
      </div>
    </div>
  );
};

export default SearchBar;
