"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { setInitialState } from "./slice/masjidSlice";
import { decrypt } from "./utils/crypto";

export default function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();

    if (typeof window !== "undefined") {
      try {
        const savedState = localStorage.getItem("masjidState");
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          // Decrypt the saved state
          const decryptedState = {
            likedMasjids: JSON.parse(decrypt(parsedState.likedMasjids)),
            bookmarkedMasjids: JSON.parse(
              decrypt(parsedState.bookmarkedMasjids)
            ),
            viewCounts: JSON.parse(decrypt(parsedState.viewCounts)),
            lastVisited: JSON.parse(decrypt(parsedState.lastVisited)),
          };
          storeRef.current.dispatch(setInitialState(decryptedState));
        }
      } catch (error) {
        console.error("Error loading state from localStorage:", error);
        // If there's an error, reset the state
        localStorage.removeItem("masjidState");
      }
    }
  }

  useEffect(() => {
    const handleStorage = () => {
      const savedState = localStorage.getItem("masjidState");
      if (savedState) {
        try {
          const parsedState = JSON.parse(savedState);
          const decryptedState = {
            likedMasjids: JSON.parse(decrypt(parsedState.likedMasjids)),
            bookmarkedMasjids: JSON.parse(
              decrypt(parsedState.bookmarkedMasjids)
            ),
            viewCounts: JSON.parse(decrypt(parsedState.viewCounts)),
            lastVisited: JSON.parse(decrypt(parsedState.lastVisited)),
          };
          storeRef.current?.dispatch(setInitialState(decryptedState));
        } catch (error) {
          console.error("Error parsing state from localStorage:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
