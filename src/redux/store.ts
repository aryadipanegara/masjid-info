import { configureStore } from "@reduxjs/toolkit";
import masjidReducer from "./slice/masjidSlice";
import logger from "redux-logger";
import { throttle } from "lodash";
import { encrypt } from "./utils/crypto";

const customMiddleware = (store: any) => (next: any) => (action: any) => {
  console.log("Dispatching action:", action.type);
  return next(action);
};

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      masjid: masjidReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logger, customMiddleware),
  });

  store.subscribe(
    throttle(() => {
      const state = store.getState().masjid;
      const encryptedState = {
        likedMasjids: encrypt(JSON.stringify(state.likedMasjids)),
        bookmarkedMasjids: encrypt(JSON.stringify(state.bookmarkedMasjids)),
        viewCounts: encrypt(JSON.stringify(state.viewCounts)),
        lastVisited: encrypt(JSON.stringify(state.lastVisited)),
      };
      localStorage.setItem("masjidState", JSON.stringify(encryptedState));
    }, 1000)
  );

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
