import { Box, Card, Checkbox, Grid, IconButton, ListItemText, MenuItem, Paper, Select, TextField, Tooltip, Typography } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { AdminRedirect, EmployerRedirect, fundingBodyData, roles } from 'src/app/contanst';
import { LoadingButton, SecondaryButton, SecondaryButtonOutlined } from 'src/app/component/Buttons';
import { timezones } from 'src/app/contanst/timezoneData';
import { emailValidationMsg, mobileValidationMsg, nameValidationMsg, passwordValidation, usernameValidationMsg } from 'src/app/contanst/regValidation';
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { DatePicker } from '@mui/x-date-pickers';
import { FileUploader } from 'react-drag-drop-files';
import { useEffect, useState } from 'react';
import Breadcrumb from 'src/app/component/Breadcrumbs';
import { useDispatch } from 'react-redux';
import { createSessionAPI, getLearnerAPI, getTrainerAPI, selectSession } from 'app/store/session';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const NewSession = (props) => {

    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const session = useSelector(selectSession);

    useEffect(() => {
        dispatch(getTrainerAPI("Trainer"));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getLearnerAPI());
    }, [dispatch]);

    const [sessionData, setSessionData] = useState({
        trainer_id: '',
        learners: [],
        title: '',
        description: '',
        method: 'Traditional',
        location: '',
        startDate: '',
        Duration: '0:0',
        type: '',
    });

    const handleDataUpdate = (e) => {
        const { name, value } = e.target;
        setSessionData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const { handleClose, dataUpdatingLoadding } = props;


    const handleSubmit = async () => {
        try {

            let response;
            response = await dispatch(createSessionAPI({ ...sessionData }));

            if (response) {
                navigate("/portfolio");
            }
        } catch (error) {
            console.error("Error during submission:", error);
        }
    };

    return (
        <Grid>
            <Grid className='my-20 mx-20'>

                <Card className='rounded-6 items-center ' variant="outlined">
                    <Grid className='h-full flex flex-col'>
                        <Box>
                            <Grid xs={12} className='p-10 border-b-2 bg-gray-100'>
                                <Typography className='font-600 '>Book a new Session</Typography>
                            </Grid>
                            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-col">
                                <Grid className='w-full'>
                                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Select Trainer</Typography>
                                    <Select
                                        name="trainer_id"
                                        // label="Username"
                                        value={sessionData.trainer_id}
                                        size="small"
                                        placeholder='Select trainer'
                                        required
                                        fullWidth
                                        onChange={handleDataUpdate}
                                    >
                                        {session.trainer.map(data => (
                                            <MenuItem key={data.id} value={data.user_id}>
                                                {data.user_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>

                                <Grid className='w-full'>
                                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Select Learner</Typography>
                                    <Select
                                        name="learners"
                                        value={sessionData.learners}
                                        size="small"
                                        placeholder="Select learner"
                                        required
                                        fullWidth
                                        multiple
                                        onChange={handleDataUpdate}
                                        renderValue={(selected) =>
                                            selected.map((id) => {
                                                const learner = session.learner.find((learner) => learner.learner_id === id);
                                                return learner ? learner.user_name : '';
                                            }).join(', ')
                                        }
                                    >
                                        {session.learner.map((data) => (
                                            <MenuItem key={data.learner_id} value={data.learner_id}>
                                                <Checkbox checked={sessionData.learners.includes(data.learner_id)} />
                                                <ListItemText primary={data.user_name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>

                                <Grid className='w-full'>
                                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Title</Typography>
                                    <TextField
                                        name="title"
                                        value={sessionData.title}
                                        size="small"
                                        required
                                        fullWidth
                                        onChange={handleDataUpdate}
                                        className='bg-none '
                                    />
                                </Grid>

                                <Grid className="w-full">
                                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>
                                        Description
                                    </Typography>
                                    <TextField
                                        name="description"
                                        size="small"
                                        placeholder="Lorem ipsum is just dummy context....."
                                        fullWidth
                                        multiline
                                        rows={7}
                                        value={sessionData?.description}
                                        onChange={handleDataUpdate}
                                    // disabled={edit === "view"}
                                    />
                                </Grid>

                                <Grid className='w-full'>
                                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Session Method</Typography>
                                    <TextField
                                        name="session_method"
                                        value={sessionData.method}
                                        size="small"
                                        required
                                        fullWidth
                                        onChange={handleDataUpdate}
                                        className='bg-none '
                                        disabled
                                    />
                                </Grid>

                                <Grid className='w-full'>
                                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Enter Session Location</Typography>
                                    <TextField
                                        name="location"
                                        value={sessionData.location}
                                        size="small"
                                        placeholder='Enter location'
                                        required
                                        fullWidth
                                        onChange={handleDataUpdate}
                                    />
                                </Grid>

                                <Grid className='w-full'>
                                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Select Session Date and Time</Typography>
                                    <TextField
                                        name="startDate"
                                        value={sessionData.startDate}
                                        size="small"
                                        type='datetime-local'
                                        placeholder='DD / MM / YYYY  HH:MM'
                                        required
                                        fullWidth
                                        onChange={handleDataUpdate}
                                    />
                                </Grid>

                                <Grid className='w-full'>
                                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Select Session Duration</Typography>
                                    <Grid className='w-full flex gap-10'>
                                        {/* <TextField
                                            name="hours"
                                            value={sessionData.Duration}
                                            size="small"
                                            placeholder='Hours'
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                        />
                                        <TextField
                                            name="minutes"
                                            value={sessionData.Duration}
                                            size="small"
                                            placeholder='Minutes'
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            /> */}
                                        <TextField
                                            placeholder='Hours'
                                            name="hours"
                                            size="small"
                                            required
                                            type="number"
                                            fullWidth
                                            value={(sessionData.Duration.split(":")[0])}
                                            onChange={(e) => {
                                                const value = Number(e.target.value);

                                                if (value < 0 || value > 23) {
                                                    return
                                                }
                                                setSessionData((prevState: any) => ({
                                                    ...prevState,
                                                    Duration: `${value}:${sessionData.Duration.split(':')[1]}`
                                                }));
                                            }}
                                        />
                                        <TextField
                                            placeholder='Minutes'
                                            name="minutes"
                                            required
                                            size="small"
                                            type="number"
                                            fullWidth
                                            value={(sessionData.Duration.split(':')[1])}
                                            onChange={(e) => {
                                                const value = Number(e.target.value);

                                                if (value < 0 || value > 59) {
                                                    return
                                                }
                                                setSessionData((prevState: any) => ({
                                                    ...prevState,
                                                    Duration: `${sessionData.Duration.split(':')[0]}:${value}`
                                                }));
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid className='w-full'>
                                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Select Trainer</Typography>
                                    <Select
                                        name="type"
                                        // label="Username"
                                        value={sessionData.type}
                                        size="small"
                                        placeholder='Select Type'
                                        required
                                        fullWidth
                                        onChange={handleDataUpdate}
                                    >
                                        <MenuItem value={"General"}>General</MenuItem>
                                        <MenuItem value={"Induction"}>Induction</MenuItem>
                                        <MenuItem value={"Formal Review"}>Formal Review</MenuItem>
                                        <MenuItem value={"Telephone"}>Telephone</MenuItem>
                                        <MenuItem value={"Exit Session"}>Exit Session</MenuItem>
                                        <MenuItem value={"Out Of the Workplace"}>Out Of the Workplace</MenuItem>
                                        <MenuItem value={"Tests/Exams"}>Tests/Exams</MenuItem>
                                        <MenuItem value={"Learner Support"}>Learner Support</MenuItem>
                                        <MenuItem value={"Initial Session"}>Initial Session</MenuItem>
                                        <MenuItem value={"Gateway Ready"}>Gateway Ready</MenuItem>
                                        <MenuItem value={"EPA"}>EPA</MenuItem>
                                        <MenuItem value={"Furloughed"}>Furloughed</MenuItem>
                                    </Select>
                                </Grid>

                            </Box>

                        </Box>

                        <Box style={{ margin: "auto 1rem 1rem auto" }}>
                            {dataUpdatingLoadding ?
                                <LoadingButton />
                                :
                                <>
                                    <SecondaryButtonOutlined name="Cancel" onClick={handleClose} style={{ width: "10rem", marginRight: "2rem" }} />
                                    <SecondaryButton name="Save" style={{ width: "10rem" }} onClick={handleSubmit} />
                                </>
                            }
                        </Box>
                    </Grid>
                </Card >
            </Grid >
        </Grid>
    )
}

export default NewSession