import {useState, useContext} from 'react';
import { UserContext } from "../contexts/UserContext";
import {Button, Dialog, DialogActions, DialogContent, InputLabel,
  DialogContentText, DialogTitle, TextField, makeStyles, Select, MenuItem} from '@material-ui/core';

function AddClassDialog({teacherMap, handlePost}) {
  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState("");
  const { role, id } = useContext(UserContext);
  const [teacher, setTeacher] = useState(role==="teacher" ? id : '');
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" disabled={role==="none"} onClick={() => setOpen(true)}>
        Add new class
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Add new class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add info for the new class
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={className}
            label="Class name"
            onChange={e => setClassName(e.target.value)}
            fullWidth
          />
          <br/><br/>
          <InputLabel id="teacher-label">Teacher</InputLabel>
          <Select
            labelId="teacher-label"
            id="teacher"
            value={teacher}
            disabled={role !== "admin"}
            onChange={e=>setTeacher(e.target.value)}
          >
            {Object.getOwnPropertyNames(teacherMap).map(id => 
              <MenuItem value={id}>{teacherMap[id].lastName}, {teacherMap[id].firstName}</MenuItem>
            )}

          </Select>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=> {
            handlePost(className, teacher);
            handleClose();
          }} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddClassDialog