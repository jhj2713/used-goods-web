import { combineReducers } from "redux";
import user from "./user";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persisConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user,
});

const persistedReducer = persistReducer(persisConfig, rootReducer);

export default persistedReducer;
