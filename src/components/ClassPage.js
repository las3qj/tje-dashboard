import {useState, useEffect, useContext} from 'react';
import { List, Grid, Divider, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { UserContext } from "../contexts/UserContext";
import NavBar from './NavBar';
import StudentItem from './StudentItem';
import ClassInfoPanel from './ClassInfoPanel';
import AddStudentDialog from './AddStudentDialog';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        alignItems: "flex-start"
    },
    mainItem: {
        width: '60%',
        padding: 15,
    },
    sidePanel: {
        width: '40%',
        padding: 25,
    },
    inlineDiv: {
        display: 'inline-block',
        margin: '0 60px',
        width: '25%',
    },
    grayText: {
        color: 'gray',
    }
  }));

function ClassPage() {
    const { classID } = useParams();
    const styles = useStyles();
    const [changes, setChanges] = useState(true);
    const [myClass, setMyClass] = useState(undefined);
    const [studentMap, setStudentMap] = useState(undefined);
    const axios = require('axios');
    const { role, id } = useContext(UserContext);

    useEffect(() => {
        if(changes) {
            console.log("fetching");
            const url = new URL("http://localhost:8000/class-page");
            url.searchParams.append("id", classID);
            fetch(url).then(resp => resp.json()).then(res => {
                console.log(res);
                setMyClass(res.myClass);
                setStudentMap(res.studentMap);
            });
            setChanges(false);
        }
    }, [changes]);

    const handlePutNewStudent = (studentID) => {
        const newClass = {...myClass};
        newClass.students.push({studentID, grade: "Outstanding"});
        const url = "http://localhost:8000/class-page/add-student";
        axios.put(url, {id: classID, student: {studentID, grade: "Outstanding"}}).then(resp => {
            setChanges(true);
        })
        setMyClass(newClass);
    }

    const handlePutStudentGrade = (student) => {
        const url = "http://localhost:8000/class-page/change-student-grade";
        axios.put(url, {id: classID, student}).then(resp => {
            setChanges(true);
        });
        const newClass = {...myClass};
        const index = newClass.students.findIndex(stu => stu.studentID === student.studentID);
        newClass.students[index] = student;
        setMyClass(newClass);
    }

    const handleDeleteStudent = (studentID) => {
        const url = "http://localhost:8000/class-page/delete-student";
        axios.put(url, {id: classID, studentID}).then(resp => {
            setChanges(true);
        });
        const newClass = {...myClass};
        const index = newClass.students.findIndex(stu => stu.studentID === studentID);
        newClass.students.splice(index, 1);
        setMyClass(newClass);
    }

    const handlePutClassInfo = ({name, teacherID}) => {
        const url = "http://localhost:8000/class-page/change-class-info";
        axios.put(url, {id: classID, name, teacherID}).then(resp => {
            setChanges(true);
        });
        const newClass = {...myClass, name, teacherID};
        setMyClass(newClass);
    }

    return(
        <div>
            <NavBar/>
            <Grid className={styles.root} container fluid direction="row" justify="center" alignItems="center" >
                <Grid item className={styles.mainItem}>
                    <List>
                        <h2>Student Roster</h2>
                        {(myClass!==undefined && studentMap!==undefined) && 
                        myClass.students.map(({studentID, grade}, index) => {
                            const student = studentMap[studentID];
                            return(
                                <div>
                                    {index===0 && <Divider/>}
                                    <StudentItem student={student} grade={grade} studentID={studentID} 
                                        handlePut={handlePutStudentGrade} handleDelete={handleDeleteStudent}/>
                                    <Divider/>
                                </div>
                            )
                        })}
                        {(myClass!==undefined && studentMap!==undefined) && <AddStudentDialog studentMap={studentMap} 
                            currentStudents={myClass.students} handlePut={handlePutNewStudent}/>}
                    </List>
                </Grid>
                <Grid item className={styles.sidePanel}>
                    {myClass!==undefined && <ClassInfoPanel myClass={myClass} handlePut={handlePutClassInfo}/>}
                </Grid>
            </Grid>
        </div>
    );

}

export default ClassPage;