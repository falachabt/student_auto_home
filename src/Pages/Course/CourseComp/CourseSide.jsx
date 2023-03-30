import { useEffect, useState } from "react";
import { List } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { CourseStateContext } from "../../../Contexts/CourseContext";
import Module from "./Module/Module";
import { UseStateContext } from "../../../Contexts/ContextProvider";
import { fetchData } from "../../../Firebase/functions/firestoreFunc";
import { AuthStateContext } from "../../../Contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const CourseSide = () => {
  const [openModuleIds, setOpenModuleIds] = useState([]);
  const { screenSize } = UseStateContext();
  const { user } = AuthStateContext();
  const { moduleid, lessonid } = useParams();
  const navigate = useNavigate();

  const {
    activeOption,
    setActiveOption,
    activeSideBar,
    setActiveSideBar,
    modules,
    state,
    setModules,
    setState,
    setActiveLesson,
    setActiveModule,
  } = CourseStateContext();

  const handleModuleClick = (moduleId) => {
    if (openModuleIds.includes(moduleId)) {
      setOpenModuleIds(openModuleIds.filter((id) => id !== moduleId));
    } else {
      setOpenModuleIds([...openModuleIds, moduleId]);
    }
  };

  useEffect(() => {
    setState({ ...state, fetch_course: true });
    const fetched = fetchData({ path: `students/${user.uid}/learn` });

    // verify if there are data and set it in the container
    fetched.then((dat) => {
      let tested_courses = dat.find((item) => {
        return item.id === "courses";
      });

      tested_courses && setModules(tested_courses.modules);

      if (moduleid && lessonid && tested_courses) {
        const active_module = tested_courses.modules.find((mod) => {
          return mod.id === moduleid;
        });
        setActiveModule(active_module);

        setActiveLesson(
          active_module.lessons.find((less) => {
            return less.id === lessonid;
          })
        );
      }

      setState({ ...state, fetch_course: false });
    });
  }, [setState, setModules, user.uid]);

  function handleChangeActiveOption(e) {
    setActiveOption(e.target.name);
  }

  return (
    <div
      className={` ${
        activeSideBar === true && screenSize < 400 && "translate-x-[300px]  "
      } duration-500 py-4 max-[400px]:left-[-300px] max-[400px]:fixed top-0 left-0 z-10 dark:bg-secondary-dark-bg w-[250px]  h-screen flex flex-col border-r border-gray-300`}
    >
      <div className="flex justify-center shadow p-1 ">
        <button
          name="course"
          className={` p-2 ${
            activeOption == "course" && "bg-blue-600"
          } hover:bg-blue-500 rounded-l-md border-gray-300 border "`}
          onClick={handleChangeActiveOption}
        >
          Course
        </button>
        <button
          name="quiz"
          className={` p-2 ${
            activeOption === "quiz" && "bg-blue-600"
          } hover:bg-blue-500 rounded-r-md border-gray-300 border "`}
          onClick={handleChangeActiveOption}
        >
          Quizz
        </button>

        <button
          className=" min-[400px]:hidden relative right-[-50px] "
          onClick={() => {
            setActiveSideBar(false);
          }}
        >
          <Cancel />
        </button>
      </div>

      <List component="nav">
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
