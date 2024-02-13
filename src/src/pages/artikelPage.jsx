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
      <Typography variant="h3" color="blue-gray" className="mb-4">
        {article.nama_masjid}
      </Typography>
      <Typography variant="subtitle" color="gray" className="mb-2">
        Lokasi: {article.lokasi}
      </Typography>
      <Typography variant="subtitle" color="gray" className="mb-2">
        Tanggal Dibuat: {article.tanggal_dibuat}
      </Typography>
      <Typography variant="subtitle" color="gray" className="mb-2">
        Negara: {article.negara}
      </Typography>

      {article.foto_masjid &&
        article.foto_masjid.map((foto, index) => (
          <div key={index} className="mt-4 text-center">
            <img
              src={Object.values(foto)[0]}
              alt={`Foto Masjid ${article.id} - ${index + 1}`}
              className="mx-auto max-w-full rounded-md"
            />
          </div>
        ))}

      <Typography variant="subtitle" color="gray" className="mb-2 mt-4">
        Sejarah:
      </Typography>

      {article.sejarah.split("\n").map((paragraph, index) => (
        <div key={index} className="mb-4">
          <Typography variant="subtitle" color="gray">
            {paragraph}
          </Typography>

          {article.foto_masjid && article.foto_masjid[index + 1] && (
            <div className="mt-4 text-center">
              <img
                src={Object.values(article.foto_masjid[index + 1])[0]}
                alt={`Foto Masjid ${article.id} - ${index + 2}`}
                className="mx-auto max-w-full rounded-md"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArticlePage;
