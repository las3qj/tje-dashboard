import NavBar from "./NavBar";
import Footer from "./Footer";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import firebase from "../firebase/firebase";
import { useHistory } from "react-router-dom";
import axios from "axios"

function AccountPage() {

  document.body.style='background:"white";';
  
  const history = useHistory();
  const { firstName, lastName, isLoggedIn, role, id, user, forceUserReload} = useContext(UserContext);
  const [editActive, setEditActive] = useState(false);
  const [newAccessCode, setNewAccessCode] = useState(id);


  const saveAccessCode = () => {
    axios
      .put("/users", {
        user: user.uid,
        accessCode: newAccessCode,
      })
      .then(() => {
        forceUserReload();
        setEditActive(false);
      });
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete Account?")) return null;
    await user.delete()
    await axios.delete("/users", {data: {user: user.uid}})
    history.push("/")
  }

  if (!isLoggedIn) history.push("/login");
  return (
    <div>
      <NavBar />

      <h1>My Account</h1>
      <h2>
        Welcome, {firstName} {lastName}!
      </h2>

      <p>Role: {role} </p>
      {editActive ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5em",
              alignItems: "center",
            }}
          >
            Access Code:
            <TextField
              value={newAccessCode}
              onChange={(e) => setNewAccessCode(e.target.value)}
            />
          </div>
          <br />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => saveAccessCode()}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <p>Access Code: {id}</p>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setEditActive(true)}
          >
            Change Access Code
          </Button>
        </>
      )}

      <br />
      <br />
      <Button
        variant="contained"
        style={{ color: "#ff6961" }}
        onClick={() => {
          firebase.auth().signOut();
          history.push("/");
        }}
      >
        Log Out
      </Button>

      <br />
      <br />

      <Button
        variant="contained"
        style={{ backgroundColor: "#ff6961", color: "black" }}
        onClick={() => {
          handleDelete()
        }}
      >
        Delete Account
      </Button>

      <Footer />
    </div>
  );
}

export default AccountPage;
