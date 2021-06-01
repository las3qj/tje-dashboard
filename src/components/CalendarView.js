import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { convertDate } from "../utils/CalendarUtils";

const localizer = momentLocalizer(moment);

function CalendarView({ events }) {
  events.map((event) => {
    const date = convertDate(event.date);
    event.start = date;
    event.end = date;
    event.allDay = true;
    event.title = event.name;
    return event;
  });

  return (
    <div style={{ height: "65vh", width: "60%" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
      />
    </div>
  );
}

export default CalendarView;
