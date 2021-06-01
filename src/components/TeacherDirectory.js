import '../App.css'
import React,{useState,useEffect} from 'react'
import PersonCard from './PersonCard'
import {Grid, Button} from '@material-ui/core' 
import AddPersonForm from './AddPersonForm'
function TeacherDirectory(){

    const [teachers,setTeachers] = useState([]);
    const [edit,setEdit] = useState(false);
    const [save,setSave] = useState(false);
    console.log(teachers)
    console.log(save);

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


    return (
        <div>
        <div style={{display:"flex",justifyContent:"center"}}>
        <h1 style={{textAlign:"center"}}>Teacher Directory.</h1>
        <AddPersonForm personType="teacher" style={{ width: "20%" }} />
        <Button onClick={()=>{
            setEdit(!edit);
        }}>Edit</Button>
        {edit&&<Button onClick={()=>{
            setSave(true);
        }}>Save</Button>}
        </div>
        <Grid container spacing={1} style={{justifyContent:"center"}}>
        {teachers.map((teacher)=>{
            return(
                <PersonCard person={teacher} edit={edit} save={save} setSave={setSave}/>
            )
        })}
        </Grid>
        </div>
    )
}
export default TeacherDirectory