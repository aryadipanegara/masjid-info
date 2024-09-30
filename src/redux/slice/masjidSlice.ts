import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MasjidState {
  likedMasjids: string[];
  bookmarkedMasjids: string[];
  viewCounts: Record<string, number>;
  lastVisited: Record<string, string>;
}

const initialState: MasjidState = {
  likedMasjids: [],
  bookmarkedMasjids: [],
  viewCounts: {},
  lastVisited: {},
};

export const masjidSlice = createSlice({
  name: "masjid",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const masjidId = action.payload;
      const index = state.likedMasjids.indexOf(masjidId);
      if (index > -1) {
        state.likedMasjids.splice(index, 1);
      } else {
        state.likedMasjids.push(masjidId);
      }
    },
    toggleBookmark: (state, action: PayloadAction<string>) => {
      const masjidId = action.payload;
      const index = state.bookmarkedMasjids.indexOf(masjidId);
      if (index > -1) {
        state.bookmarkedMasjids.splice(index, 1);
      } else {
        state.bookmarkedMasjids.push(masjidId);
      }
    },
    incrementViewCount: (state, action: PayloadAction<string>) => {
      const masjidId = action.payload;
      state.viewCounts[masjidId] = (state.viewCounts[masjidId] || 0) + 1;
    },
    updateLastVisited: (state, action: PayloadAction<string>) => {
      const masjidId = action.payload;
      state.lastVisited[masjidId] = new Date().toISOString();
    },
    setInitialState: (state, action: PayloadAction<MasjidState>) => {
      return action.payload;
    },
  },
});

export const {
  toggleLike,
  toggleBookmark,
  incrementViewCount,
  updateLastVisited,
  setInitialState,
} = masjidSlice.actions;

export default masjidSlice.reducer;
