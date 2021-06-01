import Paper from "@material-ui/core/Paper";

function CalendarCard({ event }) {
  let date = new Date();
  const dateElements = event.date.split("/");
  date.setFullYear(dateElements[2]);
  date.setMonth(dateElements[0] - 1);
  date.setDate(dateElements[1]);

  const formateDate = (dateObject) =>
    dateObject.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <Paper
      style={{
        width: "80%",
        padding: "1%",
        display: "grid",
        gridTemplateColumns: "12em 1fr 2fr",
        textAlign: "left",
      }}
    >
      <p>{formateDate(date)}</p>
      <p style={{ fontWeight: "bold" }}>{event.name}</p>
      <p>{event.desc}</p>
    </Paper>
  );
}

export default CalendarCard;
