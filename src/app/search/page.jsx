"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const router = useRouter();
  const searchQuery = router?.query?.q || "";
  const [searchResults, setSearchResults] = useState(null);

  if (!searchQuery) {
    // Handle jika query tidak tersedia
    return <div>No search query provided</div>;
  }

  // Rest of the component logic

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // Lakukan permintaan pencarian ke server dengan query pencarian
        const response = await fetch(`/api/search?q=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    };

    if (searchQuery.trim() !== "") {
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
      {searchResults && (
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>{result.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
