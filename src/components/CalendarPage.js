import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CalendarCard from "./CalendarCard";

function CalendarPage() {
  const [events, setEvents] = useState();
  const [view, setView] = useState("list");
  useEffect(() => {
    fetch("http://localhost:8000/events")
      .then((res) => res.json())
      .then((res) => setEvents(res));
  }, []);
  console.log(events);
  return (
    <div>
      <NavBar />
      <h1>Calendar</h1>
      {view === "list" && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setView("calendar")}
        >
          View Calendar
        </Button>
      )}
      {view === "calendar" && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setView("list")}
        >
          View List
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
