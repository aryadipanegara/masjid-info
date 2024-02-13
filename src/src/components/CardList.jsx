// Other imports...
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const CardList = () => {
  const navigate = useNavigate();
  const [masjids, setMasjids] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/masjid");
        const masjidData = await response.json();
        setMasjids(masjidData);
      } catch (error) {
        console.error("Error fetching masjid data:", error);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk memotong teks sejarah menjadi 20 kata
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

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 py-16">
          {masjids.map((masjid) => (
            <Card
              key={masjid.id}
              className="w-full shadow-md transition-transform transform hover:scale-105 cursor-pointer"
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
                  {truncateText(masjid.sejarah.bagian_1, 10)}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardList;
