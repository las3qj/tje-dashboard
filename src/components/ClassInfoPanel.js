import {Grid, makeStyles, Divider, Button, TextField, Select, InputLabel, MenuItem} from '@material-ui/core';
import {useState, useEffect, useContext} from 'react';
import { UserContext } from "../contexts/UserContext";

const useStyles = makeStyles(() => ({
    root: {
        borderStyle: 'solid',
        borderColor: "black",
        borderWidth: 2,
    },
    names: {
        width: '100%',
        borderStyle: 'solid',
        borderColor: "gray",
        borderWidth: 0,
        borderBottomWidth: 2,
    },
    nameField: {
        marginTop: 10,
        marginBottom: 11,
    },
    teacherSelect: {
        marginTop: 9,
        marginBottom: 10,
    }
}));

const computeAverage = students => {
    if(students.length === 0){
        return 0;
    }
    let total = 0.0;
    students.forEach(student => total+=parseInt(student.grade));
    return (total / students.length);
}

function ClassInfoPanel({myClass, handlePut}) {
    const [teacherMap, setTeacherMap] = useState(undefined);
    const [editing, setEditing] = useState(false);
    const [className, setClassName] = useState(myClass.name);
    const [teacherID, setTeacherID] = useState(myClass.teacherID);
    const {id, role} = useContext(UserContext);
    const styles = useStyles();

    useEffect(() => {
        console.log("teachermap");
        const url = new URL("http://localhost:8000/teachers/map");
        fetch(url).then(resp => resp.json()).then(res => {
            console.log(res);
            setTeacherMap(res);
        });
    }, []);
      return(
        <div>
            <Grid className={styles.root}
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item className={styles.names}>
                    {editing? 
                    <TextField className={styles.nameField}
                        value={className}
                        inputProps={{style: {fontSize: 30}}}
                        onChange={e => setClassName(e.target.value)}
                        label="Class name:"
                    />
                    :<h1>{className}</h1>}
                </Grid>
                <Divider/>
                <Grid item className={styles.names}>
                    {editing?
                    <div className={styles.teacherSelect}>
                        <InputLabel id="teacher-label">Teacher</InputLabel>
                        <Select
                            labelId="teacher-label"
                            id="teacher"
                            value={teacherID}
                            SelectDisplayProps={{style: {fontSize: 20}}}
                            disabled={role !== "admin"}
                            onChange={e=>setTeacherID(e.target.value)}
                        >
                            {Object.getOwnPropertyNames(teacherMap).map(id => 
                                <MenuItem value={id}>{teacherMap[id].lastName}, {teacherMap[id].firstName}</MenuItem>
                            )}
                        </Select>
                    </div>
                    :<h2>Taught by: {teacherMap!==undefined && 
                        (teacherMap[teacherID].lastName+", "+teacherMap[teacherID].firstName)}</h2>}
                </Grid>
                <Grid item>
                    <h3>Grade average: {computeAverage(myClass.students)}</h3>
                </Grid>
                <Grid item>
                    <h3>Students: {myClass.students.length}</h3>
                </Grid>
            </Grid>
            <Button variant="contained" color={editing?"primary":"default"} onClick={()=>{
                if(editing) {
                    handlePut({name: className, teacherID})
                }
                setEditing(!editing);
            }}>
                {editing?"Save class info":"Edit class info"}
            </Button>
        </div>
      );
}

export default ClassInfoPanel;