import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const ArticlePage = () => {
  const { ID } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/masjid/${ID}`);
        const masjidData = await response.json();

        if (masjidData) {
          setArticle(masjidData);
        } else {
          console.error("Article not found");
        }
      } catch (error) {
        console.error("Error fetching masjid data:", error);
      }
    };

    fetchData();
  }, [ID]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-screen-xl p-8">
      <Typography variant="subtitle" color="gray" className="mb-2 text-lg">
        {article.tanggal_dibuat}
      </Typography>

      <Typography variant="h3" color="lightBlue" className="mb-6">
        {article.nama_masjid}
      </Typography>

      <div className="mb-6">
        <Typography variant="body" color="blueGray">
          {article.lokasi}
        </Typography>
      </div>

      <div className="mb-6">
        <Typography variant="body" color="blueGray">
          {article.negara}
        </Typography>
      </div>

      <div className="mt-4 text-center">
        {article.foto_masjid &&
          article.foto_masjid
            .slice(0, 1)
            .map((foto, index) => (
              <img
                key={index}
                src={Object.values(foto)[0]}
                alt={`Foto Masjid ${article.id} - ${index + 1}`}
                className="mx-auto max-w-full rounded-md shadow-lg"
              />
            ))}
      </div>

      <Typography
        variant="subtitle"
        color="gray"
        className="mb-2 mt-8 text-lg"
      ></Typography>

      {article.sejarah &&
        Object.values(article.sejarah).map((bagian, index) => (
          <div key={index} className="mb-6">
            <Typography variant="body" color="blueGray" className=" text-black">
              {bagian}
            </Typography>

            {article.foto_masjid && article.foto_masjid[index + 1] && (
              <div className="mt-4 text-center">
                <img
                  src={article.foto_masjid[index + 1][`url${index + 2}`]}
                  alt={`Foto Masjid ${article.id} - ${index + 2}`}
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
