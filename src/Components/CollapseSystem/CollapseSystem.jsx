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
        ...prevOpenCollapse, [propKey] : !prevOpenCollapse[propKey] 
      };
    });
  };

  return (
    <List>
      {Object.entries(data).map(([key, value]) => {
        if (propsWithCollapse.includes(key)) {
          const isOpen = openCollapse[key] || false;

          return (
            <React.Fragment key={key}>
              <ListItemButton onClick={() => handleClick(key)} sx={{ py: 1 }}>
                <ListItemIcon className="dark:text-gray-100">
                  {isOpen ? <ExpandMore /> : <ChevronRight />}
                </ListItemIcon>
                <ListItemText className="dark:text-gray-100" primary={key} />
              </ListItemButton>
              <Collapse in={isOpen}>
                <Typography className="dark:text-white" sx={{ pl: 2 }}>
                  {value}
                </Typography>
              </Collapse>

              <hr />
            </React.Fragment>
          );
        }
      })}
    </List>
  );
};

export default CollapseSystem;
