import { combineReducers } from "redux";
import user from "./user";
import community from "./community";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persisConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user,
  community,
});

const persistedReducer = persistReducer(persisConfig, rootReducer);

export default persistedReducer;
