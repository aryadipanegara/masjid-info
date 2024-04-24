import { CarouselCustomNavigation } from "@/components/Crousel/Crousel";
import Blog from "@/app/blog/page";

const Home = () => {
  return (
    <div className="p-2">
      <CarouselCustomNavigation />
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold mb-4">
          Selamat Datang di Masjid Info
        </h1>
        <p className="text-gray-600">
          Temukan informasi menarik seputar masjid dan sejarahnya. Mari
          tingkatkan pengetahuan kita!
        </p>
        <div>
          <Blog showSearchMasjid={false} />
        </div>
      </div>
    </div>
  );
};

export default Home;
