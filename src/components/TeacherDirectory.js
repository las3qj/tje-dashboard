import '../App.css'
import React,{useState,useEffect} from 'react'
import PersonCard from './PersonCard'
import {Grid, Button,TextField} from '@material-ui/core' 
import AddPersonForm from './AddPersonForm'
import NavBar from "./NavBar";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { FiArrowDown } from "react-icons/fi";
import { FiArrowUp } from "react-icons/fi";
import CircularProgress from "@material-ui/core/CircularProgress"

function TeacherDirectory(){
    const { role } = useContext(UserContext);
    const [teachers,setTeachers] = useState("loading");
    const [search, setSearch] = useState("")
    const [classList, setClassList] = useState([]);

    const getTeachers=(()=>{
        fetch("http://localhost:8000/classes")
        .then((res)=> res.json())
        .then((res) => setClassList(res))

        fetch("http://localhost:8000/teachers")
        .then((resp) => {
            return resp.json();
            })
            .then((obj) => {
                setTeachers(obj);
            })
    })

    useEffect(()=>{
        getTeachers();
    },[])

    const searchTeachers = () => {
        if (teachers === "loading") return []
        let newTeachers = teachers;
        newTeachers = newTeachers.filter((teacher) => {
            const name = teacher.lastName.toUpperCase();
            const searchWord = search.toUpperCase();
            return name.indexOf(searchWord) !== -1 || searchWord === "";
        });
        return newTeachers;
    };

    const sortNameDown = () => {
        const newTeachers = [...teachers]
        newTeachers.sort(function (a, b) {
            const nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
            const nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        })
        setTeachers(newTeachers)
    }

    const sortNameUp = () => {
        const newTeachers = [...teachers]
        newTeachers.sort(function (a, b) {
            
            const nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
            const nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) return 1;
            if (nameA > nameB) return -1;
            return 0;
        })
        setTeachers(newTeachers)
    }
    
    const teachersToDisplay = searchTeachers();
    
    return (
        <div>
            <NavBar/>
            <h1 style={{textAlign:"center"}}>Teacher Directory</h1>
            <div style={{display:"flex",justifyContent:"center", marginBottom: "1%" }}>
            {role === "admin" && (<AddPersonForm personType="teacher" style={{ width: "20%" }} />)}

            <Button
            onClick={sortNameDown}
            startIcon={<FiArrowDown />}
            >Name
            </Button>
            <Button style={{paddingRight:20}}
            onClick={sortNameUp}
            startIcon={<FiArrowUp />}
            >Name</Button>
            <TextField name='value' value={search} onChange={(event) => { setSearch(event.target.value) }} onKeyPress={(evt)=>{
                searchTeachers();
            }}placeholder={'search by last name'} />
            </div>
            <Grid container spacing={1} style={{justifyContent:"center"}}>
            {teachers !== "loading" && (teachersToDisplay.map((teacher) => (
                <PersonCard
                  person={teacher}
                  key={teacher.id}
                  reload={getTeachers}
                  classList={classList}
                />
              )))}
            {teachersToDisplay.length === 0 && teachers !== "loading" && ("No results found")}
            {teachers === "loading" && <CircularProgress /> }
            </Grid>
        </div>
    )
}
export default TeacherDirectory
