import '../App.css'
import React,{useState,useEffect} from 'react'
import PersonCard from './PersonCard'
import {Grid, Button} from '@material-ui/core' 
function TeacherDirectory(){

    const [teachers,setTeachers] = useState([]);
    const [edit,setEdit] = useState(false);
    const [save,setSave] = useState(false);
    console.log(teachers)

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
        <Button onClick={()=>{
            setEdit(!edit);
        }}>Edit</Button>
        <Button onClick={()=>{
            setSave(true);
        }}>Save</Button>
        </div>
        <Grid container spacing={1} style={{justifyContent:"center"}}>
        {teachers.map((teacher)=>{
            return(
                <PersonCard person={teacher} edit={edit} save={save}/>
            )
        })}
        </Grid>
        </div>
    )
}
export default TeacherDirectory