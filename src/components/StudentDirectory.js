import NavBar from "./NavBar"
import { useEffect, useState } from 'react';
import AddPersonForm from "./AddPersonForm"
import { makeStyles } from '@material-ui/core/styles';
import PersonCard from "./PersonCard"
import { Grid, Button, TextField } from '@material-ui/core'
import { FiArrowDown } from "react-icons/fi";
import { FiArrowUp } from "react-icons/fi";
import '../App.css';
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
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
    const { role } = useContext(UserContext);
    const [search, setSearch] = useState("")
    const [classList, setClassList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/classes")
        .then((res)=> res.json())
        .then((res) => setClassList(res))
    }, [])

    const classes = useStyles();
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchStudents()
        }, 550)
        return () => clearTimeout(delayDebounceFn)

    }, [search])
    const [students, setStudents] = useState([])

    const searchStudents = (fetchedStudents) => {
        var newStudents = [...fetchedStudents]
        newStudents = newStudents.filter((student) => {
            const name = student.lastName.toUpperCase()
            const searchWord = search.toUpperCase()
            return (name.indexOf(searchWord) !== -1 || searchWord === "")

        }
        )
        console.log("filtered list:", newStudents)
        setStudents(newStudents)
    }

    const fetchStudents = () => {
        const url = new URL("http://localhost:8000/students");
        const axios = require('axios');
        axios.get(url)
            .then(response => {
                console.log("fetched data", response.data);
                searchStudents(response.data)
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

                    <h1 style={{ textAlign: "center" }}>Student Directory</h1>
                    {role==="admin" && (<AddPersonForm refresh={fetchStudents} reload={fetchStudents} personType="student" style={{ width: "20%" }} />)}
                    <Button
                        onClick={sortNameDown}
                        startIcon={<FiArrowDown />}
                    >
                        Name
                    </Button>
                    <Button style={{paddingRight:20}}
                        onClick={sortNameUp}
                        startIcon={<FiArrowUp />}
                    >
                        Name
                     </Button>
                    <TextField name='value' value={search} onChange={(event) => { setSearch(event.target.value) }} placeholder={'search by last name'} />
                </div>
                <div className={classes.studentList} >
                    <Grid container spacing={1} style={{ justifyContent: "center" }}>
                        {console.log(students)}
                        {
                            students.map((student) => (
                                <PersonCard person={student} key={student.id} reload={fetchStudents} classList={classList} />

                            ))}
                    </Grid>
                </div>
            </div>
        </div>
    )
}
