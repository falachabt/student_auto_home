import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink, useParams } from "react-router-dom";

import { Lock, NoteAdd, OpenInBrowser } from "@mui/icons-material";
import LockOpenIcon from '@mui/icons-material/LockOpen';

const Lesson = ({ lesson, module }) => {

  const { lessonid } = useParams();

  return (
    <div className={` text-gray-800 dark:text-gray-200  ${lessonid === lesson.id ? ' bg-green-300 dark:bg-green-500 ' : ""} `}>
      <NavLink to={`/course/${module.id}/${lesson.id}`}>
        <List component="div" disablePadding>
          <ListItemButton key={lesson.id} className={` pl-8  `}>
            <ListItemIcon className="dark:text-gray-200">{lessonid === lesson.id ? <LockOpenIcon /> : <Lock />}</ListItemIcon>
            <ListItemText primary={lesson.title} />
          </ListItemButton>
        </List>
      </NavLink>
    </div>
  );
};

export default Lesson;
