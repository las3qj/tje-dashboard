import NavBar from "./NavBar"
import { useEffect, useState } from 'react';
import AddPersonForm from "./AddPersonForm"
import { makeStyles } from '@material-ui/core/styles';

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
                </div>
                <div className={classes.studentList} >
                    {students.map((student, index) => (
                        //<StudentCard firstName={student.firstName} lastName={student.lastName} birthday={student.birthday} classes={student.classes} id={student.id} />
                        <div> student </div>
                    ))}
                </div>
            </div>
        </div>
    )
}