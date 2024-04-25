import { ActionTypes } from "../actionTypes";

export const addBookmark = (articleId) => ({
  type: ActionTypes.ADD_BOOKMARK,
  payload: articleId,
});

export const removeBookmark = (articleId) => ({
  type: ActionTypes.REMOVE_BOOKMARK,
  payload: articleId,
});
