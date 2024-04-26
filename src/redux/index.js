import { createStore, combineReducers, applyMiddleware } from "redux";
import bookmarkReducer from "@/redux/reducers/store";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  bookmark: bookmarkReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
