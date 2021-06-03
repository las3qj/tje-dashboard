import NavBar from "./NavBar"
import { useEffect, useState } from 'react';
import AddPersonForm from "./AddPersonForm"
import { makeStyles } from '@material-ui/core/styles';
import PersonCard from "./PersonCard"
import { Grid, Button, TextField } from '@material-ui/core'
import { FiArrowDown } from "react-icons/fi";
import { FiArrowUp } from "react-icons/fi";
import '../App.css';
import Footer  from "./Footer"
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress"

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
    const [students, setStudents] = useState([])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchStudents()
        }, 550)
        return () => clearTimeout(delayDebounceFn)

    }, [search])
    // const [students, setStudents] = useState([])
    const [edit, setEdit] = useState(false);
    const [save, setSave] = useState(false);
    const [sort,setSort]=useState(false);
    useEffect(() =>{
        fetch("http://localhost:8000/classes")
        .then((res)=> res.json())
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
          <div className={classes.studentList} style={{margin: "auto"}}>
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
          </div>
        </div>
        <Footer/>
      </div>
    );
}
