import Paper from "@material-ui/core/Paper";
import { formatDate, convertDate } from "../utils/CalendarUtils";

function CalendarCard({ event }) {
  return (
    <Paper
      style={{
        width: "80%",
        padding: "1%",
        display: "grid",
        gridTemplateColumns: "15em 1fr 2fr",
        textAlign: "left",
      }}
    >
      <p>{formatDate(convertDate(event.date))}</p>
      <p style={{ fontWeight: "bold" }}>{event.name}</p>
      <p>{event.desc}</p>
    </Paper>
  );
}

export default CalendarCard;
