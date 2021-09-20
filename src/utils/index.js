import { useState } from "react";
const TOKEN_KEY = "jwt";

export const login = () => {
  localStorage.setItem(TOKEN_KEY, "TestLogin");
};

export const logout = () => {
  console.log("out");
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    console.log("hhh", userToken);
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
