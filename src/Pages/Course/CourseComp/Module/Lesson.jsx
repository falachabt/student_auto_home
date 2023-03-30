import React from "react";
import { CourseStateContext } from "../../../../Contexts/CourseContext";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { NoteAdd } from "@mui/icons-material";

const Lesson = ({ lesson, module }) => {
  const { setActiveLesson, activeLesson, setActiveModule } = CourseStateContext();
  const navigate = useNavigate()

  const handleLessonClick = () => {
    setActiveLesson(lesson);
    setActiveModule(module)

    
    navigate(`/course/${module.id}/${lesson.id}`)
  };

  return (
    <div>
      <List component="div" disablePadding>
        <ListItemButton
          key={lesson.id}
          onClick={handleLessonClick}
          className={` pl-8 ${activeLesson === lesson.id && "bg-gray-200"} `}
        >
          <ListItemIcon>
            {<NoteAdd /> }
          </ListItemIcon>
          <ListItemText primary={lesson.title} />
        </ListItemButton>
      </List>
    </div>
  );
};

export default Lesson;
