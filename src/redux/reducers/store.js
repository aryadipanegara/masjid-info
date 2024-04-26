// reducers/bookmarkReducer.js

import { ActionTypes } from "../actionTypes";

const initialState = {
  articleBookmarks: JSON.parse(localStorage.getItem("bookmarks")) || [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BOOKMARK:
      return {
        ...state,
        articleBookmarks: [
          ...state.articleBookmarks,
          {
            nomorArtikel: action.payload.nomorArtikel,
            namaMasjid: action.payload.namaMasjid,
            url: action.payload.url,
            timestamp: action.payload.timestamp,
          },
        ],
      };
    case ActionTypes.REMOVE_BOOKMARK:
      return {
        ...state,
        articleBookmarks: state.articleBookmarks.filter(
          (bookmark) => bookmark.nomorArtikel !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default reducer;
