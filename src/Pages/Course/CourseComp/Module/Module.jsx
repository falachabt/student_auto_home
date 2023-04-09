import React, {useEffect, useState} from "react";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Lesson from "./Lesson";
import { useParams } from "react-router-dom";
import { UseStateContext } from "../../../../Contexts/ContextProvider";
import { CircularProgressbar } from "react-circular-progressbar";
import { fetchData } from "../../../../Firebase/functions/firestoreFunc";
import { getAuth } from "firebase/auth";
import { domFunction } from "../../../../Data/function";
import { isLesonUnlock } from "../../utls";

const Module = ({ module, openModuleIds, handleModuleClick, reload }) => {
	const { moduleid } = useParams();
	const { themeMode } = UseStateContext();
	const [lessons, setLessons] = useState([]);
	const [state, setState] = useState({
		fetch: false,
		fetch_err: false,
		has_already_fetch: false,
	});

	useEffect(() => {
		const user = getAuth().currentUser;

		!state.has_already_fetch && setState({...state, fetch: true})


		const b = 	fetchData({
			path: `students/${user.uid}/modules/${module.id}/lessons`
		})
		
		b.then((less) => {
			setLessons(less)
			! state.has_already_fetch && setState({...state, fetch: false, has_already_fetch: true})
		})
	
	}, [reload])


	

	return (
		<div className="text-white">  
			<div>
				<ListItemButton
					onClick={() => handleModuleClick(module.id)}
					className={` flex items-center justify-between hover:bg-blue-500 `}
					sx={{ backgroundColor: moduleid === module.id ? "#1A75FF" : "gray",
						  	":hover": { backgroundColor: moduleid !== module.id ? "#1A75FF" : "#2681D4", },
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
							{ !state.fetch && lessons?.map((lesson, index) => (
								<Lesson
									module={module}
									lesson={lesson}
									key={index}
									reload = {reload}
									isUnlock = {isLesonUnlock(lesson, lessons)}
								/>
							))}

							{ state.fetch && 
								domFunction.insertLoading({
									number: 3,
									height: '40px',
									width: '100%',
									useSx: true,
									containerClassName: 'flex flex-col gap-3 px-2 pt-1'
								})

							}
						</List>
					)}
				</Collapse>
			</div>
		</div>
	);
};

export default Module;
