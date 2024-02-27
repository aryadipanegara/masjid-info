import React from "react";
import { FaCopy, FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

const ShareButtons = ({ articleUrl, onCopyLink }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    onCopyLink();
  };

  const handleShareWhatsApp = () => {
    const phoneNumber = "62";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      articleUrl
    )}`;
    window.location.href = whatsappUrl;
  };

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      articleUrl
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const handleShareInstagram = () => {
    window.open(`https://www.instagram.com/`);
  };

  return (
    <div className="mt-4 flex items-center">
      <button
        className="bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded"
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
