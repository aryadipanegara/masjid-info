import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { fetchMasjidData } from "../utils/api";

const ArticlePage = () => {
  const { ID } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const masjidData = await fetchMasjidData();
        const foundArticle = masjidData.find((masjid) => masjid.id === ID);

        if (foundArticle) {
          setArticle(foundArticle);
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
        Sejarah: {article.sejarah}
      </Typography>
      <Typography variant="subtitle" color="gray" className="mb-2">
        Negara: {article.negara}
      </Typography>
      <Typography variant="subtitle" color="gray" className="mb-2">
        Tanggal Dibuat: {article.tanggal_dibuat}
      </Typography>
    </div>
  );
};

export default ArticlePage;
