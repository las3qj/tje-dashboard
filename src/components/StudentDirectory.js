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
    },
    sortButton: {
        margin: "0 5px 0 0"
    }
}));


export default function StudentDirectory() {
    const { role, isLoggedIn } = useContext(UserContext);
    const [search, setSearch] = useState("")
    const [classList, setClassList] = useState([]);
    const [students, setStudents] = useState([]);
    const [sort, setSort] = useState("none");

    document.body.style = 'background:"white";';

    useEffect(() => {
        fetch("/classes")
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
        fetch("/students")
            .then((resp) => {
                return resp.json();
            })
            .then((obj) => {
                setStudents(obj);
            })
    }

    const sortLastNameDown = () => {
        const newStudents = [...students]
        newStudents.sort(function (a, b) {
            const nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
            const nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        })
        setStudents(newStudents)
        setSort("la-d")
    }

    const sortLastNameUp = () => {
        const newStudents = [...students]
        newStudents.sort(function (a, b) {
            const nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
            const nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) return 1;
            if (nameA > nameB) return -1;
            return 0;
        })
        setStudents(newStudents)
        setSort("la-i")
    }


    const sortFirstNameDown = () => {
        const newStudents = [...students]
        newStudents.sort(function (a, b) {
            const nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
            const nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        })
        setStudents(newStudents)
        setSort("fi-d")
    }

    const sortFirstNameUp = () => {
        const newStudents = [...students]
        newStudents.sort(function (a, b) {
            const nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
            const nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) return 1;
            if (nameA > nameB) return -1;
            return 0;
        })
        setStudents(newStudents)
        setSort("fi-i")
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
                    <Button onClick={sort==="la-d"?sortLastNameUp:sortLastNameDown} variant="outlined" className={classes.sortButton}
                        startIcon={sort==="la-d"?<FiArrowDown />:sort==="la-i"?<FiArrowUp/>:null}>
                        Last Name
                    </Button>
                    <Button onClick={sort==="fi-d"?sortFirstNameUp:sortFirstNameDown} variant="outlined" className={classes.sortButton}
                        startIcon={sort==="fi-d"?<FiArrowDown />:sort==="fi-i"?<FiArrowUp/>:null}
                        style={{ paddingRight: 20 }}>
                        First Name
                    </Button>
                    <TextField size="small" id="outlined-basic" variant="outlined"
                        name="value"
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                        placeholder={"search by last name"}
                    />
                </div>
                <div className={classes.studentList} style={{ margin: "auto" }}>
                    <div style={{ paddingBottom: "0.5%" }}>
                        <Card elevation={2} style={{ width: "90vw", height: "3vw", margin: "auto", paddingBottom: "10px", backgroundColor: "#2E3B55" }}>
                            <Grid container item xs={12} spacing={1} style={{ alignItems: "center", height: "100%" }}>
                                <Grid item xs={2}>
                                    <p style={{ textAlign: "center", fontSize: "1.2vw", color: "white", fontWeight: "bold" }}>Last Name</p>
                                </Grid>
                                <Grid item xs={2}>
                                    <p style={{ textAlign: "center", fontSize: "1.2vw", color: "white", fontWeight: "bold" }}>First Name</p>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <p style={{ textAlign: "center", fontSize: "1.2vw", color: "white", fontWeight: "bold" }}>Contact Information</p>
                                </Grid>
                                <Grid item xs={1}>
                                    <p style={{ textAlign: "center", fontSize: "1.2vw", color: "white", fontWeight: "bold" }}> {role === "admin" ? "D.O.B." : "    "}</p>
                                </Grid>
                                <Grid item xs={3}>
                                    <p style={{ textAlign: "center", fontSize: "1.2vw", color: "white", fontWeight: "bold" }}>Classes</p>
                                </Grid>
                            </Grid>
                        </Card>
                    </div >
                    {isLoggedIn ? (<div className={classes.studentList} style={{ margin: "auto" }}>
                        <Grid container spacing={1} style={{ justifyContent: "center" }}>
                            {studentsToDisplay.map((student) => (
                                <PersonCard
                                    personType={"student"}
                                    person={student}
                                    key={student.id}
                                    reload={fetchStudents}
                                    classList={classList}
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
            <Footer />
        </div>
    );

}
