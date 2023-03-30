import React from "react";
import CircularProgress from "../../CircularProgress/CircularProgress";
import Details from "./Details";

const CourseProgres = () => {
  return (
    <div className="box-shadow rounded-md dark:bg-main-dark-bg m-2  dark:text-white p-2 ">
      <div className="w-full flex items-center justify-center">
        <CircularProgress />
      </div>

      <div className="mt-4 relative top-[-100px]  flex flex-col items-center justify-center w-full ">
        <Details />
        <Details color="red" />
        <Details color="yellow" />
      </div>
    </div>
  );
};

export default CourseProgres;
