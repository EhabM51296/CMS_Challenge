import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";

type Props = {
  timeSheets: TimeSheetTable[];
};

function Calendar({ timeSheets }: Props) {
  const timeSheetEvents = timeSheets.map((t) => ({
    id: t.id,
    title: t.employee_full_name + ": " + t.description,
    start: formatDateTime(t.start_time),
    end: formatDateTime(t.end_time),
  }));

  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: timeSheetEvents,
    plugins: [eventsService],
  });

  useEffect(() => {
    eventsService.getAll();
  }, []);

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

function formatDateTime(dateTime: string): string {
  if (dateTime && dateTime.includes("T")) {
    const [date, time] = dateTime.split("T");
    const formattedTime = time.slice(0, 5);
    return `${date} ${formattedTime}`;
  }

  return dateTime;
}

export default Calendar;
