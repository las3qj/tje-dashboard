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
        width: '90vw',
        alignItems: "flex-start",
        margin: "auto"
    },
    list: {
      width: '45vw',
      overflowY: "scroll",
      height: "65vh"
    },
    inlineDiv: {
        display: 'inline-block',
        margin: '0 60px',
        width: '25%',
    },
    grayText: {
        color: 'gray',
    },
    classCard: {
        width: "auto", 
        padding: 0, 
        margin: "1%"
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

    document.body.style='background:"white";';

    const handlePost = (name, teacherID) => {
        const axios = require('axios');
        let url = "/classes";
    
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
        fetch("/class-dash").then(resp => resp.json()).then(res => {
            setClasses(res.classes);
            setStudentMap(res.studentMap);
            setTeacherMap(res.teacherMap);
        });
    }, [changes, role, id]);

    return(
        <div>
            <NavBar/>
            <Grid container fluid direction="row" justify="center" alignItems="center" className={styles.root}>
                <div>
                    <h1> Class List </h1>
                    <List className={styles.list}>
                        
                        {(classes.length > 0 && teacherMap !== undefined && studentMap !== undefined) && 
                        classes.map((myClass, index) => {
                            return(
                                <ListItem button className={styles.classCard} onClick={e => {
                                    if(role === "admin" || role === "teacher") {
                                        setSelectedClass(myClass);
                                        setStudents(myClass.students);
                                    }
                                }}>
                                    <ClassItem myClass={myClass} teacherMap={teacherMap}/>
                                </ListItem>
                            );
                        })}                
                    </List>
                    <br />
                    {(classes.length > 0 && teacherMap !== undefined && studentMap !== undefined) &&
                        <AddClassDialog disabled={role==="none"} teacherMap={teacherMap} handlePost={handlePost}/>}
                </div>
                <div>
                    <h1> Student Roster </h1>
                    <List className={styles.list} style={{paddingLeft: "2%", paddingRight: "2%"}}>
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
                </div>
            </Grid>
            <Footer/>
        </div>
    );
}

export default ClassDashboard;