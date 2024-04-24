import { useState } from "react";

export default function SearchMasjid({ handleSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="flex justify-center mt-5">
      <form className="w-full max-w-sm">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Cari masjid..."
            aria-label="Cari masjid"
            value={query}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}
