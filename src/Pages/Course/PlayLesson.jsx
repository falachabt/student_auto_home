import { where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Quiz } from "../../Components";
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
  // const [module, setModule] = useState({});
  const [steps, setSteps] = useState([{ name: "course", link: "/course" }]);
  const [lessonState, setLessonState] = useState({ video: true, text: false, quiz: false});
  const [state, setState] = useState({ fetch_less: true, fetch_mod: false, error_fetch: true});
  const [reload, setRelaod] = useState(0);

  useEffect(() => {

    setState({...state, fetch_less: true})
    
    fetchData({
      path: `students/${user.uid}/modules`,
      custumQueryProps: [where("id", "==", moduleid)],
    }).then((modules) => {
      // setModule(modules[0]);
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
    setSteps([
      {name: 'courses', link: "/course"},
      { name: mod.name, link: `/course/${mod.id}` },
      { name: less.title, link: `/course/${mod.id}/l${less.id}` },
    ]);
    
  }

  /**
 * Updates the lesson progress and progress percent based on the action taken by the user.
 * @param {function} onSuccess - A callback function to be called on successful completion of the update.
 * @param {function} onError - A callback function to be called if there is an error during the update.
 * @param {string} moduleId - The ID of the module that contains the lesson.
 * @param {string} lessonId - The ID of the lesson being updated.
 * @param {object} lesson - The current state of the lesson being updated.
 * @param {number} reload - A counter used to force a reload of the component when the progress is updated.
 * @param {function} setLesson - A function to update the lesson state with the new progress.
 * @param {function} setReload - A function to update the reload state to force a reload of the component.
 */
  async function updateLessonProgress(action, onSuccess, onError) {
    try {
      let progress = {...lesson.progress};
      let progress_percent = 0;
      let toast_message = "";

      switch (action) {
        case 'text':
          if (lesson.progress.text) return;
          progress = { ...lesson.progress, text: true };
          progress_percent = 1 / 3;
          toast_message = "unlock text";
          break;
  
        case 'quiz':
          if (lesson.progress.quiz) return;
          progress = { ...lesson.progress, text: true, quiz: true };
          progress_percent = 2 / 3;
          toast_message  = "Go to quiz";
          break;
          
        case 'submit':
          progress_percent = 3 / 3;
          toast_message = "Submitted move to next lesson"
          break;
          
          default:
            return;
          }
          
          await updateData({
            path: `students/${user.uid}/modules/${moduleid}/lessons/${lessonid}`,
            data: { ...lesson, progress: progress, progress_percent: progress_percent },
          });
          
          setRelaod(reload + 1);
          onSuccess && onSuccess();
          setLesson({ ...lesson, progress: progress, progress_percent: progress_percent });
          toast.success(toast_message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } catch (error) {
      onError && onError();
    }
  }
  

  const elements = {
    video: <VideoPlayer lesson = {lesson} updateLessonProgress = {updateLessonProgress} />,
    text: <TextEditor updateLessonProgress = {updateLessonProgress} />,
    quiz: <Quiz  updateLessonProgress = {updateLessonProgress}/>,
  };

  return (
    <div className="p-5 mb-20">
      <header>
        <Header items={steps} />
      </header>
      

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
          <CourseSide reload = {reload} />
        </section>
      </main>
    </div>
  );
};

export default PlayLesson;
