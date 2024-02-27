import React from "react";
import { FaCopy, FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

const ShareButtons = ({ articleUrl, onCopyLink }) => {
  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    onCopyLink();
  };

  const handleShareWhatsApp = () => {
    // Menggunakan API WhatsApp untuk berbagi ke nomor tertentu
    const phoneNumber = "1234567890"; // Ganti dengan nomor ponsel tujuan di format internasional
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const handleShareInstagram = () => {
    // Link Instagram diarahkan ke laman web Instagram
    window.open(`https://www.instagram.com/`);
  };

  return (
    <div className="mt-4 flex items-center">
      <button
        className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        onClick={handleCopyLink}
      >
        <FaCopy size={18} className="mr-1" />
      </button>
      <div className="flex ml-2 space-x-2">
        <button
          className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
          onClick={handleShareWhatsApp}
        >
          <FaWhatsapp size={18} />
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleShareFacebook}
        >
          <FaFacebook size={18} />
        </button>
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleShareInstagram}
        >
          <FaInstagram size={18} />
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
