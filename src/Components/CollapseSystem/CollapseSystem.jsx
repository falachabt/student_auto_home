import React, { useState } from "react";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ExpandMore, ChevronRight } from "@mui/icons-material";

let data = {
  prop1: "Lorem ipsum dolor sit amet",
  prop2: "consectetur adipiscing elit",
  prop3: "sed do eiusmod tempor incididunt",
  prop4: "ut labore et dolore magna aliqua",
  prop5: "Ut enim ad minim veniam",
  prop6: "quis nostrud exercitation ullamco laboris",
};

let propsWithCollapse = ["prop2", "prop4", "prop6"];

const CollapseSystem = ({ object, displayKeys }) => {
  const [openCollapse, setOpenCollapse] = useState({});

  if (object && typeof displayKeys === "object") {
    data = object;
    propsWithCollapse = displayKeys;
  }

  const handleClick = (propKey) => {
    setOpenCollapse((prevOpenCollapse) => {
      return {
        ...prevOpenCollapse,
        [propKey]: !prevOpenCollapse[propKey],
      };
    });
  };

  return (
    <List className=" grid grid-rows-1 gap-2 ">
      {Object.entries(data).map(([key, value]) => {
        if (propsWithCollapse.includes(key)) {
          const isOpen = openCollapse[key] || false;

          return (
            <div key={key} className="rounded-sm">
              <ListItemButton
                className="dark:bg-gray-700 rounded-t-md hover:bg-gray-600  w-full border-b border-solid dark:border-gray-300 border-gray-700"
                onClick={() => handleClick(key)}
                sx={{ py: 1, backgroundColor: "gray.600" }}
              >
                <ListItemIcon className="dark:text-gray-100 ">
                  {isOpen ? <ExpandMore /> : <ChevronRight />}
                </ListItemIcon>
                <ListItemText className="dark:text-gray-100" primary={key} />
              </ListItemButton>
              <Collapse in={isOpen}>
                <div className="dark:bg-secondary-dark-bg bg-main-bg">{value}</div>
              </Collapse>
            </div>
          );
        }
      })}
    </List>
  );
};

export default CollapseSystem;
