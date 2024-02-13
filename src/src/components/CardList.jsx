import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { fetchMasjidData, updateMasjidData } from "../utils/api";

const CardList = () => {
  const navigate = useNavigate();
  const [masjids, setMasjids] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const masjidData = await fetchMasjidData();
        setMasjids(masjidData);
      } catch (error) {
        console.error("Error fetching masjid data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateMasjid = async (id, newData) => {
    try {
      await updateMasjidData(id, newData);
      const updatedData = await fetchMasjidData();
    } catch (error) {
      console.error(`Error updating masjid data with ID ${id}:`, error);
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
                    masjid.foto_masjid.length > 0 ? masjid.foto_masjid[0] : ""
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
                  {masjid.sejarah}
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
