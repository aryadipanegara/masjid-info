import { ActionTypes } from "../actionTypes";

const initialState = {
  articles: [],
  loading: true,
  articleBookmarks: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ARTICLE_BOOKMARKS:
      return {
        ...state,
        articleBookmarks: action.payload,
      };
    case ActionTypes.ADD_BOOKMARK:
      return {
        ...state,
        articleBookmarks: [...state.articleBookmarks, action.payload],
      };
    case ActionTypes.REMOVE_BOOKMARK:
      return {
        ...state,
        articleBookmarks: state.articleBookmarks.filter(
          (id) => id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default reducer;
