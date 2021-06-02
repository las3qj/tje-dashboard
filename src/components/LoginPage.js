import React, { useState } from "react";
import firebase from "../firebase/firebase";
import NavBar from "./NavBar";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const LoginPage = () => {
  const history = useHistory();
  const { setUser, forceUserReload } = useContext(UserContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [accessCode, setAccessCode] = useState();

  const logIn = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        setUser(user);
        history.push("/");
      })
      .catch((error) => {
        alert("Incorrect username or password");
        console.log(error);
      });
  };

  const createAccount = async (e) => {
    e.preventDefault();
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const uid = userCredential.user.uid;
    const userEmail = userCredential.user.email;
    await axios.post("http://localhost:8000/users", { uid, accessCode, email: userEmail });
    forceUserReload(true)
    history.push("/");
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
          type="text"
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
