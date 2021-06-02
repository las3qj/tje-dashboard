import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import firebase from "../firebase/firebase";

export default function NavBar() {
  const history = useHistory();
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div>
      <AppBar position="static">
        <div style={{ display: "flex" }}>
          <Tab
            label="Home"
            value={0}
            onClick={() => {
              history.push("/");
            }}
          />
          <Tab
            label="Class Dashboard"
            value={1}
            onClick={() => history.push("/class-dashboard")}
          />
          <Tab
            label="Student Directory"
            value={2}
            onClick={() => {
              history.push("/student-directory");
            }}
          />
        <Tab 
           label="Teacher Directory" 
            value={2} 
            onClick={() => { 
              history.push("/teacher-directory") 
            }} 
          />
          <Tab
            label="Calendar"
            value={3}
            onClick={() => history.push("/calendar")}
          />
          {!isLoggedIn && (
            <Tab
              label="Log In"
              value={4}
              onClick={() => history.push("/login")}
            />
          )}
          {isLoggedIn && (
            <Tab
              label="Log Out"
              value={5}
              onClick={() => firebase.auth().signOut()}
            />
          )}
        </div>
      </AppBar>
    </div>
  );
}
