import {Grid, makeStyles, Divider, Button, TextField, Select, InputLabel, MenuItem, Tooltip} from '@material-ui/core';
import {useState, useEffect, useContext} from 'react';
import { UserContext } from "../contexts/UserContext";
import {ReactComponent as HappyLogo} from './gradeIcons/happy.svg';
import {ReactComponent as ConfusedLogo} from './gradeIcons/confused.svg';
import {ReactComponent as SadLogo} from './gradeIcons/sad.svg';

const GRADECONV = {"Outstanding": 3, "Satisfactory": 2, "Needs Improvement": 1};
const GRADEDISPL = [<p>N/A</p>, <SadLogo width={25} height={25}/>, 
    <ConfusedLogo width={25} height={25}/>, <HappyLogo width={25} height={25}/>]

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
    },
    bottomButton: {
        marginTop: 10
    }
}));

const computeAverage = students => {
    if(students.length === 0){
        return 0;
    }
    let total = 0.0;
    students.forEach(student => total+=GRADECONV[student.grade]);
    return (Math.round(total / students.length));
}

function ClassInfoPanel({myClass, handlePut}) {
    const [teacherMap, setTeacherMap] = useState(undefined);
    const [editing, setEditing] = useState(false);
    const [className, setClassName] = useState(myClass.name);
    const [teacherID, setTeacherID] = useState(myClass.teacherID);
    const {id, role} = useContext(UserContext);
    const styles = useStyles();

    useEffect(() => {
        fetch("/teachers/map").then(resp => resp.json()).then(res => {
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
                        inputProps={{style: {fontSize: 30, textAlign: 'center'}}}
                        onChange={e => setClassName(e.target.value)}
                        label="Class name:"
                    />
                    :<h1>{className}</h1>}
                </Grid>
                <Divider/>
                <Grid item className={styles.names}>
                    {editing?
                    <div className={styles.teacherSelect}>
                        <InputLabel id="teacher-label">Taught by</InputLabel>
                        <Tooltip title="Only administrators can change teacher." disableFocusListener={role==="admin"} 
                            disableHoverListener={role==="admin"} disableTouchListener={role==="admin"} arrow>
                            <span>
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
                            </span>
                        </Tooltip>
                    </div>
                    :<h2>Taught by: {teacherMap!==undefined && 
                        (teacherMap[teacherID].lastName+", "+teacherMap[teacherID].firstName)}</h2>}
                </Grid>
                <Grid item>
                    <h3>Grade average: {GRADEDISPL[computeAverage(myClass.students)]}</h3>
                </Grid>
                <Grid item>
                    <h3>Students: {myClass.students.length}</h3>
                </Grid>
            </Grid>
            <Button variant="contained" color={editing?"primary":"default"} className={styles.bottomButton} onClick={()=>{
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