import '../App.css'
import React,{useState,useEffect} from 'react'
import PersonCard from './PersonCard'
import {Grid, Button,TextField} from '@material-ui/core' 
import AddPersonForm from './AddPersonForm'
import NavBar from "./NavBar";

function TeacherDirectory(){
    const personType = "teacher";
    const [teachers,setTeachers] = useState([]);
    const [edit,setEdit] = useState(false);
    const [save,setSave] = useState(false);
    const [search, setSearch] = useState("")

    const getTeachers=(()=>{
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
        fetch("http://localhost:8000/teachers")
        .then((resp) => {
            return resp.json();
            })
            .then((obj) => {
                let newTeachers = obj
                newTeachers = newTeachers.filter((teacher) => {
                    const name = teacher.lastName.toUpperCase()
                    const searchWord = search.toUpperCase()
                    return (name.indexOf(searchWord) !== -1 || searchWord === "")
        
                }
                )
                console.log("filtered list:", newTeachers)
                setTeachers(newTeachers)
            })
    }

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

    console.log("EDIT: ", edit)
    
    return (
        <div>
        <NavBar/>
        <h1 style={{textAlign:"center"}}>Teacher Directory.</h1>
        <div style={{display:"flex",justifyContent:"center"}}>
        <AddPersonForm personType="teacher" reload={getTeachers} style={{ width: "20%" }} />
        <Button onClick={()=>{
            setEdit(true);
        }}>Edit</Button>
        {edit&&<Button onClick={()=>{
            setSave(true);
        }}>Save</Button>}
        <Button onClick={()=>{
            sortNameUp();
        }}>Sort (Name A-Z)</Button>
        <Button onClick={()=>{
            sortNameDown();
        }}>Sort (Name Z-A)</Button>
        <TextField name='value' value={search} onChange={(event) => { setSearch(event.target.value) }} onKeyPress={(evt)=>{
            searchTeachers();
        }}placeholder={'search by last name'} />
        </div>
        <Grid container spacing={1} style={{justifyContent:"center"}}>
        {teachers.map((teacher, i)=>{
            return(
                <PersonCard personType={personType} person={teacher} edit={edit} save={save} reload={getTeachers} setEdit={setEdit} setSave={setSave} key={i}/>
            )
        })}
        </Grid>
        </div>
    )
}
export default TeacherDirectory