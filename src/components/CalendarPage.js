import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CalendarCard from "./CalendarCard";
import AddCalendarEventDialog from "./AddCalendarEventDialog";
import { getCalendarEvents, convertDate } from "../utils/CalendarUtils";
import CalendarView from "./CalendarView";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import Footer from "./Footer"

function CalendarPage() {
  const [events, setEvents] = useState();
  const [view, setView] = useState("list");
  const [addEventActive, setAddEventActive] = useState(false);
  const [showPastEvents, setShowPastEvents] = useState(true);
  const { isLoggedIn } = useContext(UserContext);
  const displayedEvents = showPastEvents
    ? events
    : events.filter((event) => convertDate(event.date) > Date.now());

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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          width: "50%",
          gap: "2%",
          margin: "auto",
        }}
      >
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

        {isLoggedIn ? (
          <Button
            color="primary"
            variant="contained"
            onClick={() => setAddEventActive(true)}
          >
            Add Event
          </Button>
        ) : (
          <div></div>
        )}

        {view === "list" && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowPastEvents((show) => !show)}
          >
            {showPastEvents ? "Hide Past Events" : "Show Past Events"}
          </Button>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "2%",
          gap: "1%",
        }}
      >
        {view === "list" &&
          events &&
          displayedEvents.map((item) => (
            <CalendarCard event={item} key={item.id} setEvents={setEvents} />
          ))}

        {view === "calendar" && events && <CalendarView events={events} />}
      </div>
      <Footer/>
    </div>
  );
}

export default CalendarPage;
