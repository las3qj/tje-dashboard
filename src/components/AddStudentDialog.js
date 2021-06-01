import {useState, useEffect} from 'react';
import {Button, Dialog, DialogActions, DialogContent, InputLabel,
    DialogTitle, Select, MenuItem} from '@material-ui/core';

function AddStudentDialog({studentMap, currentStudents, handlePost}) {
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState('');
  const [availableStudents, setAvailableStudents] = useState([]);

  const handleClose = () => setOpen(false);

  useEffect(() => {
      console.log("refreshing");
      const newAvailable = Object.getOwnPropertyNames(studentMap);
      currentStudents.forEach(student => {
          newAvailable.splice(newAvailable.findIndex(id => id === student.studentID), 1);
      });
      setAvailableStudents(newAvailable);
  }, currentStudents, studentMap);

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add student to class
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Add student to class</DialogTitle>
        <DialogContent>
          <InputLabel id="student-label">Student</InputLabel>
          <Select
            labelId="student-label"
            id="student"
            value={student}
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
            handlePost(student);
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