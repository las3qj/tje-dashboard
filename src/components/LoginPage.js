import React, { useState } from "react";
import firebase from "../firebase/firebase";
import NavBar from "./NavBar";
import { TextField, Button } from "@material-ui/core";

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.error("Incorrect username or password");
      });
  };
  return (
    <div>
      <NavBar />
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2%",
          margin: "auto",
        }}
      >
        <TextField
          type="text"
          onChange={({ target }) => setEmail(target.value)}
          placeholder="Email"
          style={{ width: "15em" }}
        />
        <br />
        <TextField
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
          style={{ width: "15em" }}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "7em" }}
        >
          Sign in
        </Button>
      </form>
    </div>
  );
};
export default LoginPage;
