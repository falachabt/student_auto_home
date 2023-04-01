import {  PlayArrow } from "@mui/icons-material";
import { where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useParams } from 'react-router-dom'
import Header from "../../Components/Header/Header";
import { AuthStateContext } from "../../Contexts/AuthContext";
import { fetchData } from "../../Firebase/functions/firestoreFunc";

const PlayList = () => {

  const { moduleid } = useParams();
  const [ module, setModule ] = useState({});
  const { user } = AuthStateContext();
  const [ steps, setSteps ]  = useState([{name: 'course', link: "/course" }]);

  useEffect(() => {

    fetchData({
      path: `students/${user.uid}/modules`, 
      custumQueryProps: [where('id', '==', moduleid)]
    }).then((data_container) => {
      console.log(data_container)
      setModule(data_container[0]);
      updateSteps(data_container[0]);
    })
  }, [])

  function updateSteps(mod) {
    let isSet = steps.find((item) => { return item.name === mod.name });
    
    if(!isSet){
      setSteps([...steps, {name: mod.name, link: `/course/${mod.id}`}])
    }
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
          {module?.lessons?.map((lesson, index) => {
            return (
              <NavLink to={lesson.id}  className="box box-shadow dark:bg-main-dark-bg dark:text-white"  key={index}  >
                <i class="fas fa-play"> <PlayArrow /> </i>
                <img src={lesson.cover_page_URL || module.cover_page_URL} alt={lesson.title} />
                <h3>{lesson.title}</h3>
              </NavLink>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default PlayList;
