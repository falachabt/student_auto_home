import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { AuthStateContext } from "../../Contexts/AuthContext";
import { CourseContextProvider } from "../../Contexts/CourseContext";
import { course_action } from "../../Data/Action/action";
import { fetchData } from "../../Firebase/functions/firestoreFunc";
import { course_reducer, InitialState } from "../../Reducer/courseReducer";
import CourseContent from "./CourseComp/CourseContent";
import CourseSide from "./CourseComp/CourseSide";
import Module from "./Module";
import PlayLesson from "./PlayLesson";
import PlayList from "./PlayList";

const Course = () => {
  const [modules, setModules] = useState([]);
  const [breadcumbs, changeBreadCumbs] = useState([
    {
      name: "Your Course",
      link: "/course",
    },
  ]);
  const { user } = AuthStateContext();
  const { moduleid, lessonid } = useParams();
  const [state, dispatch] = useReducer(course_reducer, InitialState);

  function start() {
  }
  
  
  
  useEffect(() => {
   
    

    if (user) {
      fetchData({
        path: `students/${user.uid}/learn`,
      }).then((data) => {
        let tested_courses = data.find((item) => {
          return item.id === "courses";
        });

        sessionStorage.setItem("modules", JSON.stringify(tested_courses));

        setModules([...tested_courses.modules, ...tested_courses.modules, ...tested_courses.modules]);
      });
    }

    // add the current module to the breadcrumbs
    if (moduleid && breadcumbs.length < 2) {
      const selected_module = modules.find((item) => {
        return (item.id = moduleid);
      });

      changeBreadCumbs([
        ...breadcumbs,
        { name: selected_module.name, link: `/course/${selected_module.id}` },
      ]);
    }
  }, [moduleid]);

  const CustumComp = ({ mod_id, less_id, all_mod }) => {
    // return your couse page if there is no modue selected or lesson selected
    if (!mod_id && !less_id) {
      return (
        <div class="box-container custumScrollBar">
          {modules?.map((module, index) => {
            return <Module module={module} key={index} />;
          })}
        </div>
      );
    }

    // return the module page if the is any module selected
    if (mod_id) {
      let selected_mod = modules.find((item) => {
        return item.id === mod_id;
      });

      // return the playlist of the curernt module selected
      if (!less_id) {
        return (
          <div>
            <PlayList module={selected_mod} />
          </div>
        );
      }

      // return the play lesson page if there is a lesson selected
      if (less_id) {
        const selected_lesson = selected_mod.lessons.find((item) => {
          return item.id === less_id;
        });

        return <PlayLesson lesson={selected_lesson} />;
      }
    }
  };

  return (
    <div className="p-5 mb-56">
      <section class="courses px-4">
        <Header items={breadcumbs} />

        {JSON.stringify(state)}

        <CustumComp mod_id={moduleid} less_id={lessonid} all_mod={modules} />
      </section>
    </div>
  );
};

export default Course;
