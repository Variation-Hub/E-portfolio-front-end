import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react'
import TNAUnits from './tnaUnits';
import TNAQuestionaire from './tnaQuestionaire';
import ViewResults from './viewResults';

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
        <Box>
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

export const dataBase = [
  {
      group: 'Group 1',
      select: true,
      standardUnits: 'Duty 1 - Maintain a safe working environment, ensuring that any hazards are controlled or removed in line with organisational procedures. additional details',
      hours: 10,
      pointsCredits: 5,
      level: 'Intermediate'
  },
  {
      group: 'Group 2',
      select: true,
      standardUnits: 'Duty 2 - Ensure that on arrival, all goods received are inspected for damage, and in terms of accuracy, including quantity, they match documents or technology relevant to the organisation, with any discrepancies raised with line manager in line with organisational procedures. additional details',
      hours: 8,
      pointsCredits: 3,
      level: 'Beginner'
  },
  {
      group: 'Group 3',
      select: true,
      standardUnits: 'Duty 3 - Move and store goods safely, securely and efficiently to the designated location, utilising mechanical handling equipment, (MHE) and personal protective equipment (PPE) in line with organisational procedures when required. When using any MHE, ensure that safety checks are conducted before use to ensure that it is fit for purpose. additional details',
      hours: 12,
      pointsCredits: 7,
      level: 'Advanced'
  },
  {
      group: 'Group 4',
      select: true,
      standardUnits: 'Duty 4 - Support line manager in ensuring that goods storage arrangements enable the most efficient means of retrieval and movement. additional details',
      hours: 6,
      pointsCredits: 4,
      level: 'Intermediate'
  },
  {
      group: 'Group 5',
      select: true,
      standardUnits: 'Duty 5 - Ensure that prior to despatch all goods are inspected for damage, and in terms of accuracy they meet requirements, with any discrepancies raised with line manager. additional details',
      hours: 9,
      pointsCredits: 6,
      level: 'Beginner'
  },
  {
      group: 'Group 6',
      select: true,
      standardUnits: 'Duty 6 - Support delivery operatives in the safe and efficient loading and unloading of goods, including the safe and secure assembling and disassembling of loads. additional details',
      hours: 11,
      pointsCredits: 8,
      level: 'Advanced'
  },
  {
      group: 'Group 7',
      select: true,
      standardUnits: 'Duty 7 - Ensure that goods are handled and stored in compliance with the relevant safety and regulatory standards (for example, food, medicines, hazardous materials) with any discrepancies raised with line manager. additional details',
      hours: 7,
      pointsCredits: 2,
      level: 'Intermediate'
  },
  {
      group: 'Group 8',
      select: true,
      standardUnits: 'Duty 8 - Record relevant information on organisational warehouse management system in a timely manner. additional details',
      hours: 13,
      pointsCredits: 9,
      level: 'Beginner'
  },
  {
      group: 'Group 9',
      select: true,
      standardUnits: 'Duty 9 - Select goods from locations throughout the storage facility to meet warehouse order requirements in line with picking schedule. additional details',
      hours: 5,
      pointsCredits: 1,
      level: 'Advanced'
  },
  {
      group: 'Group 10',
      select: true,
      standardUnits: 'Duty 10 - Replenishing picking location quantities by moving goods from stock locations in a safe manner. additional details',
      hours: 14,
      pointsCredits: 10,
      level: 'Intermediate'
  },
  {
      group: 'Group 11',
      select: true,
      standardUnits: 'Duty 11 - Support in scheduled and unscheduled stock taking and counting activities, raising any discrepancies with line manager. additional details',
      hours: 14,
      pointsCredits: 10,
      level: 'Intermediate'
  },
  {
      group: 'Group 12',
      select: true,
      standardUnits: 'Duty 12 - Participate in briefing and handover sessions to support achievement of organisational performance targets. additional details',
      hours: 14,
      pointsCredits: 10,
      level: 'Intermediate'
  },
  {
      group: 'Group 13',
      select: true,
      standardUnits: 'Duty 13 - Ensure that the reduction, re-use, return and recycle principles of packaging are applied in relation to both goods being prepared for despatch and goods received in line with organisational procedures. additional details',
      hours: 14,
      pointsCredits: 10,
      level: 'Intermediate'
  }
]

const SkillsScan = () => {

  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid className="m-10" sx={{ minHeight: 600 }}>
        <Typography className='h1 pl-10'>Daniel Stefan Ciapa</Typography>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            className="border-1 m-12 rounded-md"
            sx={{
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            <Tab
              label="Step 1: Choose TNA units"
              {...a11yProps(0)}
              sx={{
                borderRight: "1px solid #e5e7eb",
                "&:last-child": { borderRight: "none" },
                "&:hover": {
                  backgroundColor: "#6D81A3",
                  color: "#ffffff",
                  borderRadius: "0px",
                },
                "&.Mui-selected": {
                  backgroundColor: "#6D81A3",
                  color: "#ffffff",
                  borderRadius: "0px",
                },
              }}
            />
            <Tab
              label="Step 2: TNA Questionaire"
              {...a11yProps(1)}
              sx={{
                borderRight: "1px solid #e5e7eb",
                "&:last-child": { borderRight: "none" },
                "&.Mui-selected": {
                  backgroundColor: "#6D81A3",
                  color: "#ffffff",
                  borderRadius: "0px",
                },
              }}
            />
            <Tab
              label="Step 3: View Results"
              {...a11yProps(1)}
              sx={{
                borderRight: "1px solid #e5e7eb",
                "&:last-child": { borderRight: "none" },
                "&.Mui-selected": {
                  backgroundColor: "#6D81A3",
                  color: "#ffffff",
                  borderRadius: "0px",
                },
              }}
            />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0} >
          <TNAUnits />
          {/* <h1>TNA units</h1> */}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          {<TNAQuestionaire />}
          {/* <h1>TNA Questionaire</h1> */}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          {<ViewResults />}
          {/* <h1>View Results</h1> */}
        </CustomTabPanel>
      </Grid >
    </>
  )
}

export default SkillsScan