import {useState, useEffect} from 'react';
import {Button, List, ListItem, ListItemText, Grid, Divider, makeStyles} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import AddStudentDialog from './AddStudentDialog';

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

function ClassPage() {
    const { id } = useParams();
    const styles = useStyles();
    const [changes, setChanges] = useState(true);
    const [myClass, setMyClass] = useState(undefined);
    const [studentMap, setStudentMap] = useState(undefined);

    useEffect(() => {
        if(changes) {
            console.log("fetching");
            const url = new URL("http://localhost:8000/class-page");
            url.searchParams.append("id", id);
            fetch(url).then(resp => resp.json()).then(res => {
                console.log(res);
                setMyClass(res.myClass);
                setStudentMap(res.studentMap);
            });
            setChanges(false);
        }
    }, [changes]);

    return(
        <div>
            <NavBar/>
            <Grid className={styles.root} container fluid direction="row" justify="center" alignItems="center" >
                <List className={styles.list}>
                    {myClass!==undefined && <h2>{myClass.name}</h2>}
                    {(myClass!==undefined && studentMap!==undefined) && 
                    myClass.students.map(({studentID, grade}, index) => {
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
                                        <Button variant="contained">Edit</Button>
                                    </ListItemText>
                                </ListItem>
                                <Divider/>
                            </div>
                        )
                    })}
                    {(myClass!==undefined && studentMap!==undefined) && <AddStudentDialog studentMap={studentMap} 
                        currentStudents={myClass.students} handlePost={()=>console.log("success!")}/>}
                </List>
            </Grid>
        </div>
    );

}

export default ClassPage;