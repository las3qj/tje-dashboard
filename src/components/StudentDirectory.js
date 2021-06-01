import NavBar from "./NavBar"
import { useEffect, useState } from 'react';
import AddPersonForm from "./AddPersonForm"
import { makeStyles } from '@material-ui/core/styles';
import PersonCard from "./PersonCard"
import { Grid, Button } from '@material-ui/core'
import { FiArrowDown } from "react-icons/fi";
import { FiArrowUp } from "react-icons/fi";
import '../App.css';
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",


    },
    studentList: {
        display: "flex",
        flexDirection: "column"
    }

}));


export default function StudentDirectory() {
    const classes = useStyles();
    useEffect(() => {
        fetchStudents()
    }, [])
    const [students, setStudents] = useState([])
    const [edit, setEdit] = useState(false);
    const [save, setSave] = useState(false);

    const fetchStudents = () => {
        const url = new URL("http://localhost:8000/students");
        const axios = require('axios');
        axios.get(url)
            .then(response => {
                console.log(response.data);
                setStudents(response.data)
            }, error => {
                console.log(error);
            });
    }

    const sortNameDown = () => {
        const newStudents = [...students]
        newStudents.sort(function (a, b) {
            const nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
            const nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        })
        setStudents(newStudents)
    }

    const sortNameUp = () => {
        const newStudents = [...students]
        newStudents.sort(function (a, b) {
            const nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
            const nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) return 1;
            if (nameA > nameB) return -1;
            return 0;
        })
        setStudents(newStudents)
    }
    return (
        <div>
            <NavBar />
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ width: "100%" }}>

                    <h1 style={{ textAlign: "center" }}>Student Directory.</h1>
                    <AddPersonForm personType="student" style={{ width: "20%" }} />
                    <Button onClick={() => {
                        setEdit(!edit);
                    }}>Edit</Button>
                    <Button onClick={() => {
                        setSave(true);
                    }}>Save</Button>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        onClick={sortNameDown}
                        startIcon={<FiArrowDown />}
                    >
                        Name
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        onClick={sortNameUp}
                        startIcon={<FiArrowUp />}
                    >
                        Name
                     </Button>
                </div>
                <div className={classes.studentList} >
                    <Grid container spacing={1} style={{ justifyContent: "center" }}>
                        {students.map((student, index) => (
                            <PersonCard person={student} edit={edit} save={save} />
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    )
}