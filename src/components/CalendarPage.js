import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CalendarCard from "./CalendarCard";
import AddCalendarEventDialog from "./AddCalendarEventDialog";
import { getCalendarEvents } from "../utils/CalendarUtils";

function CalendarPage() {
  const [events, setEvents] = useState();
  const [view, setView] = useState("list");
  const [addEventActive, setAddEventActive] = useState(false);
  useEffect(() => {
    getCalendarEvents(setEvents);
  }, []);

  return (
    <div>
      <NavBar />

      <h1>Calendar</h1>

      <AddCalendarEventDialog
        open={addEventActive}
        setOpen={setAddEventActive}
        setEvents={setEvents}
      />

      <Button
        color="primary"
        variant="contained"
        onClick={() => setAddEventActive(true)}
        style={{ marginRight: "1%" }}
      >
        Add Event
      </Button>

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
            gap: "1%",
          }}
        >
          {events.map((item) => (
            <CalendarCard event={item} key={item.id} setEvents={setEvents} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
