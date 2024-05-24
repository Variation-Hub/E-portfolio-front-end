import React from "react";
import { createRoot } from "react-dom/client";
import {
  ScheduleComponent,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { appData } from "./datasource";

const Calendar = () => {
  const eventSettings = { dataSource: appData };
  return (
    <ScheduleComponent
      width="100%"
      height="550px"
      selectedDate={new Date(2018, 1, 15)}
      eventSettings={eventSettings}
    >
      <ViewsDirective>
        <ViewDirective option="Month" showWeekNumber={true} readonly={true} />
      </ViewsDirective>
      <Inject services={[Month]} />
    </ScheduleComponent>
  );
};
const root = createRoot(document.getElementById("schedule"));
export default Calendar;
