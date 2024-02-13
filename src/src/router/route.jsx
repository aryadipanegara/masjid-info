import { Routes, Route } from "react-router-dom";

import About from "../pages/about";
import NavbarWithSearch from "../components/templates/Navbar";
import FooterLinks from "../components/templates/Footer";
import Home from "../pages/home";
import Artikel from "../pages/artikel";
import ArticlePage from "../pages/artikelPage";

const index = () => {
  return (
    <>
      <NavbarWithSearch />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/about" element={<About />} />
        <Route path="/masjid/:ID" element={<ArticlePage />} />
      </Routes>
      <FooterLinks />
    </>
  );
};

export default index;
