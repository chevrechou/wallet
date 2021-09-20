import React, { useState } from "react";
import useToken, { login } from "../utils";
import { useHistory } from "react-router-dom";
import { Button, Input, TextField } from "@material-ui/core";
import axios from "axios";

async function loginUser(credentials) {
  console.log(credentials);
  axios
    .post("http://localhost:4000/users/login", credentials)
    // .then((res) => {
    //   console.log(res.data);
    // })
    .then((data) => data)
    .catch((error) => {
      console.log(error);
    });
}
function Login({ user, handleLogin }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const { token, setToken } = useToken();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    // setToken(token);
    history.push("/");
  };

  return (
    <div className="signup-wrapper">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <p>Username</p>
        <TextField
          type="text"
          variant="outlined"
          onChange={(e) => setUserName(e.target.value)}
        />

        <p>Password</p>
        <TextField
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
export default Login;
