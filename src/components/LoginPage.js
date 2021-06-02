import React, { useState } from "react";
import firebase from "../firebase/firebase";
import NavBar from "./NavBar";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [accessCode, setAccessCode] = useState();

  const logIn = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push("/"))
      .catch((error) => {
        alert("Incorrect username or password");
        console.log(error);
      });
  };

  const createAccount = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        axios.post("http://localhost:8000/users", { uid, accessCode });
        history.push("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <NavBar />
      <h1>Login</h1>
      <form
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
        <TextField
          type="password"
          onChange={({ target }) => setAccessCode(target.value)}
          placeholder="Access Code"
          style={{ width: "15em" }}
        />
        <br />
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: "7em" }}
            onClick={logIn}
          >
            Sign in
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: "12em", margin: "1%" }}
            onClick={createAccount}
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
