import {  PlayArrow } from "@mui/icons-material";
import React from "react";
import { NavLink } from 'react-router-dom'

const PlayList = ({ module }) => {
  return (
    <div>
      <section class="playlist-details custumScrollBar  ">
        <div class="row box-shadow bg-main-bg dark:bg-main-dark-bg  rounded-md box-shdaow ">
          <div class="column">
            <div class="thumb">
              <img src={module.cover_page_URL} alt="" />
              <span>10 videos</span>
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
          {module.lessons.map((lesson, index) => {
            return (
              <NavLink to={lesson.id}  className="box"  key={index} >
                <i class="fas fa-play"> <PlayArrow /> </i>
                <img src={lesson.cover_page_URL} alt={lesson.title} />
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
