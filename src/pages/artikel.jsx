import React from "react";
import CardList from "../components/CardList";

const Artikel = () => {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto my-8">
        <h1 className="text-4xl font-bold text-black mb-4">Artikel Masjid</h1>
        <CardList />
      </div>
    </div>
  );
};

export default Artikel;
