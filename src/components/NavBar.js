import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useState, } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from "react-router-dom";



export default function NavBar() {
    const history = useHistory()
    return (
        <div>
            <AppBar position="static">
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Home" onClick={() => { history.push("/") }} />
                    <Tab label="Student Directory" onClick={() => { history.push("/student-directory") }} />
                    <Tab label="Item Three" />
                </Tabs>
            </AppBar>
        </div>
    )
}