import React, { useEffect } from "react";
import { ArrowRight } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { CourseStateContext } from "../../../../../Contexts/CourseContext";
import { generateProgress } from "../../../../../Data/utils";
import { useNavigate } from "react-router-dom";
import CollapseSystem from "../../../../../Components/CollapseSystem/CollapseSystem";
import TextEditor from "../../../../../Components/TextEditor/TextEditor";

const PlayLesson = () => {
  const { activeLesson, activeModule, setActiveSideBar, modules, state } =
    CourseStateContext();
  const { moduleid, lessonid } = useParams();


 

  //  In the future add a function to verify if the user have change the url
  

  return (
    <div>
      <div className="w-full   flex justify-start">
        <button
          onClick={() => {
            setActiveSideBar(true);
          }}
        >
          <ArrowRight />
        </button>
      </div>

      <div>
      <div className=" play_lesson_header p-2 w-full flex justify-center top-[-5px]">
        <div className="sm:w-1/2 w-full">
          {generateProgress({ max: activeModule.lessons?.length  || 0, min: 0, actual: 2 })}
        </div>

      </div>
        <div className=" play_lesson_title flex gap-3 items-center text-end  font-semibold tracking-wide p-2">
            <h1 className="text-2xl">{activeModule.name}</h1>
            <span> - </span>
            <h2 className="text-xl"> { activeLesson.title }</h2>
        </div>

      </div>
      <div className=" grid grid-cols-2 divide-x-1  ">
        <div className='coruse_video_player'>
            <VideoPlayer />
        </div>


         <div>
            <CollapseSystem object = {activeLesson}  displayKeys = {['description', 'title']} />
         </div>
      </div>

      <div>
        {/* <TextEditor /> */}
      </div>
    </div>
  );
};

export default PlayLesson;
