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
import { fetchData, updateData } from "../../Firebase/functions/firestoreFunc";
import CourseSide from "./CourseComp/CourseSide";
import VideoPlayer from "./CourseComp/Module/VideoPlayer/VideoPlayer";
import CollapseComp from "../../Components/CollapseComp/CollapseComp";
import TextEditor from "./CourseComp/Module/VideoPlayer/RichText";
import { UseStateContext } from "../../Contexts/ContextProvider";
import { toast } from "react-toastify";


const PlayLesson = () => {
  const { moduleid, lessonid } = useParams();
  const { user } = AuthStateContext();
  const { screenSize } = UseStateContext();
  const [lesson, setLesson] = useState({});
  const [module, setModule] = useState({});
  const [steps, setSteps] = useState([{ name: "course", link: "/course" }]);
  const [lessonState, setLessonState] = useState({ video: true, text: false, quiz: false});
  const [state, setState] = useState({ fetch_less: true, fetch_mod: false, error_fetch: true});

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

        if (!lessons[0].progress){
          setLesson({...lessons[0], progress: lessonState})
        }
        else{
          setLesson(lessons[0])
        }

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

  async function onVideoEnd(onSuccess) {
    console.log('enter end function');
    try{
      if(!lesson.progress.text)
        await updateData({
          path: `students/${user.uid}/modules/${moduleid}/lessons/${lessonid}`,
          data: { ...lesson, progress: {...lesson.progress, text: true} }
        });
        toast.success(`${lesson.name} -> text open`, {
          position: toast.POSITION.TOP_CENTER,
          // containerId: "1",
        });
        onSuccess && onSuccess();
      setLesson({...lesson, progress: {...lesson.progress, text: true}});

    }catch(err){}
  }

  const elements = {
    video: <VideoPlayer lesson = {lesson} onVideoEnd = {onVideoEnd} />,
    text: <TextEditor />,
    quiz: <Quiz />,
  };

  return (
    <div className="p-5 mb-20">
      <header>
        <Header items={steps} />
      </header>
      
      <button onClick= {() => {toast.success('voici ca qui marche', {containerId: '1'})}}>toatt</button>

      <main className=" flex  max-sm:flex-col justify-start gap-4 w-full ">
        <section style={{maxWidth: 0.9*screenSize}} className="watch-video  flex-[2] max-w-4xl  ">
          <div className="video-container flex flex-col gap-3    dark:bg-main-dark-bg bg-main-bg box-shadow ">
            {
              Object.entries(elements).map(([key, value]) => {
                
                if(state.fetch_less === true){
                  
                  return (
                    domFunction.insertLoading({
                      number: 1,
                      height: '40px',
                      width: '100%',
                      containerClassName: 'flex w-full flex-col gap-3',
                      useSx: true,
                      key: value,

                    })
                  )
                }

                return (
                  <CollapseComp key={key} title={key} openable={lesson.progress && (lesson.progress[key] || false)} >
                    {value}
                  </CollapseComp>
                )
              })
            }
           
          </div>
        </section>
        <section className=" h-fit max-sm:w-full  ">
          <CourseSide />
        </section>
      </main>
    </div>
  );
};

export default PlayLesson;
