import { useEffect, useState } from "react";
import { Carousel, Typography } from "@material-tailwind/react";

const Carous = () => {
  const [masjidData, setMasjidData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://masjid-info-api.vercel.app/api/masjid");
        const data = await response.json();
        setMasjidData(data.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const limitedPhotos = masjidData.map((masjid) => {
    // Ambil satu foto pertama dari setiap masjid
    const firstPhoto = masjid.foto_masjid ? masjid.foto_masjid.foto_1 : null;
    return { url: firstPhoto, nama_masjid: masjid.nama_masjid };
  });

  return (
    <div className="container mx-auto">
      <div className="justify-center py-2">
        <Carousel
          additionalClasses="overflow-hidden rounded-lg shadow-md"
          responsive={[
            {
              breakpoint: "sm",
              options: {
                slidesPerView: 1,
              },
            },
            {
              breakpoint: "md",
              options: {
                slidesPerView: 2,
              },
            },
            {
              breakpoint: "lg",
              options: {
                slidesPerView: 3,
              },
            },
          ]}
          autoplay={true}
          infiniteLoop={true}
          arrow={{
            next: (
              <div className="flex items-center justify-center w-10 h-10 bg-black rounded-full">
                <span className="text-white">&#8250;</span>
              </div>
            ),
            prev: (
              <div className="flex items-center justify-center w-10 h-10 bg-black rounded-full">
                <span className="text-white">&#8249;</span>
              </div>
            ),
          }}
        >
          {limitedPhotos.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={photo.url}
                alt={photo.nama_masjid}
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <Typography variant="h5" className="text-lg font-bold my-1">
                  {photo.nama_masjid}
                </Typography>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Carous;
