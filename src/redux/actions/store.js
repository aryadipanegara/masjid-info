// actions.js

import { v4 as uuidv4 } from "uuid";
import { ActionTypes } from "../actionTypes";

export const addBookmark = ({ nomorArtikel, namaMasjid, url, timestamp }) => {
  const bookmarkId = uuidv4();

  // Ambil data bookmarks dari Local Storage
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  // Tambahkan bookmark baru ke array bookmarks
  bookmarks.push({
    nomorArtikel,
    namaMasjid,
    url,
    timestamp,
    bookmarkId,
  });

  // Simpan kembali array bookmarks ke Local Storage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  return {
    type: ActionTypes.ADD_BOOKMARK,
    payload: {
      nomorArtikel,
      namaMasjid,
      url,
      timestamp,
      bookmarkId,
    },
  };
};

export const removeBookmark = (bookmarkId) => {
  // Ambil data bookmarks dari Local Storage
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  // Filter bookmark yang memiliki bookmarkId yang sama dengan yang diberikan
  const filteredBookmarks = bookmarks.filter(
    (bookmark) => bookmark.bookmarkId !== bookmarkId
  );

  // Simpan kembali array filteredBookmarks ke Local Storage
  localStorage.setItem("bookmarks", JSON.stringify(filteredBookmarks));

  return {
    type: ActionTypes.REMOVE_BOOKMARK,
    payload: bookmarkId,
  };
};
