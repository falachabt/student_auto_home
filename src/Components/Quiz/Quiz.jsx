import React, { useState } from "react";
import { Button, Dialog } from "@mui/material";

const signalisationQuestions = [
  {
    question: "What does a red traffic light mean?",
    answers: [
      { text: "Stop", correct: true },
      { text: "Slow down", correct: false },
      { text: "Go", correct: false },
      { text: "Merge", correct: false },
    ],
  },
  {
    question: "What does a yield sign mean?",
    answers: [
      { text: "Merge", correct: false },
      { text: "Slow down", correct: false },
      { text: "Stop", correct: false },
      { text: "Give way", correct: true },
    ],
  },
  {
    question:
      "What does a green arrow pointing left on a traffic light mean?",
    answers: [
      { text: "Go left", correct: true },
      { text: "Stop", correct: false },
      { text: "Go straight", correct: false },
      { text: "Turn right", correct: false },
    ],
  },
  {
    question: "What does a blue sign with a white H mean?",
    answers: [
      { text: "Hospital ahead", correct: true },
      { text: "Hotel ahead", correct: false },
      { text: "Highway ahead", correct: false },
      { text: "Hazardous materials ahead", correct: false },
    ],
  },
  {
    question:
      "What does a diamond-shaped sign with an exclamation mark inside mean?",
    answers: [
      { text: "Road work ahead", correct: false },
      { text: "School zone ahead", correct: false },
      { text: "Dangerous curve ahead", correct: false },
      { text: "Warning of possible hazards ahead", correct: true },
    ],
  },
  {
    question: "What does a yellow traffic light mean?",
    answers: [
      { text: "Go", correct: false },
      { text: "Slow down", correct: true },
      { text: "Stop", correct: false },
      { text: "Merge", correct: false },
    ],
  },
  {
    question: "What does a red circle with a diagonal line through it mean?",
    answers: [
      { text: "No parking", correct: true },
      { text: "No U-turn", correct: false },
      { text: "No stopping", correct: false },
      { text: "No entry", correct: false },
    ],
  },
  {
    question: "What does a brown sign with a white tent mean?",
    answers: [
      { text: "Camping site ahead", correct: true },
      { text: "Tourist information ahead", correct: false },
      { text: "Picnic area ahead", correct: false },
      { text: "Rest area ahead", correct: false },
    ],
  },
  {
    question: "What does a red triangle with a white border mean?",
    answers: [
      { text: "School zone ahead", correct: false },
      { text: "Stop sign ahead", correct: false },
      { text: "Yield sign ahead", correct: false },
      { text: "Warning of yield ahead", correct: true },
    ],
  },
  {
    question:
      "What does a black arrow pointing downwards on a yellow background mean?",
    answers: [
      { text: "One-way street", correct: false },
      { text: "No right turn", correct: false },
      { text: "No left turn", correct: true },
      { text: "No U-turn", correct: false },
    ],
  },
];


const QuizConfirm =  (props) => {
  const [isSubmited, setSubmited] = useState({
    start: false, 
    error: false,
    end: false,
  });

  function onSubmitOk () {
    setSubmited({
      start: false,
      end: true,
      error: false
    })


  }

  function onSubmitError () {
    setSubmited({
      start: false,
      end: true,
      error: true,
    })
  }

  function onCancelClick () {
    props.cancelClick && props.cancelClick();
  }

  
  function handleSubmit() {
    setSubmited({...isSubmited, start: true});
    props.updateLessonProgress && props.updateLessonProgress('submit', onSubmitOk, onSubmitError);
  }

  return (
    <div className="flex flex-col gap-2 p-3 ">
      <header className="p-2  text-center">
        <h1 className="text-2xl pb-1 border-b-1 border-gray-700 borer-solid font-semibold">Submit this quiz ?</h1>
        <h2>You will not be able to change after</h2>
      </header>

      <main className="my-1">
        {/* info section */}
        <section className=" p-3  ">
          { isSubmited.error && <h3 className="text-red-500">something went wrong, please try again</h3> }
          { (!isSubmited.error && isSubmited.end) && <h3>Your Quiz have been submited</h3> }
        </section>
      </main>

    
      <div className="border-t-1 border-gray-700 py-3 border-solid  flex gap-2 justify-end items-center">
        <Button disabled = {isSubmited.start} onClick = {onCancelClick} variant = "outlined" color = "error">Cancel</Button>
        <Button disabled = {isSubmited.start} onClick = {handleSubmit} variant = "outlined" color = "info">Submit</Button>
      </div>
    </div>
  )
}

