import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LearnerDetails from './learnerDeatils';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const CustomTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none', // Disable uppercase
    border: '1px solid #ccc', // Default border for all tabs
    borderRadius: '4px', // Rounded corners for each tab
    color: '#5F452A', // Color for inactive tabs
    '&.Mui-selected': {
        backgroundColor: 'var(--primaryColor)', // Background for active tab
        color: '#ffffff', // Text color for active tab
    },
    '&:hover': {
        borderColor: 'var(--primaryColor)', // Hover state border color
    },
}));


const CustomTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        display: 'none', // Hide default indicator
    },
});

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function NewPortfolio() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='p-10'>
            <div className='flex justify-between items-center'>
                <h1>Welcome, Dhruv Suhagiya</h1>
                <Button>Learner Dashboard</Button>
            </div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <CustomTabs value={value} onChange={handleChange} aria-label="customized tabs example">
                        {/* Tabs with border */}
                        <CustomTab label="Profile" {...a11yProps(0)} />
                        <CustomTab label="Course" {...a11yProps(1)} />
                        {/* <CustomTab label="Action" {...a11yProps(2)} />
                        <CustomTab label="Test and Exams" {...a11yProps(3)} />
                        <CustomTab label="Contact Diary" {...a11yProps(4)} />
                        <CustomTab label="ALS" {...a11yProps(5)} /> */}
                        <CustomTab label="Contracted Work Hours" {...a11yProps(6)} />
                    </CustomTabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <LearnerDetails />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    Course
                </CustomTabPanel>
                {/*<CustomTabPanel value={value} index={2}>
                    Action
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    Test and Exams
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    Contact Diary
                </CustomTabPanel>
                <CustomTabPanel value={value} index={5}>
                    ALS
                </CustomTabPanel> */}
                <CustomTabPanel value={value} index={6}>
                    Contracted Work Hours
                </CustomTabPanel>
            </Box>
        </div>

    );
}