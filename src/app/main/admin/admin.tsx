import { Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { AdminPageData } from "src/app/contanst";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
const Admin = () => {
  return (
    <div className="w-full h-full flex flex-wrap">
      {AdminPageData.map((item) => {
        return (
          <div className="p-10">
            <Link to={item.path} key={item.path}>
              {item.name}
            </Link>
            <Tooltip title={item.info} placement="bottom" arrow>
              <HelpOutlinedIcon sx={{ fontSize: "16px", color:"gray", marginLeft: "2px", cursor:"help"}} />
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
