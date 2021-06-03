import {useState, useEffect, useContext} from 'react';
import { UserContext } from "../contexts/UserContext";
import ClassItem from './ClassItem';
import AddClassDialog from './AddClassDialog';
import {List, ListItem, ListItemText, Grid, Divider, makeStyles} from '@material-ui/core';
import NavBar from './NavBar';
import {ReactComponent as HappyLogo} from './gradeIcons/happy.svg';
import {ReactComponent as ConfusedLogo} from './gradeIcons/confused.svg';
import {ReactComponent as SadLogo} from './gradeIcons/sad.svg';
import Footer from './Footer'

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        alignItems: "flex-start"
    },
    list: {
      width: '50%',
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

function ClassDashboard () {
    const { role, id } = useContext(UserContext);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(undefined);
    const [studentMap, setStudentMap] = useState(undefined);
    const [students, setStudents] = useState([]);
    const [teacherMap, setTeacherMap] = useState(undefined);
    const [changes, setChanges] = useState(0);
    const styles = useStyles();

    const handlePost = (name, teacherID) => {
        const axios = require('axios');
        let url = "http://localhost:8000/classes";
    
        axios.post(url, {
            teacherID,
            name,
            students: []
        }).then(resp => setChanges(changes+1));
        
        const newClasses = classes;
        newClasses.push({teacherID, name, students: []});
        setClasses(newClasses);
    }

    useEffect(() => {
        console.log('fetching');
        const url = new URL("http://localhost:8000/class-dash");
        fetch(url).then(resp => resp.json()).then(res => {
            setClasses(res.classes);
            setStudentMap(res.studentMap);
            setTeacherMap(res.teacherMap);
        });
    }, [changes, role, id]);

    return(
        <div>
            <NavBar/>
            <Grid container fluid direction="row" justify="center" alignItems="center" className={styles.root}>
                <List className={styles.list}>
                    <h1> Class List </h1>
                    {(classes.length > 0 && teacherMap !== undefined && studentMap !== undefined) && 
                    classes.map((myClass, index) => {
                        return(
                            <ListItem button onClick={e => {
                                if(role === "admin" || role === "teacher") {
                                    setSelectedClass(myClass);
                                    setStudents(myClass.students);
                                }
                            }}>
                                <ClassItem myClass={myClass} teacherMap={teacherMap}/>
                            </ListItem>
                        );
                    })}                
                    {(classes.length > 0 && teacherMap !== undefined && studentMap !== undefined) &&
                    <AddClassDialog teacherMap={teacherMap} handlePost={handlePost}/>}
                </List>
                <List className={styles.list}>
                    <h1> Student Roster </h1>
                    {role === "none" ? <h2 className={styles.grayText}>Roster available only for staff and administration</h2> : 
                    selectedClass===undefined ? <h2 className={styles.grayText}>No class selected</h2> :
                    students.length===0? <h2 className={styles.grayText}>No students in this class</h2> :
                    students.map(({studentID, grade}, index) => {
                        const student = studentMap[studentID];
                        return(
                            <div>
                                {index===0 && <Divider/>}
                                <ListItem>
                                    <ListItemText>
                                        <div className={styles.inlineDiv}>
                                            <h3>{student.lastName+", "+student.firstName}</h3>
                                        </div>
                                        <div className={styles.inlineDiv}>
                                            <h4 className={styles.grayText}>
                                                {"Grade: "}{role==="admin"||
                                                    (role==="teacher" && selectedClass.teacherID===id)
                                                    ?(grade==="Outstanding"?<HappyLogo width={25} height={25}/>:
                                                     (grade==="Satisfactory"?<ConfusedLogo width={25} height={25}/>:
                                                     <SadLogo width={25} height={25}/>))
                                                    :"Hidden"}
                                            </h4>
                                        </div>
                                    </ListItemText>
                                </ListItem>
                                <Divider/>
                            </div>
                        )
                    })}
                </List>
            </Grid>
            <Footer/>
        </div>
    );
}

export default ClassDashboard;