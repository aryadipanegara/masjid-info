"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchInput from "@/components/search/SearchInput";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const { q } = router.query || "";

  useEffect(() => {
    // Lakukan pencarian menggunakan API berdasarkan query pencarian dari URL
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/masjid?q=${q}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (q) {
      fetchData();
    }
  }, [q]);

  return (
    <div>
      <h1>Search Page</h1>
      <SearchInput initialQuery={q || ""} />
      <ul>
        {searchResults.map((masjid) => (
          <li key={masjid.id}>{masjid.name}</li>
        ))}
      </ul>
    </div>
  );
}
