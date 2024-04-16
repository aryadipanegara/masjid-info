import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSearch = (event) => {
    event.preventDefault();

    // Navigasi ke halaman pencarian hanya jika query tidak kosong
    if (searchQuery.trim() !== "") {
      const encodedSearchQuery = encodeURIComponent(searchQuery);
      router.push(`/search?location=${encodedSearchQuery}`);
    }
  };

  return (
    <form
      onSubmit={onSearch}
      className="flex justify-center w-full max-w-md mx-auto"
    >
      <input
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="w-full px-4 py-2 rounded-full border-2 border-gray-200 focus:outline-none focus:border-blue-500"
        placeholder="Search..."
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
