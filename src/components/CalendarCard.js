import { Paper, Button } from "@material-ui/core";
import {
  formatDate,
  convertDate,
  getCalendarEvents,
} from "../utils/CalendarUtils";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import ClearIcon from "@material-ui/icons/Clear";

function CalendarCard({ event, setEvents }) {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <Paper
      style={{
        width: "100%",
        maxWidth: "90vw",
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

      {isLoggedIn && (
        <Button
          style={{ color: "red" }}
          onClick={() => {
            axios
              .delete("http://localhost:8000/events", {
                params: { id: event.id },
              })
              .then(() => getCalendarEvents(setEvents));
          }}
        >
          <ClearIcon />
        </Button>
      )}
    </Paper>
  );
}

export default CalendarCard;
