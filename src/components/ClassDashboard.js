import {useState, useEffect} from 'react';
import ClassItem from './ClassItem';
import AddClassDialog from './AddClassDialog';
import {List, ListItem, ListItemText, Grid, Divider, makeStyles} from '@material-ui/core';
import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
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
    const [classes, setClasses] = useState([]);
    const [studentMap, setStudentMap] = useState(undefined);
    const [students, setStudents] = useState(undefined);
    const [teacherMap, setTeacherMap] = useState(undefined);
    const [changes, setChanges] = useState(true);
    const styles = useStyles();

    useEffect(() => {
        if(changes) {
            const url = new URL("http://localhost:8000/class-dash");
            fetch(url).then(resp => resp.json()).then(res => {
                setClasses(res.classes);
                setStudentMap(res.studentMap);
                setTeacherMap(res.teacherMap);
                setChanges(false);
            });
        }
    }, [changes]);

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
                                setStudents(myClass.students);
                            }}>
                                <ClassItem myClass={myClass} teacherMap={teacherMap}/>
                            </ListItem>
                        );
                    })}                
                    <AddClassDialog/>
                </List>
                <List className={styles.list}>
                    <h1> Student Roster </h1>
                    {students===undefined ? <h2 className={styles.grayText}>No class selected</h2> :
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
                                            <h4 className={styles.grayText}>{"Grade: "+grade}</h4>
                                        </div>
                                    </ListItemText>
                                </ListItem>
                                <Divider/>
                            </div>
                        )
                    })}
                </List>
            </Grid>
        </div>
    );
}

export default ClassDashboard;