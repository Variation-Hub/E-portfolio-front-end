import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";

const Cpd = () => {
  const [activeTab, setActiveTab] = useState<string>("planning");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="w-5/6 p-4 bg-white rounded-lg shadow-md h-fit flex">
        <div className="flex">
          <div
            className={`relative px-4 py-2 m-12 cursor-pointer text-black`}
            onClick={() => handleTabClick("Planning")}
          >
            Planning
            {activeTab === "planning" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#5B718F] text-white"></div>
            )}
          </div>
        </div>
        <div
          className={`relative px-4 py-2 m-12 cursor-pointer text-black `}
          onClick={() => handleTabClick("activity")}
        >
          Activity
          {activeTab === "activity" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#5B718F] text-white"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cpd;