const Quiz = (props) => {
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
    const [currentQuestion, setCurrentQuestion ]  = useState(signalisationQuestions[currentQuestionNumber - 1])
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("B");
    const [submitDialog, setSubmitDialog] = useState(false)


    const handleNextQuestion = () => {
        setCurrentQuestion(signalisationQuestions[currentQuestionNumber - 1]);
        setCurrentQuestionNumber(currentQuestionNumber + 1);
        setSelectedAnswer("");
    };
    
    const handlePreviousQuestion = () => {
        setCurrentQuestion(signalisationQuestions[currentQuestionNumber - 2]);
        setCurrentQuestionNumber(currentQuestionNumber - 1);
        setSelectedAnswer("");
    };

    const handleSubmit = () => {
        // Check if the selected answer is correct and do something with the result
        setSubmitDialog(true);
    };

    function cancelClick () {
      setSubmitDialog(false);
    }

    return (
        <div id = 'lesson_quiz' className="flex flex-col items-center justify-center pt-1 dark:text-white w-full ">
            <div className="flex items-center justify-between w-[95%] dark:text-white mb-4 font-bold text-lg text-center border-t-1 border-b-1 border-solid  p-4">
        <div>QUESTION {currentQuestionNumber}</div>
        <div>{currentQuestionNumber}/10</div>
        <div className="flex items-center justify-center w-40 h-8 ml-2 text-white bg-gray-400 rounded-lg">
          <div
            className="w-1/10 h-full bg-main-blue rounded-lg"
            style={{ width: `${(currentQuestionNumber / 10) * 100}%` }}
          ></div>
          <div className="ml-2 absolute w-full -right-[35%]">
            {Math.floor((currentQuestionNumber / 10) * 100)}%
          </div>
        </div>
            </div>

            <div className="p-8 pt-0 text-xl text-center  ">
                { currentQuestion.question }
            </div>

        <div className="flex flex-col items-center justify-end  mb-8">
            <div className="flex items-center justify-center w-full mb-2">
                <div
                    className={`w-48 p-4 text-center border-2 rounded-lg cursor-pointer ${
                        selectedAnswer === "A" ? "bg-gray-700 text-white" : ""
                    }`}
                    onClick={() => setSelectedAnswer("A")}
                >
                    {currentQuestion.answers[0].text}
        </div>
        <div
            className={`w-48 p-4 text-center border-2 rounded-lg cursor-pointer ${
                selectedAnswer === "B" ? "bg-gray-700 text-white" : ""
            }`}
            onClick={() => setSelectedAnswer("B")}
            >
                {currentQuestion.answers[1].text}
          </div>
        </div>

        <div className="flex items-center justify-center w-full mb-2">
            <div
                className={`w-48 p-4 text-center border-2 rounded-lg cursor-pointer ${
                    selectedAnswer === "C" ? "bg-gray-700 text-white" : ""
                }`}
                onClick={() => setSelectedAnswer("C")}
                >
                    {currentQuestion.answers[2].text}        
            </div>
        <div
            className={`w-48 p-4 text-center border-2 rounded-lg cursor-pointer ${
                selectedAnswer === "D" ? "bg-gray-700 text-white" : ""
            }`}
            onClick={() => setSelectedAnswer("D")}
            >
                {currentQuestion.answers[2].text}        
          </div>
        </div>
        </div>

        <div className="flex items-center justify-end w-full mt-3 p-4 ">
            <div className={`${currentQuestionNumber === 1 ? " invisible " : ""}`}>
          <Button
            color="error"
            variant="contained"
            className=" font-bold text-center "
            onClick={handlePreviousQuestion}
          >
            Précédent
          </Button>
            </div>
            <div className={`${currentQuestionNumber === signalisationQuestions.length ? " hidden " : ""}`}>
          <Button
            color="info"
            variant="contained"
            className=" font-bold text-center  "
            onClick={handleNextQuestion}
          >
            Suivant
          </Button>
            </div>
            <div
                className={`flex items-center justify-center  ${
                    currentQuestionNumber === signalisationQuestions.length ? "" : " hidden "
                }`}
            >
                <Button
                    color="warning"
                    variant="contained"
                    className=" font-bold text-center"
                    onClick={handleSubmit}
                    disabled={currentQuestionNumber !== 10}
                >
                    Soumettre
                </Button>
            </div>
        </div>

        {/* section for submit dialog */}
        <section>
              <Dialog open = {submitDialog}>
                <QuizConfirm cancelClick = {cancelClick} updateLessonProgress = {props.updateLessonProgress} />
              </Dialog>
        </section>  
    </div>
  );
};

export default Quiz;
