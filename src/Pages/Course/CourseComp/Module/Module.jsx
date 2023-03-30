import React from "react";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Lesson from "./Lesson";

const Module = ({ module, openModuleIds, handleModuleClick }) => {
  return (
    <div>
      <div >
        <ListItemButton
          onClick={() => handleModuleClick(module.id)}
          className={`
        "flex items-center justify-between",
        ${openModuleIds.includes(module.id) && "bg-gray-100"}
      `}
        >
          <ListItemText primary={module.name} />
          {module.lessons &&
            (openModuleIds.includes(module.id) ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            ))}
        </ListItemButton>

        <Collapse in={openModuleIds.includes(module.id)}>
          {module.lessons && (
            <List component="div" disablePadding>
              {module.lessons?.map((lesson, index) => (
                <Lesson module={module} lesson={lesson} key={index} />
              ))}
            </List>
          )}
        </Collapse>
      </div>
    </div>
  );
};

export default Module;
