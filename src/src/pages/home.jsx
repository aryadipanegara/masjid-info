import CardList from "../components/CardList";
import Carous from "../components/Carous";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Carous />
      <div className="container mx-auto">
        <div className="text-center my-8">
          <h1 className="text-3xl font-bold mb-4">
            Selamat Datang di Blog Masjid
          </h1>
          <p className="text-gray-600">
            Temukan informasi menarik seputar masjid dan sejarahnya. Mari
            tingkatkan pengetahuan kita!
          </p>
        </div>
        <CardList showPagination={false} />
        <div className="flex justify-center mt-4">
          <Link to="/artikel">
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
              Lihat Artikel Lainnya
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
