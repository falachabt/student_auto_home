import { where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Quiz } from "../../Components";
import CollapseSystem from "../../Components/CollapseSystem/CollapseSystem";
import Header from "../../Components/Header/Header";
import { AuthStateContext } from "../../Contexts/AuthContext";
import { domFunction } from "../../Data/function";
import { fetchData } from "../../Firebase/functions/firestoreFunc";
import CourseSide from "./CourseComp/CourseSide";
import VideoPlayer from "./CourseComp/Module/VideoPlayer/VideoPlayer";


const PlayLesson = () => {
  const { moduleid, lessonid } = useParams();
  const { user } = AuthStateContext();
  const [lesson, setLesson] = useState({});
  const [module, setModule] = useState({});
  const [steps, setSteps] = useState([{ name: "course", link: "/course" }]);
  const [state, setState] = useState({
    fetch_less: false,
    fetch_mod: false,
    error_fetch: true,
  });

  useEffect(() => {

    setState({...state, fetch_less: true})
    
    fetchData({
      path: `students/${user.uid}/modules`,
      custumQueryProps: [where("id", "==", moduleid)],
    }).then((modules) => {
      setModule(modules[0]);
      fetchData({
        path: `students/${user.uid}/modules/${moduleid}/lessons`,
        custumQueryProps: [where("id", "==", lessonid)],
      }).then((lessons) => {
        setLesson(lessons[0]);
        setState({ ...state, fetch_less: false });
        updateSteps(modules[0], lessons[0]);
      }, []);
    });
  }, [moduleid, lessonid]);

  function updateSteps(mod, less) {
    let isSet = steps.find((item) => {
      return item.name === mod.name;
    });

    if (!isSet) {
      setSteps([
        ...steps,
        { name: mod.name, link: `/course/${mod.id}` },
        { name: less.title, link: `/course/${mod.id}/l${less.id}` },
      ]);
    }
  }

  const elements = {
    video: <VideoPlayer lesson={lesson} />,
    text: "djflkdjsf",
    quiz: <Quiz />,
  };

  return (
    <div className="p-5 mb-20">
      <header>
        <Header items={steps} />
      </header>

      <main className=" flex justify-start gap-4 w-full ">
        <section class="watch-video  flex-[2]  ">
          <div className="video-container     dark:bg-main-dark-bg bg-main-bg box-shadow ">
            {state.fetch_less === false && (
              <CollapseSystem
                object={elements}
                displayKeys={["video", "text", "quiz"]}
              />
            )}

            {state.fetch_less === true && (
              domFunction.insertLoading({
                number: 3,
                height: '40px',
                width: '100%',
                containerClassName: 'flex w-full flex-col gap-3',
                useSx: true,
              })
            )

            }
          </div>
        </section>
        <section className=" h-fit ">
          <CourseSide />
        </section>
      </main>
    </div>
  );
};

export default PlayLesson;
