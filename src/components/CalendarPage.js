import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CalendarCard from "./CalendarCard";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";

function CalendarPage() {
  const [events, setEvents] = useState();
  const [view, setView] = useState("list");
  const [addEventActive, setAddEventActive] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8000/events")
      .then((res) => res.json())
      .then((res) => setEvents(res));
  }, []);
  console.log(events);

  const addEvent = () => {};

  return (
    <div>
      <NavBar />

      <h1>Calendar</h1>

      <Button
        color="primary"
        variant="contained"
        onClick={() => setAddEventActive(true)}
      >
        Add Event
      </Button>

      <Dialog open={addEventActive} onClose={() => setAddEventActive(false)}>
        <DialogTitle>Add Calendar Event</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setAddEventActive(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              addEvent();
              setAddEventActive(false);
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {view === "list" && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setView("calendar")}
        >
          View as Calendar
        </Button>
      )}

      {view === "calendar" && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setView("list")}
        >
          View as List
        </Button>
      )}

      {view === "list" && events && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "2%",
          }}
        >
          {events.map((item) => (
            <CalendarCard event={item} key={item.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
