import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import App from "./App";
import rootReducer from "./modules";
import "bootstrap/dist/css/bootstrap.min.css";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root"),
);
