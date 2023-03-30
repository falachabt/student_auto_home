import React from "react";
import CourseProgres from "../../Components/UserDispaly/CourseProgressDetails/CourseProgres";
import Reminder from "../../Components/UserDispaly/Reminder";
import Skills from "../../Components/UserDispaly/Skils";
import { UserDetails } from "../../Components/UserDispaly/UserDisplay";

const Profil = () => {


  return (
    <div className="ml-2 mt-4 flex flex-col gap-0">
      <div className="grid grid-cols-2 max-[750px]:grid-cols-1 ">
        <div className=" w-full pr-5">
          <UserDetails />
        </div>
        <div className="max-[750px]:grid-cols-2 max-[530px]:grid-cols-1 grid grid-cols-1">
          <Skills />
          <Reminder />
        </div>
      </div>
          <div className=" min-[620px]:w-[40%] min-w-[300px] max-h-[200px] ">
            <CourseProgres />
          </div>
    </div>
  );
};

export default Profil;
