import { useEffect, useState } from "react";
import { Carousel, Typography } from "@material-tailwind/react";

const Carous = () => {
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

  // Ambil hanya 3 elemen pertama dari masjids
  const limitedMasjids = masjids.slice(0, 3);

  return (
    <div className="container mx-auto">
      <div className=" justify-center py-2">
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
          {limitedMasjids.map((masjid, index) => (
            <div key={index} className="relative">
              <img
                src={
                  masjid.foto_masjid.length > 0
                    ? masjid.foto_masjid[0].url1
                    : ""
                }
                alt={masjid.nama_masjid}
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute bottom-4 left-4 text-white ">
                <div className="#">{masjid.country}</div>
                <Typography variant="h5" className="text-lg font-bold my-1">
                  {masjid.nama_masjid}
                </Typography>
                <Typography variant="body2">{masjid.location}</Typography>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Carous;
