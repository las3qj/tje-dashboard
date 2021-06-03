import AppBar from "@material-ui/core/AppBar";
import {Button,Tab,Grid} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import firebase from "../firebase/firebase";

export default function NavBar() {
  const history = useHistory();
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div>
      <AppBar position="static" color="primary" style={{ background: '#2E3B55' }}>
        <div style={{ display: "flex" }}>
        <Grid container item xs={12} spacing={1}>
        <Grid item xs={4}>
            <h1 style={{fontSize:"3.3vh", paddingLeft:15, fontWeight:"200"}}>TJ Elementary Mission Control 🚀</h1>
        </Grid>
        <Grid item xs={7}>
        <div style={{paddingTop:"2.5%"}}>
          <Button
            size="small"
            color="inherit"
            label="Home"
            value={0}
            onClick={() => {
              history.push("/");
            }}
          >Home</Button>
          <Button
          style={{paddingLeft:"2%"}}
          size="small"
            color="inherit"
            label="Class Dashboard"
            value={1}
            onClick={() => history.push("/class-dashboard")}
          >Class Dashboard</Button>
          <Button
          style={{paddingLeft:"2%"}}
          size="small"
            color="inherit"
            label="Student Directory"
            value={2}
            onClick={() => {
              history.push("/student-directory");
            }}
          >Student Directory</Button>
        <Button 
        style={{paddingLeft:"2%"}}
        size="small"
            color="inherit"
           label="Teacher Directory" 
            value={3} 
            onClick={() => { 
              history.push("/teacher-directory") 
            }} 
          >Teacher Directory</Button>
          <Button
          style={{paddingLeft:"2%"}}
          size="small"
            color="inherit"
            label="Calendar"
            value={4}
            onClick={() => history.push("/calendar")}
          >Calendar</Button>
          </div>
          </Grid>
          <Grid item xs={1}>
          {!isLoggedIn && (
              <div style={{paddingTop:"15%"}}>
            <Button 
            style={{backgroundColor:"#FDFD96"}}
            size="small"
            variant="contained"
              label="Log In"
              value={5}
              onClick={() => history.push("/login")}
            >Log in</Button>
            </div>
          )}
          {isLoggedIn && (
              <div style={{paddingTop:"15%"}}>
            <Button
            style={{backgroundColor:"#FDFD96"}}
            size="small"
              label="Log Out"
              value={6}
              onClick={() => history.push("/account")}
            >My Account</Button>
            </div>
          )}
          </Grid>
          </Grid>
        </div>
      </AppBar>
    </div>
  );
}
