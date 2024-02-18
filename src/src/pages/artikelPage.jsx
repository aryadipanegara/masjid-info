/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiCalendarFill, RiMapPin2Fill, RiEarthFill } from "react-icons/ri";

const ArticlePage = () => {
  const { ID } = useParams();
  const [id, setId] = useState(ID);
  const [masjid, setMasjid] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/masjid/${id}`);
        const masjidData = await response.json();

        console.log("Masjid data from API:", masjidData);

        if (masjidData.status === "success") {
          setMasjid(masjidData.data);
        } else {
          console.error("Masjid not found");
        }
      } catch (error) {
        console.error("Error fetching masjid data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!masjid) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-screen-xl p-8 bg-gray-100 rounded-md shadow-lg">
      <div className="flex items-center mb-4">
        <RiCalendarFill size={10} className="mr-2 text-black" />
        <span className="text-xs">{masjid.data.tanggal_dibuat}</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">{masjid.data.nama_masjid}</h1>
      <div className="flex items-center mb-2">
        <RiMapPin2Fill size={20} className="mr-2 text-black" />
        <span>{masjid.data.lokasi}</span>
      </div>
      <div className="flex items-center mb-4">
        <RiEarthFill size={20} className="mr-2 text-black" />
        <span>{masjid.data.negara}</span>
      </div>

      <div className="mt-4 text-center">
        {Object.entries(masjid.data.foto_masjid)
          .slice(0, 1)
          .map(([key, value], index) => (
            <img
              key={index}
              src={value}
              alt={`Foto Masjid ${masjid.data.id} - ${key}`}
              className="mx-auto max-w-full rounded-md shadow-lg"
            />
          ))}
      </div>

      {Object.entries(masjid.data.sejarah).map(([key, value], index) => (
        <div key={index} className="mb-6">
          <p className="text-lg mb-4">{value}</p>

          {masjid.data.foto_masjid &&
            masjid.data.foto_masjid[`foto_${index + 2}`] && (
              <div className="mt-4 text-center">
                <small className="block italic mb-2">MasjidInfo</small>
                <img
                  src={masjid.data.foto_masjid[`foto_${index + 2}`]}
                  alt={`Foto Masjid ${masjid.data.id} - ${index + 2}`}
                  className="mx-auto max-w-full rounded-md shadow-lg"
                />
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default ArticlePage;
