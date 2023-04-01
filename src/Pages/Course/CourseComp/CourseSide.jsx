import { useEffect, useState } from "react";
import { List } from "@mui/material";
import Module from "./Module/Module";
import { UseStateContext } from "../../../Contexts/ContextProvider";
import { fetchData } from "../../../Firebase/functions/firestoreFunc";
import { AuthStateContext } from "../../../Contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const CourseSide = () => {
  const [openModuleIds, setOpenModuleIds] = useState([]);
  const [ currentOptions, setCurrentOption] = useState({
    currentModule: {}, 
    currentLesson: {},
  })
  const [modules, setModules ] = useState([]);
  const { screenSize } = UseStateContext();
  const { user } = AuthStateContext();
  const { moduleid, lessonid } = useParams();
  const navigate = useNavigate();

  

  const handleModuleClick = (moduleId) => {
    if (openModuleIds.includes(moduleId)) {
      setOpenModuleIds(openModuleIds.filter((id) => id !== moduleId));
    } else {
      setOpenModuleIds([...openModuleIds, moduleId]);
    }
  };

  useEffect(() => {
    const fetched = fetchData({ path: `students/${user.uid}/modules` });

    // verify if there are data and set it in the container
    fetched.then((dat) => {
      setModules(dat);

      if (moduleid && lessonid) {
        const active_module = dat.find((mod) => {
          return mod.id === moduleid;
        });

        const active_lesson = active_module.lessons.find((less) => { return  less.id === lessonid })

        setCurrentOption({...currentOptions, currentModule: active_module, currentLesson: active_lesson});

      }

    });
  }, []);

  

  return (
    <div
      className={` box-shadow   py-4  dark:bg-main-dark-bg w-[250px] dark:text-white  rounded-xl flex flex-col border-r border-gray-300`}
    >
   

      <List component="nav" >
        {modules?.map((module) => (
          <div key={module.id}>
            <Module
              module={module}
              handleModuleClick={handleModuleClick}
              openModuleIds={openModuleIds}
            />
          </div>
        ))}
      </List>
    </div>
  );
};

export default CourseSide;
