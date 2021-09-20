import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store, history } from "./store/store";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import Main from "./components/Main";
import { MainProvider } from "./reducers/mainReducer";

// import "./styles/main.scss";

ReactDOM.render(
  <Provider store={store}>
    <MainProvider>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </MainProvider>
  </Provider>,
  document.getElementById("root")
);
