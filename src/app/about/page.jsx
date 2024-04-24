const AboutPage = () => {
  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">Tentang Kami</h1>
      <p className="text-lg text-gray-600 text-center">
        Masjid Info adalah platform yang menyediakan informasi lengkap dan
        terpercaya tentang masjid-masjid di seluruh Indonesia. Kami berkomitmen
        untuk membantu masyarakat mendapatkan pengetahuan lebih tentang sejarah
        dan kegiatan masjid.
      </p>
      <div className="mt-8 text-center">
        <a href="/contact" className="text-blue-500 hover:underline">
          Hubungi Kami
        </a>
      </div>
    </div>
  );
};
export default AboutPage;
