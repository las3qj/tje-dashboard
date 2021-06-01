import {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@material-ui/core';

function AddClassDialog() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
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
            label="Class name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddClassDialog