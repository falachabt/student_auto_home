import React from "react";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Lesson from "./Lesson";
import { useParams } from "react-router-dom";
import { UseStateContext } from "../../../../Contexts/ContextProvider";

const Module = ({ module, openModuleIds, handleModuleClick }) => {
	const { moduleid } = useParams();
  const { themeMode } = UseStateContext();

	return (
		<div className="text-white">  
			<div>
				<ListItemButton
					onClick={() => handleModuleClick(module.id)}
					className={`
        "flex items-center justify-between",
          hover:bg-blue-500 "
        
      `}
					sx={{
						backgroundColor:
							moduleid === module.id ? "green" : "gray",
						":hover": {
							backgroundColor:
								moduleid !== module.id
									? "#374151"
									: "green",
						},
					}}
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
								<Lesson
									module={module}
									lesson={lesson}
									key={index}
								/>
							))}
						</List>
					)}
				</Collapse>
			</div>
		</div>
	);
};

export default Module;
