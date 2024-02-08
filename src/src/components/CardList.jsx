/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
// Ganti cara mengimpor komponen dari @material-tailwind/react
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button as MaterialButton,
} from "@material-tailwind/react";

import { fetchMasjidData, updateMasjidData } from "../utils/api";

const CardList = () => {
  const [masjids, setMasjids] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const masjidData = await fetchMasjidData(); // Memanggil API data masjid
        setMasjids(masjidData);
      } catch (error) {
        console.error("Error fetching masjid data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateMasjid = async (id, newData) => {
    try {
      await updateMasjidData(id, newData); // Menggunakan fungsi updateMasjidData dari api.js
      const updatedData = await fetchMasjidData(); // Menggunakan fungsi fetchMasjidData dari api.js
      setMasjids(updatedData);
    } catch (error) {
      console.error(`Error updating masjid data with ID ${id}:`, error);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl py-2">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600 mb-8 pb-2">
          Here, we share about mosques and the history of mosques, which will
          broaden your insight.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {masjids.map((masjid) => (
            <Card key={masjid.id} className="w-full">
              <CardHeader color="blue-gray">
                <img
                  src={
                    masjid.foto_masjid.length > 0 ? masjid.foto_masjid[0] : ""
                  }
                  alt={`Masjid ${masjid.id}`}
                  className="w-full h-40 object-cover"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {masjid.nama_masjid}
                </Typography>
                <Typography>{masjid.sejarah}</Typography>
              </CardBody>
              <CardFooter className="pt-5">
                <MaterialButton color="black">
                  <button to={`/masjid/${masjid.id}`}>Read More</button>
                </MaterialButton>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardList;
