import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  toggleLike,
  toggleBookmark,
  incrementViewCount,
  updateLastVisited,
} from "../slice/masjidSlice";

export const useMasjid = () => {
  const dispatch = useDispatch<AppDispatch>();
  const masjidState = useSelector((state: RootState) => state.masjid);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  const showAlert = (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return {
    likedMasjids: masjidState.likedMasjids,
    bookmarkedMasjids: masjidState.bookmarkedMasjids,
    viewCounts: masjidState.viewCounts,
    lastVisited: masjidState.lastVisited,
    alert,
    toggleLike: (masjidId: string) => {
      dispatch(toggleLike(masjidId));
      const isLiked = masjidState.likedMasjids.includes(masjidId);
      showAlert(
        isLiked ? "Masjid dihapus dari suka" : "Masjid ditambahkan ke suka",
        "success"
      );
    },
    toggleBookmark: (masjidId: string) => {
      dispatch(toggleBookmark(masjidId));
      const isBookmarked = masjidState.bookmarkedMasjids.includes(masjidId);
      showAlert(
        isBookmarked
          ? "Masjid dihapus dari bookmark"
          : "Masjid ditambahkan ke bookmark",
        "success"
      );
    },
    incrementViewCount: (masjidId: string) =>
      dispatch(incrementViewCount(masjidId)),
    updateLastVisited: (masjidId: string) =>
      dispatch(updateLastVisited(masjidId)),
  };
};
