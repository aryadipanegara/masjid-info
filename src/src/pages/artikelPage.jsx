/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiCalendarFill, RiMapPin2Fill, RiEarthFill } from "react-icons/ri";
import SkeletonLoading from "../components/loader/artikelSkeleton";

const ArticlePage = () => {
  const { ID } = useParams();
  const [id, setId] = useState(ID);
  const [masjid, setMasjid] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://masjid-info-api.vercel.app/api/masjid/${id}`
        );
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
    return <SkeletonLoading />;
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

      {Object.entries(masjid.data.foto_masjid).map(([key, foto], index) => (
        <div key={index} className="mt-4 text">
          <small className="block italic mb-2 text-center">MasjidInfo</small>
          <img
            src={foto}
            alt={`Foto Masjid ${masjid.id} - ${key}`}
            className="mx-auto max-w-full rounded-md shadow-lg"
          />
          {masjid.data.sejarah &&
            masjid.data.sejarah[`bagian_${index + 1}`] && (
              <div className="mb-6">
                <p className="text-lg mb-4 pt-4">
                  {masjid.data.sejarah[`bagian_${index + 1}`]}
                </p>
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default ArticlePage;
