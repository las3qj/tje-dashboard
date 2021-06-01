import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory } from "react-router-dom";

export default function NavBar() {
    const history = useHistory()

    return (
        <div>
            <AppBar position="static">
                <div style={{ display: "flex" }}>
                    <Tab label="Home" value={0} onClick={() => { history.push("/") }} />
                    <Tab label="Class Dashboard" value={1} onClick={() => history.push("/class-dashboard")} />
                    <Tab label="Student Directory" value={2} onClick={() => { history.push("/student-directory") }} />
                    <Tab label="Calendar" onClick={() => history.push("/calendar")} />
                </div>
            </AppBar>
        </div>
    )
}
