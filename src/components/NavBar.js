import AppBar from "@material-ui/core/AppBar";
import { Button, Tab, Grid } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import firebase from "../firebase/firebase";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TrainRounded, TrendingUpOutlined } from "@material-ui/icons";

const useStyles = makeStyles({
  list: {
    width: 250,
    display: "flex",
    flexDirection: "column",
    backgroundColor: 'white',
    height: "100vh",
    color: "black"

  },
  fullList: {
    width: 'auto',
  },
  buttons: {
    backgroundColor: "white",
    "&:hover": {
      background: "#FDFD96", // <- add here your desired color, for demonstration purposes I chose red
    },
    marginBottom: 10,
    height: 50,
  }
});
export default function NavBar() {
  const history = useHistory();
  const { isLoggedIn } = useContext(UserContext);
  const [drawerOpen, setDrawerOpen] = useState(true)
  const classes = useStyles();

  const toggleDrawer = () => {

    console.log(!drawerOpen)
    setDrawerOpen(!drawerOpen)
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"

    >

      <Button
        size="small"
        color="inherit"
        label="Home"
        style={{ marginTop: 10 }}
        className={classes.buttons}
        value={0}
        onClick={() => {
          history.push("/");
          toggleDrawer()
        }}
      >Home</Button>
      <Button
        style={{ paddingLeft: "2%" }}
        className={classes.buttons}
        size="small"
        color="inherit"
        label="Class Dashboard"
        value={1}
        onClick={() => {
          history.push("/class-dashboard")
          toggleDrawer()
        }}
      >Class Dashboard</Button>
      <Button
        style={{ paddingLeft: "2%" }}
        className={classes.buttons}
        size="small"
        color="inherit"
        label="Student Directory"
        value={2}
        onClick={() => {
          history.push("/student-directory");
          toggleDrawer()
        }}
      >Student Directory</Button>
      <Button
        style={{ paddingLeft: "2%" }}
        className={classes.buttons}
        size="small"
        color="inherit"
        label="Teacher Directory"
        value={3}
        onClick={() => {
          history.push("/teacher-directory")
          toggleDrawer()
        }}
      >Teacher Directory</Button>
      <Button
        style={{ paddingLeft: "2%" }}
        className={classes.buttons}
        size="small"
        color="inherit"
        label="Calendar"
        value={4}
        onClick={() => {
          history.push("/calendar")
          toggleDrawer()
        }}
      >Calendar</Button>
    </div>
  );
  return (
    <div>
      <div style={{ height: "9vh" }} />

      <AppBar position="fixed" color="primary" style={{ background: '#2E3B55' }}>
        <div style={{ display: "flex" }}>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={2}>
              <IconButton edge="start" color="inherit" aria-label="open drawer">
                <MenuIcon style={{ fontSize: 40, color: "#FDFD96" }} onClick={() => { toggleDrawer() }} />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <div style={{paddingTop:"13px",textAlign: "center"}}>
                <Link to="/" style={{ fontSize: "3.5vh", fontWeight: "200", textDecoration:"None",color:"white"}}>TJ Elementary Mission Control 🚀</Link>
              </div>
            </Grid>
            <Grid item xs={2}>
              {!isLoggedIn && (
                <div style={{ paddingTop: "5%" }}>
                  <Button
                    style={{ backgroundColor: "#FDFD96" }}
                    size="small"
                    variant="contained"
                    label="Log In"
                    value={5}
                    onClick={() => history.push("/login")}
                  >Log in</Button>
                </div>
              )}
              {isLoggedIn && (
                <div style={{ paddingTop: "4%" }}>
                  <Button
                    style={{ backgroundColor: "#FDFD96" }}
                    variant="contained"
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
      <Drawer open={!drawerOpen} onClose={toggleDrawer}>
        {list()}
      </Drawer>
    </div>
  );
}
