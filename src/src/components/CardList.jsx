import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Pagination from "./Pagination";

const CardList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [masjids, setMasjids] = useState([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/masjid?page=${activePage}`
        );
        const masjidData = await response.json();
        setMasjids(masjidData);
      } catch (error) {
        console.error("Error fetching masjid data:", error);
      }
    };

    fetchData();
  }, [activePage]);

  const truncateText = (text, wordLimit) => {
    if (text && text.split) {
      const words = text.split(" ");
      return words.length > wordLimit
        ? words.slice(0, wordLimit).join(" ") + "..."
        : text;
    } else {
      return "";
    }
  };

  const showPagination = location.pathname === "/artikel";

  return (
    <div className="container mx-auto pt-2">
      <div className="justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-8 py-8">
          {masjids.map((masjid) => (
            <Card
              key={masjid.id}
              className="w-full max-w-sm shadow-md transition-transform transform hover:scale-105 cursor-pointer mb-8"
              onClick={() => navigate(`/masjid/${masjid.id}`)}
            >
              <CardHeader color="blue-gray">
                <img
                  src={
                    masjid.foto_masjid.length > 0
                      ? masjid.foto_masjid[0].url1
                      : ""
                  }
                  alt={`Masjid ${masjid.id}`}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardBody className="flex flex-col">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {masjid.nama_masjid}
                </Typography>
                <Typography className="text-gray-700 mb-4">
                  {truncateText(masjid.sejarah.bagian_1, 5)}
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
