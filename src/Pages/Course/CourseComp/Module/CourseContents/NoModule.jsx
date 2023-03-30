import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../../../Data/Animation/learn.json";
import { ArrowRight } from "@mui/icons-material";
import { CourseStateContext } from "../../../../../Contexts/CourseContext";

const NoModule = () => {
  const { setActiveSideBar } = CourseStateContext();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <div className="flex items-center justify-center h-full   w-full">
      <div className="top-[-50px] relative">
        <div className="w-full min-[400px]:hidden top-0  flex justify-start">
          <button
            onClick={() => {
              setActiveSideBar(true);
            }}
          >
            <ArrowRight />
          </button>
        </div>

        <div className="max-w-[500px] ">
          <div className="h-[300px]">
            <Lottie options={defaultOptions} />
          </div>

          <p className="relative   ">
            <span className="text-xl font-semibold mb-4 ">
              Get started on your learning journey!
            </span>
            <span>
              Click on a lesson to start exploring the course material and
              advancing your skills.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoModule;
