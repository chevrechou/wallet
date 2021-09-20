import React, { useState } from "react";
import useToken, { login } from "../utils";
import { useHistory } from "react-router-dom";
import { Button, Input, TextField } from "@material-ui/core";
import axios from "axios";

async function signUp(credentials) {
  const userObject = {
    name: credentials.username,
    email: credentials.email,

    password: credentials.password,
  };

  axios
    .post("http://localhost:4000/users/create", userObject)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
function SignUp() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const { token, setToken } = useToken();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await signUp({
      username,
      password,
      email,
    });
    setToken(token);
    history.push("/");
  };

  return (
    <div className="login-wrapper">
      <h1>Please Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <TextField
            type="text"
            variant="outlined"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          <p>Email</p>
          <TextField
            type="email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <TextField
            type="password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div>
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
export default SignUp;
