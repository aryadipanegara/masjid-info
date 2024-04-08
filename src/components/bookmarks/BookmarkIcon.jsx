import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const BookmarkIcon = ({ filled, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      {filled ? <FaBookmark color="blue" /> : <FaRegBookmark color="blue" />}
    </div>
  );
};

export default BookmarkIcon;
