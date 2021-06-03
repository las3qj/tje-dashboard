import NavBar from "./NavBar"
import { useEffect, useState } from 'react';
import AddPersonForm from "./AddPersonForm"
import { makeStyles } from '@material-ui/core/styles';
import PersonCard from "./PersonCard"
import { Grid, Button, TextField, Card } from '@material-ui/core'
import { FiArrowDown } from "react-icons/fi";
import { FiArrowUp } from "react-icons/fi";
import '../App.css';
import Footer from "./Footer"
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    studentList: {
        display: "flex",
        flexDirection: "column",
        minHeight: "40vh"

    }
}));


export default function StudentDirectory() {
    const { role, isLoggedIn } = useContext(UserContext);
    const [search, setSearch] = useState("")
    const [classList, setClassList] = useState([]);
    const [students, setStudents] = useState([]);
    const [sort, setSort] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8000/classes")
            .then((res) => res.json())
            .then((res) => setClassList(res))

        fetchStudents()
    }, [])

    const classes = useStyles();

    const searchStudents = () => {
        let newStudents = students;
        newStudents = newStudents.filter((teacher) => {
            const name = teacher.lastName.toUpperCase();
            const searchWord = search.toUpperCase();
            return name.indexOf(searchWord) !== -1 || searchWord === "";
        });
        return newStudents;
    };

    const fetchStudents = () => {
        const url = new URL("http://localhost:8000/students");
        const axios = require('axios');
        axios.get(url)
            .then(response => {
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
        setSort(true)
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
        setSort(true)
    }

    const studentsToDisplay = searchStudents();

    return (
        <div>
            <NavBar />
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ width: "100%", marginBottom: "1%" }}>
                    <h1 style={{ textAlign: "center" }}>Student Directory</h1>
                    {role === "admin" && (
                        <AddPersonForm
                            refresh={fetchStudents}
                            reload={fetchStudents}
                            personType="student"
                            style={{ width: "20%" }}
                        />
                    )}
                    <Button onClick={sortNameDown} startIcon={<FiArrowDown />}>
                        Name
            </Button>
                    <Button
                        style={{ paddingRight: 20 }}
                        onClick={sortNameUp}
                        startIcon={<FiArrowUp />}
                    >
                        Name
            </Button>
                    <TextField
                        name="value"
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                        placeholder={"search by last name"}
                    />
                </div>
                <div className={classes.studentList} style={{ margin: "auto" }}>
                    <div style={{ paddingBottom: "10px" }}>
                        <Card elevation={2} style={{ width: "90vw", height: "3vw", margin: "auto", paddingBottom: "10px", backgroundColor: "#2E3B55" }}>
                            <Grid container item xs={12} spacing={1} style={{ alignItems: "center", height: "100%" }}>
                                <Grid item xs={2}>
                                    <p style={{ textAlign: "center", fontSize: 20, color: "white", fontWeight: "bold" }}>Last Name</p>
                                </Grid>
                                <Grid item xs={2}>
                                    <p style={{ textAlign: "center", fontSize: 20, color: "white", fontWeight: "bold" }}>First Name</p>
                                </Grid>
                                <Grid item xs={2}>
                                    <p style={{ textAlign: "center", fontSize: 20, color: "white", fontWeight: "bold" }}>Contact Information</p>
                                </Grid>
                                <Grid item xs={4}>
                                    <p style={{ textAlign: "center", fontSize: 20, color: "white", fontWeight: "bold" }}>Classes</p>
                                </Grid>
                            </Grid>
                        </Card>
                    </div>
                    {isLoggedIn ? (<div className={classes.studentList} style={{ margin: "auto" }}>
                        <Grid container spacing={1} style={{ justifyContent: "center" }}>
                            {studentsToDisplay.map((student) => (
                                <PersonCard
                                    personType={"student"}
                                    person={student}
                                    key={student.id}
                                    reload={fetchStudents}
                                    classList={classList}
                                    sort={sort}
                                    setSort={setSort}
                                />
                            ))}
                        </Grid>
                        {students.length === 0 && <CircularProgress />}
                        {studentsToDisplay.length === 0 && students.length !== 0 && ("No results found")}
                    </div>) : (
                        <p>Please log in to view students.</p>
                    )}
                </div>
            </div>
        </div>

    );

}
