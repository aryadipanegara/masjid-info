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
          `https://masjid-info-api.vercel.app/api/masjid${id}`
        );
        const masjidData = await response.json();

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

  // Function to create paragraphs from text with line breaks
  const createParagraphs = (text) => {
    return text.split(/[\r\n]+/).map((paragraph, idx) => (
      <p key={idx} className="text-lg pt-2">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="mx-auto max-w-screen-xl p-8 bg-gray-100 rounded-md shadow-lg">
      <div className="flex items-center mb-4">
        <RiCalendarFill size={20} className="mr-2 text-black" />
        <span className="text-xs">
          {masjid.tanggal_dibuat || "Tanggal Dibuat Tidak Tersedia"}
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">
        {masjid.nama_masjid || "Nama Masjid Tidak Tersedia"}
      </h1>
      <div className="flex items-center mb-2">
        <RiMapPin2Fill size={20} className="mr-2 text-black" />
        <span>{masjid.lokasi || "Lokasi Tidak Tersedia"}</span>
      </div>
      <div className="flex items-center mb-4">
        <RiEarthFill size={20} className="mr-2 text-black" />
        <span>{masjid.negara || "Negara Tidak Tersedia"}</span>
      </div>

      {masjid.sejarah &&
        masjid.sejarah.map((sejarah, index) => (
          <div key={index} className="mt-4 text">
            <small className="block italic mb-2 text-center">
              {sejarah.keterangan || "Keterangan Tidak Tersedia"}
            </small>
            {sejarah.fotoUrl && (
              <img
                src={sejarah.fotoUrl}
                alt={`Foto Masjid ${masjid.id} - ${index + 1}`}
                className="mx-auto max-w-full rounded-md shadow-lg"
              />
            )}
            {createParagraphs(sejarah.bagian)}
          </div>
        ))}

      {masjid.data?.sejarah &&
        masjid.data?.sejarah.map((sejarah, index) => (
          <div key={index} className="mt-4 text">
            {createParagraphs(sejarah.bagian)}
            {sejarah.keterangan && (
              <div className="mb-6">
                <p className="text-lg mb-4 pt-4">{sejarah.keterangan}</p>
              </div>
            )}
          </div>
        ))}

      {masjid.foto_masjid &&
        masjid.foto_masjid.map((fotoMasjid, index) => (
          <div key={index} className="mt-4 text">
            <small className="block italic mb-2 text-center">
              {fotoMasjid.keterangan || "Keterangan Tidak Tersedia"}
            </small>
            <img
              src={fotoMasjid.url}
              alt={`Foto Masjid ${masjid.id} - ${index + 1}`}
              className="mx-auto max-w-full rounded-md shadow-lg"
            />
          </div>
        ))}
    </div>
  );
};

export default ArticlePage;
