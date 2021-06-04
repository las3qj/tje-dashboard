const getCalendarEvents = (setEvents) => {
  fetch("/events")
    .then((res) => res.json())
    .then((res) => {
      res = res.sort((a, b) => convertDate(a.date) - convertDate(b.date));
      setEvents(res);
    });
};

const convertDate = (dateAsString) => {
  let date = new Date();
  const dateElements = dateAsString.split("/");
  date.setFullYear(dateElements[2]);
  date.setMonth(dateElements[0] - 1);
  date.setDate(dateElements[1]);
  return date;
};

const formatDate = (dateObject) => {
  return dateObject.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export { getCalendarEvents, formatDate, convertDate };
