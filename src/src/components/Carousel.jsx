import { Carousel, Typography } from "@material-tailwind/react";

const Carous = () => {
  const masjids = [
    {
      name: "Masjid Omar Ali Saifuddien",
      location: "Lambak Kanan BS8711",
      image:
        "https://lh3.googleusercontent.com/proxy/1PUdCSQJQnZ2wF9obXbKdBixB_Czj2Un3xbf_qMyaAx3KixtT7F8RYxA-fzXaJmbENGjycmH1kabzDb-QjjWc5eEJQdlBSCL5fWhWYMqPbp8TGwXL2sMtfIDd9tLUYrgO0jkDaigZuIZDnbfvDE6agRqWxqzqTs=s680-w680-h510",
      country: "Brunei Darussalam",
    },
    {
      name: "Masjid Raya al-Azhom",
      location: "Kota Banten",
      image:
        "https://static.republika.co.id/uploads/images/xlarge/masjid-raya-al-azhom-menjadi-kebanggaan-masyarakat-kota-tangerang_210925193227-866.jpg",
      country: "Indonesia",
    },
    {
      name: "Masjid Jami al-Anwar",
      location: "Jakarta Barat",
      image:
        "https://static.republika.co.id/uploads/images/xlarge/masjid-jami-al-anwar-dahulu-pernah-menjadi-markas-para-pejuang_220903192743-865.jpg",
      country: "Indonesia",
    },
    // Add more entries as needed
  ];

  return (
    <div className="mx-auto max-w-screen-xl  py-2 ">
      <Carousel>
        {masjids.map((masjid, index) => (
          <div key={index} className="relative">
            <img
              src={masjid.image}
              alt={masjid.name}
              className="w-full max-w-screen-2xl h-96 object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-4 text-black">
              <Typography variant="h5" className="mb-1">
                {masjid.name}
              </Typography>
              <Typography variant="body2">
                {masjid.location}, {masjid.country}
              </Typography>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carous;
