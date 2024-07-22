import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, Card, Box, Typography, Select, MenuItem } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns';
import { SecondaryButton, SecondaryButtonOutlined } from 'src/app/component/Buttons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchCourseAPI, selectCourseManagement } from 'app/store/courseManagement';

const NewTimeLog = () => {

    const dispatch: any = useDispatch();
    const { data } = useSelector(selectCourseManagement);

    useEffect(() => {
        dispatch(fetchCourseAPI());
    }, []);

    const [courseId, setCourseId] = useState('');

    const handleCourseChange = (event) => {
        const courseId = event.target.value;
        setCourseId(courseId);
    };


    const [timeLogData, setTimeLogData] = useState({
        course_id: '',
        activity_date: '',
        activity_type: '',
        unit: '',
        type: '',
        spend_time: '0:0',
        start_time: '0:0',
        end_time: '0:0',
        impact_on_learner: '',
        evidence_link: '',
    });

    const handleDataUpdate = (e) => {
        const { name, value } = e.target;
        setTimeLogData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // const { handleClose, dataUpdatingLoadding } = props;


    const handleSubmit = async () => {
        console.log(timeLogData)
    };

    return (
        <Grid>
            <Card className='rounded-6 items-center ' variant="outlined">
                <Grid className='h-full flex flex-col'>
                    <Box>
                        <Grid xs={12} className='p-10 border-b-2 bg-gray-100'>
                            <Typography className='font-600 h2'>Add Activity</Typography>
                        </Grid>
                        <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-col p-10">
                            <Grid className='w-full'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>1. Select Activity Date</Typography>
                                <TextField
                                    name="startDate"
                                    value={timeLogData?.activity_date}
                                    size="small"
                                    type='date'
                                    placeholder='DD / MM / YYYY'
                                    required
                                    fullWidth
                                    onChange={handleDataUpdate}
                                />
                            </Grid>

                            <Grid className='w-full'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>2. Select Activity Type</Typography>
                                <Select
                                    name="activity_type"
                                    value={timeLogData?.activity_type}
                                    size="small"
                                    placeholder='Select Activity Type'
                                    required
                                    fullWidth
                                    onChange={handleDataUpdate}
                                >
                                    <MenuItem value={"Virtual Training Session"}>Virtual Training Session</MenuItem>
                                    <MenuItem value={"Traditional face-to-face session"}>Traditional face-to-face session</MenuItem>
                                    <MenuItem value={"Trainer or assessor led training"}>Trainer or assessor led training</MenuItem>
                                    <MenuItem value={"Electronic or distance learning, or self-study"}>Electronic or distance learning, or self-study</MenuItem>
                                    <MenuItem value={"Coaching or mentoring"}>Coaching or mentoring</MenuItem>
                                    <MenuItem value={"Guided learning with no trainer/assessor present"}>Guided learning with no trainer/assessor present</MenuItem>
                                    <MenuItem value={"Gaining technical experience by doing my job"}>Gaining technical experience by doing my job</MenuItem>
                                    <MenuItem value={"Review/feedback/support"}>Review/feedback/support</MenuItem>
                                    <MenuItem value={"Assessment or examination"}>Assessment or examination</MenuItem>
                                    <MenuItem value={"Other"}>Other</MenuItem>
                                    <MenuItem value={"Furloughed"}>Furloughed</MenuItem>
                                </Select>
                            </Grid>
                            <Grid className='w-full'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>3. Select Course</Typography>
                                <Select
                                    name="course_id"
                                    value={timeLogData?.course_id}
                                    size="small"
                                    placeholder='Select Course'
                                    required
                                    fullWidth
                                    onChange={handleCourseChange}
                                >
                                    {data?.map(data => (
                                        <MenuItem key={data.id} value={data.course_id}>
                                            {data.course_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>

                            <Grid className='w-full'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>4. Select Unit</Typography>
                                <Select
                                    name="unit"
                                    value={timeLogData?.unit}
                                    size="small"
                                    placeholder='Select Unit'
                                    required
                                    fullWidth
                                    onChange={handleDataUpdate}
                                >
                                    <MenuItem value={"General"}>General</MenuItem>
                                </Select>
                            </Grid>

                            <Grid className='w-full'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>5. Select Assessor</Typography>
                                <Select
                                    name="type"
                                    // value={timeLogData?.type}
                                    size="small"
                                    placeholder='Select Assessor'
                                    required
                                    fullWidth
                                // onChange={handleDataUpdate}
                                >
                                    <MenuItem value={"---"}>---</MenuItem>
                                </Select>
                            </Grid>

                            <Grid className='w-full'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>5. Was it on the Job?</Typography>
                                <Select
                                    name="type"
                                    value={timeLogData?.type}
                                    size="small"
                                    placeholder='Was it on the Job?'
                                    required
                                    fullWidth
                                    onChange={handleDataUpdate}
                                >
                                    <MenuItem value={"Not Applicable"}>Not Applicable</MenuItem>
                                    <MenuItem value={"On the job"}>On the job</MenuItem>
                                    <MenuItem value={"Off the job"}>Off the job</MenuItem>
                                </Select>
                            </Grid>

                            <Grid className='w-full'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>7. Time Spent on Activity</Typography>
                                <TextField
                                    name="spend_time"
                                    value={timeLogData?.spend_time}
                                    size="small"
                                    type='time'
                                    placeholder='HH:MM'
                                    required
                                    fullWidth
                                    onChange={handleDataUpdate}
                                />
                            </Grid>

                            <Grid className='w-full'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>8. Activity Start Time</Typography>
                                <TextField
                                    name="start_time"
                                    value={timeLogData?.start_time}
                                    size="small"
                                    type='time'
                                    placeholder='HH:MM'
                                    required
                                    fullWidth
                                    onChange={handleDataUpdate}
                                />
                            </Grid>

                            <Grid className='w-full'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>9. Activity End Time</Typography>
                                <TextField
                                    name="end_time"
                                    value={timeLogData?.end_time}
                                    size="small"
                                    type='time'
                                    placeholder='HH:MM'
                                    required
                                    fullWidth
                                    onChange={handleDataUpdate}
                                />
                            </Grid>

                            <Grid className="w-full">
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>
                                    10. What impact has this activity had on your learning?
                                </Typography>
                                <TextField
                                    name="impact_on_learner"
                                    size="small"
                                    placeholder="Please type in any impact notes."
                                    fullWidth
                                    multiline
                                    rows={7}
                                    value={timeLogData?.impact_on_learner}
                                    onChange={handleDataUpdate}
                                />
                            </Grid>

                            <Grid className='w-full'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>11. Evidence Links:</Typography>
                                <TextField
                                    name="evidence_link"
                                    value={timeLogData.evidence_link}
                                    size="small"
                                    placeholder='Enter evidence link'
                                    required
                                    fullWidth
                                    onChange={handleDataUpdate}
                                />
                            </Grid>
                        </Box>

                    </Box>

                    <Box style={{ margin: "auto 1rem 1rem auto" }}>
                        <>
                            {/* <SecondaryButtonOutlined name="Cancel" onClick={handleClose} style={{ width: "10rem", marginRight: "2rem" }} /> */}
                            <SecondaryButton name="Add Activity" style={{ width: "10rem" }} onClick={handleSubmit} />
                        </>
                    </Box>
                </Grid>
            </Card >
        </Grid>
    )
};

export default NewTimeLog;
