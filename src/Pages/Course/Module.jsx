import { Lock } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const Module = ({ module }) => {
  return (
    <div>
      <div className="box box-shadow dark:bg-main-dark-bg bg-main-bg dark:text-gray-100 ">
        <div className=" p-2 my-1 ">
          <span className="text-2xl w-full text-start">7 / 10 Complete</span>
          <div className="info">
            <LinearProgress
              sx={{ height: "7px", borderRadius: "0.5rem" }}
              variant="determinate"
              value={70}
            />
          </div>
        </div>
        <div className="thumb ">
          <img src={module.cover_page_URL} alt="" />
          <i>
            <Lock />
          </i>
          <span>{module.lessons?.length || 0} videos</span>
          <span>{module.lessons?.length || 0} videos</span>
        </div>
        <div className="flex flex-start justify-start flex-col">
          <h3 className="text-2xl">{module.name}</h3>
          <NavLink
            to={`${module.id}`}
            style={{ backgroundColor: module.color }}
            className="py-2 px-4 bg-main-blue text-gray-50 rounded-md"
          >
            view playlist
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Module;
