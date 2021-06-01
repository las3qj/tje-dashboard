import { Paper, Button } from "@material-ui/core";
import {
  formatDate,
  convertDate,
  getCalendarEvents,
} from "../utils/CalendarUtils";
import axios from "axios";

function CalendarCard({ event, setEvents }) {
  return (
    <Paper
      style={{
        width: "80%",
        padding: "1%",
        display: "grid",
        gridTemplateColumns: "15em 1fr 2fr 5em",
        textAlign: "left",
        marginBottom: ".5%",
      }}
    >
      <p>{formatDate(convertDate(event.date))}</p>
      <p style={{ fontWeight: "bold" }}>{event.name}</p>
      <p>{event.desc}</p>
      <Button
        color="secondary"
        onClick={() => {
          axios
            .delete("http://localhost:8000/events", {
              params: { id: event.id },
            })
            .then(() => getCalendarEvents(setEvents));
        }}
      >
        X
      </Button>
    </Paper>
  );
}

export default CalendarCard;
