import { CalendarMonth } from "@mui/icons-material";
import React from "react";

const Reminder = () => {
  return (
    <div className="dark:bg-main-dark-bg box-shadow rounded-md dark:text-gray-100 m-2 p-3">
      <div className="text-start text-xl font-semibold mb-2">
        <h1>Reminder</h1>
      </div>
      <div className="text-start flex gap-4 pb-2">
        <CalendarMonth />
        <span>No test programmed</span>
      </div>
      <hr />
    </div>
  );
};

export default Reminder;
