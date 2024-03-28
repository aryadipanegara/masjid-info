/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "../pages/about";
import NavbarWithSearch from "../components/templates/Navbar";
import FooterLinks from "../components/templates/Footer";
import Home from "../pages/home";
import Artikel from "../pages/artikel";
import ArticlePage from "../pages/artikelPage";
import SearchResult from "../components/SearchResult";
import MaintenancePage from "../pages/MaintenancePage";
import Login from "../auth/login";
import Logout from "../auth/logout";

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
        <Route path="/search/:searchTerms" element={<SearchResult />} />
        <Route path="/maintenance" component={<MaintenancePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <FooterLinks />
    </>
  );
};

export default index;
