import NavBar from "./NavBar"
import { useEffect, useState } from 'react';
import AddPersonForm from "./AddPersonForm"
import { makeStyles } from '@material-ui/core/styles';
import PersonCard from "./PersonCard"
import { Grid, Button } from '@material-ui/core'
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
    return (
        <div>
            <NavBar />
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ width: "20%" }}>
                    <AddPersonForm personType="student" style={{ width: "20%" }} />
                    <h1 style={{ textAlign: "center" }}>Student Directory.</h1>
                    <Button onClick={() => {
                        setEdit(!edit);
                    }}>Edit</Button>
                    <Button onClick={() => {
                        setSave(true);
                    }}>Save</Button>
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