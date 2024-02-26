import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { MdImageNotSupported } from "react-icons/md";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Pagination from "./Pagination";
import { CardListPlaceholderSkeleton } from "./loader/CardSkeleton";

const NoResultsMessage = ({ searchTerms }) => (
  <div className="text-center mt-8">
    <p className="text-gray-500">Tidak ada artikel "{searchTerms}"</p>
    <MdImageNotSupported size={64} className="mt-4 mx-auto text-gray-400" />
  </div>
);

const SearchResult = () => {
  const { searchTerms } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://masjid-info-api.vercel.app/api/masjid/search?q=${searchTerms}&page=${activePage}`
        );
        const data = await response.json();

        if (data.status === "success" && Array.isArray(data.data.data)) {
          setSearchResults(data.data.data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerms, activePage]);

  const truncateText = (text, wordLimit) => {
    if (text && text.split) {
      const words = text.split(" ");
      const truncatedText = words.slice(0, wordLimit).join(" ");
      return words.length > wordLimit ? truncatedText + "..." : truncatedText;
    } else {
      return "";
    }
  };

  const truncateName = (name, wordLimit) => {
    if (name && name.split) {
      const words = name.split(" ");
      const truncatedName = words.slice(0, wordLimit).join(" ");
      return words.length > wordLimit ? truncatedName + "..." : truncatedName;
    } else {
      return "";
    }
  };

  const showPagination = location.pathname === "/search";

  return (
    <div className="container mx-auto pt-2">
      {isLoading ? (
        <CardListPlaceholderSkeleton />
      ) : searchResults.length === 0 ? (
        <NoResultsMessage searchTerms={searchTerms} />
      ) : (
        <div className="justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 py-8">
            {searchResults.map((masjid) => (
              <Card
                key={masjid.id}
                className="w-full max-w-sm shadow-md transition-transform transform hover:scale-105 cursor-pointer mb-8"
                onClick={() => navigate(`/masjid/${masjid.id}`)}
              >
                <CardHeader color="blue-gray">
                  <img
                    src={
                      masjid.sejarah &&
                      masjid.sejarah[0] &&
                      masjid.sejarah[0].fotoUrl
                        ? masjid.sejarah[0].fotoUrl
                        : ""
                    }
                    alt={`Masjid ${masjid.id}`}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardBody className="flex flex-col">
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {truncateName(masjid.nama_masjid, 4)}
                  </Typography>
                  <Typography className="text-gray-700 mb-4">
                    {truncateText(masjid.sejarah?.bagian_1, 5)}
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}
      {showPagination && <Pagination setActivePage={setActivePage} />}
    </div>
  );
};

export default SearchResult;
