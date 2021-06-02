import {useState} from 'react';
import {ListItem, ListItemText, Button, TextField, makeStyles} from '@material-ui/core';

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
    }
}));
  
function StudentItem({student, grade, studentID, handlePut, handleDelete}) {
    const styles = useStyles();
    const [editing, setEditing] = useState(false);
    const [myGrade, setMyGrade] = useState(grade);
    const handleSave = () => {
        handlePut({studentID, grade: myGrade});
        setEditing(false);
    }
    return (
        <ListItem>
            <ListItemText>
                <div className={styles.inlineDiv}>
                    <h3>{student.lastName+", "+student.firstName}</h3>
                </div>
                <div className={styles.inlineDiv}>
                    {editing ? 
                    <TextField
                        label="Grade:"
                        value={myGrade}
                        onChange={e => setMyGrade(e.target.value)}
                        onKeyDown={e => {
                            if(e.key==="Enter") {
                                handleSave();
                            }
                        }}
                    />
                        : <h4 className={styles.grayText}>{"Grade: "+myGrade}</h4>}
                </div>
                {editing ? <Button variant="contained" color="primary" onClick={() => handleSave()}>
                    Save
                </Button> : <Button variant="contained" onClick={() => setEditing(true)}>Edit</Button>}
                <Button variant="contained" color="secondary" className={styles.secondButton} 
                    onClick={()=>handleDelete(studentID)}>Unenroll</Button>
            </ListItemText>
        </ListItem>
    );   
}

export default StudentItem;