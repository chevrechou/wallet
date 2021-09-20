import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import useToken, { isLogin } from "../utils";

const PublicRoute = ({ component: Component, user, ...rest }) => {
  
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
