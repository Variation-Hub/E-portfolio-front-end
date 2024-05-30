import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { start } from "repl";

function Calendar() {
  const events = [
    {
      title: "Event 1",
      // start: "2024-05-25"
      start: "2024-05-25T10:00:00", // Start date and time of the event
    },
    {
      title: "Event 2",
      start: "2024-05-27T14:30:00", // Start date and time of the event
      end: "2024-05-29T16:45:00", // End date and time of the event
    },
  ];

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={events}
        eventContent={(eventInfo) => {
          // Formatting event time
          const eventStartTime = new Date(eventInfo.event.start);
          const timeString = eventStartTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          return (
            <div>
              <div>{timeString}</div>
              <div>{eventInfo.event.title}</div>
            </div>
          );
        }}
      />
    </div>
  );
}

export default Calendar;
