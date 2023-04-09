import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { Lock, NoteAdd, OpenInBrowser } from "@mui/icons-material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const Lesson = ({ lesson, module, isUnlock }) => {

  const { lessonid } = useParams();
  const navigate = useNavigate();

  function handleClick () {
    if(isUnlock)
      navigate(`/course/${module.id}/${lesson.id}`)
  }

  

  return (
    <div className={` text-gray-800 w-full dark:text-gray-200  ${lessonid === lesson.id ? ' bg-opacity-70 bg-main-blue text-white ' : " hover:bg-secondary-blue hover:bg-opacity-30 "} `}>
      <button onClick={handleClick} className="w-full">
        <List component="div"  className="flex items-center justify-between w-[100%]">
          <ListItemButton  key={lesson.id} className={`${isUnlock? '' : 'hover:cursor-not-allowed' }`}>
            <ListItemIcon className="dark:text-gray-200">{isUnlock ? <LockOpenIcon /> : <Lock />}</ListItemIcon>
            <ListItemText primary={lesson.title} />
          </ListItemButton>
          <div className=" pr-4 ">
            <CircularProgressbar text={`${Math.round(lesson.progress_percent * 100) || 0}%`} strokeWidth={10}  styles={{ path: { stroke: '#00ff00' } }}  minValue={0} maxValue={1} value={lesson.progress_percent || 0} className=" max-h-[45px] m-0 p-0" />
          </div>
        </List>
      </button>
    </div>
  );
};

export default Lesson;
