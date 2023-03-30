import React from "react";
import CollapseSystem from "../../Components/CollapseSystem/CollapseSystem";
import VideoPlayer from "./CourseComp/Module/VideoPlayer/VideoPlayer";

const PlayLesson = ({lesson}) => {

  const elements = {
    video:  <VideoPlayer lesson = {lesson} />, 
    text: 'djflkdjsf',
    quiz: 'There will be quizz here so be ready to answer all quizz question '
  }



  return (
    <div>
      <section class="watch-video">
        <div className="video-container  dark:bg-main-dark-bg bg-main-bg box-shadow ">
           <CollapseSystem object = {elements} displayKeys= {['video', 'text', 'quiz']} />
        </div>
      </section>
    </div>
  );
};

export default PlayLesson;
