import { useState } from "react";

export default function SearchMasjid({ handleSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div>
      <form>
        <input
          className="text-black border-2 border-black rounded-full px-3 py-2"
          type="text"
          placeholder="Cari masjid..."
          value={query}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
