import { combineReducers } from "redux";
import user from "./user";
import community from "./community";
import goods from "./goods";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persisConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user,
  community,
  goods,
});

const persistedReducer = persistReducer(persisConfig, rootReducer);

export default persistedReducer;
