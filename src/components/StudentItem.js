import {useState} from 'react';
import {ListItem, ListItemText, Button, Select, MenuItem, InputLabel, makeStyles} from '@material-ui/core';
import {ReactComponent as HappyLogo} from './gradeIcons/happy.svg';
import {ReactComponent as ConfusedLogo} from './gradeIcons/confused.svg';
import {ReactComponent as SadLogo} from './gradeIcons/sad.svg';

const useStyles = makeStyles(() => ({
    inlineDiv: {
        display: 'inline-block',
        padding: '0 45px',
        width: '20%',
    },
    grayText: {
        color: 'gray',
    },
    secondButton: {
        margin: "0 15px",
    },
    gradeLabel: {
        margin: "25px 0 18px 0",
    }
}));
  
function StudentItem({student, grade, studentID, handlePut, handleDelete}) {
    const styles = useStyles();
    const [changes, setChanges] = useState(false);
    const [myGrade, setMyGrade] = useState(grade);
    const handleSave = () => {
        handlePut({studentID, grade: myGrade});
        setChanges(false);
    }
    return (
        <ListItem>
            <ListItemText>
                <div className={styles.inlineDiv}>
                    <h3>{student.lastName+", "+student.firstName}</h3>
                </div>

                <div className={styles.inlineDiv}>
                    <InputLabel id="grade-label" className={styles.gradeLabel}><b>Grade:</b></InputLabel>
                    <Select
                        labelId="grade-label"
                        id="grade"
                        value={myGrade}
                        SelectDisplayProps={{style: {fontSize: 20}}}
                        onChange={e=>{
                            if(e.target.value !== myGrade) {
                                setChanges(true);
                                setMyGrade(e.target.value);
                            }
                        }}
                    >
                        <MenuItem value={"Outstanding"}><HappyLogo width={25} height={25}/></MenuItem>
                        <MenuItem value={"Satisfactory"}><ConfusedLogo width={25} height={25}/></MenuItem>
                        <MenuItem value={"Needs Improvement"}><SadLogo width={25} height={25}/></MenuItem>
                    </Select>
                </div>
                <Button variant="contained" color="primary" onClick={() => handleSave()} disabled={!changes}>
                    Save
                </Button>
                <Button variant="contained" color="secondary" className={styles.secondButton} 
                    onClick={()=>handleDelete(studentID)}>Unenroll</Button>
            </ListItemText>
        </ListItem>
    );   
}

export default StudentItem;