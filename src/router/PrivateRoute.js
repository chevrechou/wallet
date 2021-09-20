import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import useToken from "../utils";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useToken();
  return (
    <Route
      {...rest}
      render={(props) =>
        !token ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
