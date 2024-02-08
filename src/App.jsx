import CardList from "./src/components/CardList";
import Carous from "./src/components/Carousel";
import Pagination from "./src/components/Pagination";
import { FooterWithSocialLinks } from "./src/components/footer/Footer";
import { NavbarWithSearch } from "./src/components/navbar/Navbar";

function App() {
  return (
    <>
      <div>
        <NavbarWithSearch />
        <Carous />
        <CardList />
        <Pagination />
        <FooterWithSocialLinks />
      </div>
    </>
  );
}

export default App;
