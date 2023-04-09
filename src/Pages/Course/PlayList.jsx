import {  Lock, PlayArrow } from "@mui/icons-material";
import { where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {  useNavigate, useParams } from 'react-router-dom'
import Header from "../../Components/Header/Header";
import { AuthStateContext } from "../../Contexts/AuthContext";
import { fetchData } from "../../Firebase/functions/firestoreFunc";
import { isLesonUnlock } from "./utls";
import { LinearProgress } from "@mui/material";

const PlayList = () => {

  const { moduleid } = useParams();
  const [ module, setModule ] = useState({});
  const { user } = AuthStateContext();
  const [ steps, setSteps ]  = useState([{name: 'course', link: "/course" }]);
  const [ lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    fetchData({
      path: `students/${user.uid}/modules`, 
      custumQueryProps: [where('id', '==', moduleid)]
    }).then((data_container) => {
      setModule(data_container[0]);

      fetchData({
        path: `students/${user.uid}/modules/${moduleid}/lessons`
      }).then((less_contain) => {
        setLessons(less_contain);
        console.log(less_contain)
      } )
      updateSteps(data_container[0]);
    })
  }, [moduleid,  user.uid])

  function updateSteps(mod) {
    let isSet = steps.find((item) => { return item.name === mod.name });
    
    if(!isSet){
      setSteps([...steps, {name: mod.name, link: `/course/${mod.id}`}])
    }
  }

  

  function hanleClicknav(lesson) {
    isLesonUnlock(lesson, lessons) && navigate(lesson.id)
  }





  return (
    <div className="p-5">
      <section>
        <Header items={steps} />
      </section>
      <section class="playlist-details custumScrollBar  ">
        <div class="row box-shadow bg-main-bg dark:bg-main-dark-bg  rounded-md box-shdaow ">
          <div class="column">
            
            <div class="thumb">
              <img src={module.cover_page_URL} alt="" />
              <span>{ module.lessons?.length } videos</span>
            </div>
          </div>
          <div class="column">
            <div class="details">
              <h3 className=" text-2xl text-[#2c3e50] dark:text-gray-200 ">
                {module.name}
              </h3>
              <p className="text-start text-[#888] dark:text-gray-300">
                {module.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="playlist-videos">
        <h1 class="heading text-[#2c3e50] dark:text-gray-200">
          playlist videos
        </h1>

        <div class="box-container custumScrollBar ">
          {lessons?.map((lesson, index) => {
            return (
              <button onClick={() => {hanleClicknav(lesson)}}  className="box box-shadow dark:bg-main-dark-bg dark:text-white"  key={index}>
                <i class="fas fa-play"> {isLesonUnlock(lesson, lessons)? <PlayArrow /> : <Lock />  }  </i>
                <img src={lesson.cover_page_URL || module.cover_page_URL} alt={lesson.title} />
                <h3>{lesson.title}</h3>
                <div className="mb-2">
                  <LinearProgress sx = {{height: 6, borderRadius: 2}} variant="determinate" value={lesson.progress_percent * 100 || 0} />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default PlayList;
