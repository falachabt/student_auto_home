import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";

const Details = ({
  color = "green",
  maintext = "progress",
  secondarytext = "10",
  value = "50",
}) => {
  return (
    <div className="flex items-start w-full gap-4 max-w-sm px-4 py-2 ">
      <div className="w-[10% flex items-center justify-evenly mx-2 ">
        <span className=" bg-[#b0b8c0] text-xl p-[3px] w-[45px] h-[45px] rounded-[12px] ">
          <DescriptionIcon
            sx={{ fontSize: "35px", color: color ? color : "#00AB55" }}
          />
        </span>
      </div>
      <div className="w-[60%] flex flex-col text-left pl-4">
        <span className="text-xl font-semibold  ">{maintext}</span>
        <span className="text-14 text-gray-600  ">{secondarytext}</span>
      </div>
      <div className="w-[10% text-xl font-bold">
        <span>{value}%</span>
      </div>
    </div>
  );
};

export default Details;
