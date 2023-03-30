import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchData } from "../Firebase/functions/firestoreFunc";
import { AuthStateContext } from "./AuthContext";
const CourseContext = createContext();

const CourseContextProvider = ({ children }) => {
  const [activeOption, setActiveOpt] = useState("course");
  const [activeLesson, setActiveLesson] = useState("");
  const [activeModule, setActiveModule] = useState({});
  const [activeSideBar, setActiveSideBar] = useState(true);
  const [modules, setModules] = useState([]);
  const [state, setState] = useState({
    fetch_course: false,
  });

  function setActiveOption(value) {
    setActiveOpt(value);
    value !== activeOption && setActiveLesson("");
  }

  return (
    <CourseContext.Provider
      value={{
        activeOption,
        setActiveOption,
        activeLesson,
        setActiveLesson,
        activeSideBar,
        setActiveSideBar,
        modules,
        setModules,
        state,
        setState,
        activeModule,
        setActiveModule,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export function CourseStateContext() {
  return useContext(CourseContext);
}

export { CourseContext, CourseContextProvider };
