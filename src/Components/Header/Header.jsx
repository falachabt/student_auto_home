import { ChevronRight } from "@mui/icons-material";
import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ items = [] }) => {
  return (
    <div className="  text-2xl font-semibold dark:text-white border-b  p-2 px-4 text-start  m-2 capitalize flex gap-2 ">
      {items.map((item, index) => {
        const lenght = items.length;
        return (
          <NavLink
          to={item.link}
            key={index}
            className="flex gap-1 items-center hover:text-main-blue"
          >
            <h1 className=" ">{item.name}</h1>
            {lenght !== 1 ? index !== lenght - 1 && <ChevronRight /> : ""}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Header;
