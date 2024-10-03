import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Avatar, Typography, Card, CardContent, Container, LinearProgress, Box, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getLearnerDetailsReturn } from 'app/store/learnerManagement';

function LinearProgressWithLabel(props) {
    const { color, value } = props;
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Stack sx={{ width: '100%', mr: 1, color: color, backgroundColor: 'lightgray', borderRadius: "10px" }}>
                <LinearProgress variant="determinate" value={value} sx={{ height: '10px', backgroundColor: '#e5e7eb', borderRadius: "10px", '& .MuiLinearProgress-bar': { backgroundColor: color, borderRadius: "5px" } }} />
            </Stack>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

function LearnerPortfolio() {
    const [value, setValue] = useState(0);
    const [course, setCourse] = useState([]);
    const [singleCourse, setSingleCourse] = useState(null);
    const [learnerDetails, setLearnerDetails] = useState(undefined)

    const dispatch: any = useDispatch();
    useEffect(() => {
        // Fetch learner details from API
        async function fetchLearner() {
            const user = JSON.parse(sessionStorage.getItem('learnerToken'))?.user;
            if (user) {
                setLearnerDetails(user)
                const data = await dispatch(getLearnerDetailsReturn(user?.learner_id))
                if (data) {
                    setCourse(data?.course)
                }
            }
        }
        fetchLearner();
    }, [])

    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
        setSingleCourse(course.find((item) => item.course?.course_id === newValue));

    };

    console.log("123", course, learnerDetails)

    const HeaderTabs = () => (
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
            <Tab label="Overview" value={-1} />
            {
                course.map((item, index) => (
                    <Tab key={index} label={item.course?.course_name} value={item?.course?.course_id} />
                ))
            }
        </Tabs>
    );

    const WelcomeSection = ({ children }) => (
        <div className='flex w-full border-2'>
            <div className="flex flex-col gap-5 p-4 bg-white rounded-md shadow-md w-2/5 border-2">
                <Typography variant="h5" className='capitalize mb-24'>Welcome<br /> {learnerDetails?.displayName}</Typography>
                <img src={learnerDetails?.avatar?.url} alt="" style={{ width: 120, height: 120 }} />
                <div className="mt-24">
                    <Typography variant="body2">Last Login Date: 23/09/2024 11:18</Typography>
                    <Typography variant="body2">Days Until Course Completion: 645</Typography>
                </div>

                <div className="">
                    <p>Overall Status</p>
                    <LinearProgressWithLabel value={28} color="darkred" />
                    <LinearProgressWithLabel value={85} color="coral" />
                    <LinearProgressWithLabel value={42} color="green" />
                </div>
            </div>
            <div className='w-3/5 border-2'>
                {children}
            </div>
        </div>
    );

    return (
        <Container maxWidth="lg">
            <HeaderTabs />
            <div className="mt-4">
                <WelcomeSection>
                    <h1>sfsdfs</h1>
                </WelcomeSection>
            </div>
        </Container>
    );
}

export default LearnerPortfolio;
