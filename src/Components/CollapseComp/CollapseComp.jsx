import { ExpandLess, ExpandMore, Lock } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

const CollapseComp = (props) => {
	const [isOpen, setIsOpen] = useState(true);

	useEffect(() => {
		if( typeof props.openable !== "undefined")
			setIsOpen(props.openable);
	}, [])

	function open_or_close(e) {
		e.preventDefault();
		if(props.openable === true || props.openable === undefined || props.openable === null)
			setIsOpen(!isOpen);
	}

	return (
		<div className="my-3">
			<header className={` ${props.orientation === "horizontal"? " -rotate-90 " : ""}`}>
				<button
					className="w-full flex justify-between px-4 py-2 mb-2   bg-gray-500 text-gray-200 rounded-md"
					onClick={open_or_close}
				>
					<div className="gap-2 flex items-center ">
						{props.icon && props.icon}
						{props.title && props.title}
						{props.openable === false  && <Lock />}
					</div>
					<div>{isOpen ? <ExpandLess /> : <ExpandMore />}</div>
				</button>
			</header>
			<Collapse in={isOpen} orientation={props.orientation? props.orientation : "vertical"}>
            
				<main className=" border rounded-md p-2">{props.children}</main>
			</Collapse>
		</div>
	);
};

export default CollapseComp;
