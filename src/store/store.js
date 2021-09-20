import { createStore } from "@reduxjs/toolkit";
import reducer from "../reducers/reducer";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const store = createStore(reducer);
