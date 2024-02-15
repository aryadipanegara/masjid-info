import CardList from "../components/CardList";
import Carous from "../components/Carous";
import Category from "../components/Category";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Carous />
      <div className="container mx-auto">
        <div className="justify-center">
          <h1 className="text-3xl font-bold mb-4">Blog</h1>
          <p className="text-gray-600">
            Disini kami berbagi tentang masjid dan sejarah masjid, semoga
            menambah wawasan anda.
          </p>
          <div className="px-2 pt-4 pb-4">
            <Category />
          </div>
        </div>
        <CardList showPagination={false} />
        <div className="flex justify-center mt-4">
          
          <Link to="/artikel">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Masjid Lainnya
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
