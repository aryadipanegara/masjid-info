import CardList from "../components/CardList";
import Carous from "../components/Carous";
import Pagination from "../components/Pagination";

export default function Home() {
  return (
    <div>
      <Carous />
      <div className="mx-auto max-w-screen-xl py-2">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">Blog</h1>
          <p className="text-gray-600">
            Here, we share about mosques and the history of mosques, which will
            broaden your insight.
          </p>
        </div>
        <CardList />
      </div>
      <Pagination />
    </div>
  );
}
