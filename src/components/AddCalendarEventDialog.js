import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Button,
} from "@material-ui/core";
import { getCalendarEvents } from "../utils/CalendarUtils";
import axios from "axios";

function AddCalendarEventDialog({ open, setOpen, setEvents }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.date.value === "") return false;

    const dateElements = e.target.date.value.split("-");
    const date =
      dateElements[1] + "/" + dateElements[2] + "/" + dateElements[0];

    await axios.post("http://localhost:8000/events", {
      name: e.target.name.value,
      desc: e.target.desc.value,
      date: date,
    });

    getCalendarEvents(setEvents);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle>Add Calendar Event</DialogTitle>

      <DialogContent>
        <form id="addEventForm" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            fullWidth
          />
          <TextField
            multiline
            margin="dense"
            id="desc"
            label="Description"
            fullWidth
          />
          <TextField
            id="date"
            label="Date"
            type="date"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          form="addEventForm"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCalendarEventDialog;
