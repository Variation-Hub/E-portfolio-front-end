import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import Planning from "./planning";
import Activity from "./activity";
import Evaluation from "./evaluation";
import Reflection from "./reflection";
import { margin } from "@mui/system";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Cpd = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="shadow-lg m-20 rounded-lg h-full">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Planning" {...a11yProps(0)} />
            <Tab label="Activity" {...a11yProps(1)} />
            <Tab label="Evaluation" {...a11yProps(2)} />
            <Tab label="Reflection" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Planning />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Activity />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Evaluation />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Reflection />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default Cpd;
