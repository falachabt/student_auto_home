import React from "react";

const Skills = () => {
  return (
    <div className="box-shadow dark:bg-main-dark-bg m-2 rounded-md p-3 dark:text-gray-100 min-w-[250px]">
      <div className=" text-start text-xl font-bold mb-2">
        <h1>Skills</h1>
      </div>

      <div className=" divide-x-4 flex gap-2 w-full justify-center">
        {/* badges earned  */}
        <div>
          <div className="flex gap-4 items-center text-[18px]">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/autohome-2.appspot.com/o/students%2Fdesign%2Ftrophe_completion.svg?alt=media&token=aa6a0b3b-59df-4a3b-a76d-8ba0de99943e"
              className="w-[40px]"
              alt="badge_logo"
            />
            <h1 className="text-xl font-semibold">13%</h1>
          </div>
          <h3 className="text-[18px]">rewards</h3>
        </div>

        {/* completion of the training */}
        <div className="pl-4">
          <div className="flex gap-4 items-center text-[18px]">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/autohome-2.appspot.com/o/students%2Fdesign%2Fprogram_completion.svg?alt=media&token=d13dcc3a-9b36-47d1-91e8-f23d1781b157"
              className="w-[40px]"
              alt="training_logo"
            />
            <h1 className="text-2xl font-semibold">20%</h1>
          </div>
          <h3 className="text-[18px]">aptitude</h3>
        </div>
      </div>
    </div>
  );
};

export default Skills;
