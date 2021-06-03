import {useState, useEffect} from 'react';
import {Button, Dialog, DialogActions, DialogContent, InputLabel,
    DialogTitle, Select, MenuItem, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  bottomButton: {
      marginTop: 10,
  },
}));

function AddStudentDialog({studentMap, currentStudents, handlePut}) {
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState('');
  const [availableStudents, setAvailableStudents] = useState([]);
  const styles = useStyles();

  const handleClose = () => setOpen(false);

  useEffect(() => {
      console.log("refreshing");
      const newAvailable = Object.getOwnPropertyNames(studentMap);
      currentStudents.forEach(student => {
          newAvailable.splice(newAvailable.findIndex(id => id === student.studentID), 1);
      });
      setAvailableStudents(newAvailable);
  }, [currentStudents, studentMap]);

  return (
    <div>
      <Button variant="contained" className={styles.bottomButton} onClick={() => setOpen(true)}>
        Enroll student in class
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Add student to class</DialogTitle>
        <DialogContent>
          <InputLabel id="student-label">Student</InputLabel>
          <Select
            labelId="student-label"
            id="student"
            value={student}
            fullWidth
            onChange={e=>setStudent(e.target.value)}
          >
            {availableStudents.map(id => 
              <MenuItem value={id}>{studentMap[id].lastName}, {studentMap[id].firstName}</MenuItem>
            )}

          </Select>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=> {
            handlePut(student);
            handleClose();
          }} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddStudentDialog