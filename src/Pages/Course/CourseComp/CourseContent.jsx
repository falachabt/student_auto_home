import React from "react";
import { CourseStateContext } from "../../../Contexts/CourseContext";
import { ArrowRight } from "@mui/icons-material";
import { generateProgress } from "../../../Data/utils";
import { useParams } from "react-router-dom";
import NoModule from "./Module/CourseContents/NoModule";
import PlayLesson from "./Module/CourseContents/PlayLesson";

const CourseContent = () => {
  const { activeLesson, activeModule, setActiveSideBar } = CourseStateContext();
  const { moduleid, lessonid } = useParams();

 
  // content should be printed if there is no selected lesson
  if (!moduleid || !lessonid) {
    return <NoModule />;
  }

  if (moduleid && !lessonid) {


    return (
      <div className="flex h-full items-center text-center ">
        <h1>Choose a lesson</h1>
      </div>
    );
  }

  // content should be render  if a lesson is selected
  return (
    <div>
      <PlayLesson />
    </div>
  );
};

export default CourseContent;
