import Main from "./components/Main";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";
import PublicRoute from "./router/PublicRoute";
import "../src/styles/login.scss";

import "../src/styles/main.scss";
import "../src/styles/form.scss";
import "../src/styles/table.scss";

import { useEffect, useState } from "react";
import Login from "./components/SignIn";
import useToken from "./utils";
import Unauthorized from "./router/Unauthorized";
import SignUp from "./components/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/signup" component={SignUp} />

        <PrivateRoute exact path="/" component={Main} />
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />

        {/* <PublicRoute exact path="/unauthorized" component={Unauthorized} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
