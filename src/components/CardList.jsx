import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Pagination from "./Pagination";
import { CardListPlaceholderSkeleton } from "./loader/CardSkeleton";

const CardList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [masjids, setMasjids] = useState([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://masjid-info-api.vercel.app/api/masjid?page=${activePage}&limit=10`
        );
        const responseData = await response.json();

        if (
          responseData.status === "success" &&
          Array.isArray(responseData.data.data)
        ) {
          setMasjids(responseData.data.data);
        } else {
          console.error("Data from the server is not an array:", responseData);
        }
      } catch (error) {
        console.error("Error fetching masjid data:", error);
      }
    };

    fetchData();
  }, [activePage]);

  const truncateText = (text, wordLimit) => {
    if (!text || !text.split) {
      return "";
    }

    const words = text.split(" ");
    const truncatedText = words.slice(0, wordLimit).join(" ");
    return words.length > wordLimit ? truncatedText + "..." : truncatedText;
  };

  const truncateName = (name, wordLimit) => {
    if (!name || !name.split) {
      return "";
    }

    const words = name.split(" ");
    const truncatedName = words.slice(0, wordLimit).join(" ");
    return words.length > wordLimit ? truncatedName + "..." : truncatedName;
  };

  const showPagination = location.pathname === "/artikel";

  if (masjids.length === 0) {
    return <CardListPlaceholderSkeleton />;
  }

  return (
    <div className="container mx-auto pt-2">
      <div className="justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 py-8">
          {masjids
            .slice((activePage - 1) * 10, activePage * 10)
            .map((masjid) => (
              <Card
                key={masjid.id}
                className="w-full max-w-sm shadow-md transition-transform transform hover:scale-105 cursor-pointer mb-8"
                onClick={() => navigate(`/masjid/${masjid.id}`)}
              >
                {/* Use Bookmarks component here */}

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
                    {truncateText(masjid.sejarah[0].bagian, 5)}
                  </Typography>
                </CardBody>
              </Card>
            ))}
        </div>
      </div>
      {showPagination && <Pagination setActivePage={setActivePage} />}
    </div>
  );
};

export default CardList;
