import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Avatar, Typography, Card, CardContent, Container, LinearProgress, Box, Stack, Grid, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getLearnerDetailsReturn, selectLearnerManagement } from 'app/store/learnerManagement';
import { FaFolderOpen } from 'react-icons/fa';
import { getLightRandomColor } from 'src/utils/randomColor';
import UploadWorkDialog from 'src/app/component/Cards/uploadWorkDialog';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { slice as courseSlice } from "app/store/courseManagement";
import { useNavigate } from 'react-router-dom';
import Calendar from './calendar';
import { SecondaryButton, SecondaryButtonOutlined } from 'src/app/component/Buttons';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import { sendMail } from 'app/store/userManagement';
import NewSession from './newsession';
import { UserRole } from 'src/enum';
import { selectGlobalUser } from 'app/store/globalUser';

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

    const user = JSON.parse(sessionStorage.getItem('learnerToken'))?.user || useSelector(selectUser)?.data;
    const { currentUser } = useSelector(selectGlobalUser);
    const { learner } = useSelector(
        selectLearnerManagement
    );

    const navigate = useNavigate();
    const [openSession, setOpenSession] = useState(false);
    const [openCalender, setOpenCalender] = useState(false);
    const [value, setValue] = useState<number>(0);
    const [course, setCourse] = useState([]);
    const [singleCourse, setSingleCourse] = useState(null);
    const [learnerDetails, setLearnerDetails] = useState(undefined)
    const [fullLearnerDetails, setFullLearnerDetails] = useState(undefined)
    const [overView, setOverView] = useState({
        fullyCompleted: 0,
        notStarted: 0,
        partiallyCompleted: 0,
        totalSubUnits: 0
    })

    const handleClickSingleData = (row) => {
        dispatch(courseSlice.setSingleData(row));
    };

    const handleOTJHours = () => {
        navigate("/timeLog");
    };
    const handleOpenResource = () => {
        navigate("/portfolio/resourceData");
    };

    const handleOpenProgressWidget = () => {
        navigate("/portfolio/progressWidget");
    };

    const handleOpenProgressMap = () => {
        navigate("/portfolio/courseProgressMap");
    };

    const handleOpenUploadWork = () => {
        navigate("/portfolio/assignmentData");
        // setOpen(true);
    };

    const handleOpenCalender = () => {
        setOpenCalender(true);
    };

    const handleOpenSession = () => {
        setOpenSession(true);
    };

    const handleActivities = () => {
        navigate('/cpd');
    };

    const handleClose = () => {
        setOpenCalender(false);
        setOpenSession(false);
    };


    const [emailData, setEmailData] = useState({
        email: learner.email,
        subject: '',
        message: '',
        adminName: user?.displayName
    });

    const handleChangeEmail = (e) => {
        const { name, value } = e.target;
        setEmailData((prevEmail) => ({ ...prevEmail, [name]: value }));
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenEmail = () => {
        setIsDialogOpen(true);
    };

    const handleCloseEmail = () => {
        setIsDialogOpen(false);
        setEmailData({
            email: learner.email,
            subject: '',
            message: '',
            adminName: user?.displayName
        })
    };

    const handleSend = async () => {
        try {
            let response;
            response = await dispatch(sendMail(emailData));
        } catch (err) {
            console.log(err);
        } finally {
            handleCloseEmail();
        }
    };

    const handleClosePortfolio = () => {
        window.close();
    };

    const dispatch: any = useDispatch();
    useEffect(() => {
        async function fetchLearner() {
            const user = JSON.parse(sessionStorage.getItem('learnerToken'))?.user;
            if (user) {
                setLearnerDetails(user)
                const data = await dispatch(getLearnerDetailsReturn(user?.learner_id))
                if (data) {
                    setFullLearnerDetails(data)
                    setCourse(data?.course)
                    setOverView(data.course?.reduce((acc, curr) => {
                        return {
                            fullyCompleted: acc.fullyCompleted + curr.fullyCompleted,
                            notStarted: acc.notStarted + curr.notStarted,
                            partiallyCompleted: acc.partiallyCompleted + curr.partiallyCompleted,
                            totalSubUnits: acc.totalSubUnits + curr.totalSubUnits
                        }
                    }, overView))
                }
            }
        }
        fetchLearner();
    }, [])

    const handleChange = (newValue) => {
        console.log(newValue);
        setValue(newValue);
        setSingleCourse(course.find((item) => item.course?.course_id === newValue));
    };

    const HeaderTabs = () => (
        <div className="flex justify-between items-center">
            <div className='flex gap-4'>
                <button
                    className={`text-white relative top-16 p-14 rounded-t-lg ${value === 0 ? 'transform translate-y-[-6px] ' : ''}`}
                    style={{ backgroundColor: getLightRandomColor("Overview"?.toLowerCase().charAt(0)) }}
                    onClick={() => handleChange(0)}
                >
                    Overview
                </button>
                {course?.map((item) => (
                    <button
                        className={`text-white relative top-16 p-16 rounded-t-lg ${value === item?.course?.course_id ? 'transform translate-y-[-6px] ' : ''}`}
                        style={{ backgroundColor: getLightRandomColor(item?.course?.course_name?.toLowerCase().charAt(0)) }}
                        key={item?.course?.course_id}
                        onClick={(e) => {
                            handleClickSingleData(item)
                            handleChange(item?.course?.course_id)
                        }}
                    >
                        {item?.course?.course_name}
                    </button>
                ))}
            </div>
            <div>
                {currentUser?.role !== UserRole.Learner && <SecondaryButtonOutlined name="Close Portfolio" onClick={handleClosePortfolio} />}
            </div>
        </div>

    );

    const WelcomeSection = ({ children }) => (
        <div className='flex w-full border-2'>
            <div className="flex flex-col gap-5 p-12 bg-white rounded-md shadow-md w-2/5 border-2">
                <Typography variant="h5" className='capitalize mb-24'>Welcome<br /> {learnerDetails?.displayName}</Typography>
                <div className='flex justify-between' style={{ height: 120 }}>
                    <img src={learnerDetails?.avatar?.url} alt="" className='w-full h-full' style={{ width: 120 }} />
                    <Card className='cursor-pointer rounded-4 bg-[#D32B4F]' onClick={handleOpenSession}>
                        <div className='flex flex-col justify-around items-center h-full p-8' style={{ width: 120 }}>
                            <img src='./assets/icons/Smart-Session.png' className='w-80 p-10' />
                            <strong className="text-white text-base">
                                Session
                            </strong>
                        </div>
                    </Card>
                </div>
                <div className="">
                    <Typography variant="body2">Last Login Date: 23/09/2024 11:18</Typography>
                    <Typography variant="body2">Days Until Course Completion: 645</Typography>
                </div>

                <div className="">
                    <p>Overall Status</p>
                    <LinearProgressWithLabel value={(overView?.notStarted / overView?.totalSubUnits) * 100} color="darkred" />
                    <LinearProgressWithLabel value={(overView?.partiallyCompleted / overView?.totalSubUnits) * 100} color="coral" />
                    <LinearProgressWithLabel value={(overView?.fullyCompleted / overView?.totalSubUnits) * 100} color="green" />
                </div>
            </div>
            <div className='w-3/5 border-2'>
                {children}
            </div>
        </div>
    );


    const CourseSection = ({ children }) => (
        <div className='flex w-full border-2'>
            <div className="flex flex-col gap-5 p-12 bg-white rounded-md shadow-md w-2/5 border-2">
                <Typography variant="h5" className='capitalize mb-24'>Welcome<br /> {learnerDetails?.displayName}</Typography>
                <div style={{ height: 120 }}>
                    <img src={learnerDetails?.avatar?.url} alt="" className='w-full h-full' style={{ width: 120 }} />
                </div>
                <div className="mt-24">
                    <Typography variant="body2"><strong>{singleCourse?.course?.course_name}</strong></Typography>
                    <div className='flex gap-8 items-center'>
                        <Typography variant="body2"><strong>Trainer: {singleCourse?.trainer_id?.first_name + " " + singleCourse?.trainer_id?.last_name} </strong></Typography>
                        <SecondaryButton
                            className="min-w-0"
                            onClick={handleOpenEmail}
                            startIcon={<EmailOutlinedIcon className="text-xl ml-10" />}
                        />
                    </div>
                    <Typography variant="body2"><strong>IQA: </strong>{singleCourse?.IQA_id?.first_name + " " + singleCourse?.trainer_id?.last_name}</Typography>
                    <Typography variant="body2"><strong>Course  </strong>In Training</Typography>
                    <Typography variant="body2"><strong>Status: </strong> </Typography>
                </div>
            </div>
            <div className='w-3/5 border-2'>
                {children}
            </div>
        </div>
    );


    return (
        <Container className='max-w-full p-40'>
            <HeaderTabs />
            <div className="mt-4 relative z-10">
                {value === 0 ? (
                    <WelcomeSection>
                        <Grid className='w-full p-10 bg-grey-300 h-full'>
                            <Grid className='grid grid-cols-4 gap-20'>
                                <Card className='h-160 cursor-pointer rounded-4'>
                                    <div className='w-full h-full p-8'>
                                        <img src="./assets/icons/BKSB.jpg" alt="BKSD" className='w-full h-full' />
                                    </div>
                                </Card>
                                <Card className='h-160 cursor-pointer rounded-4' onClick={handleOTJHours}>
                                    <div className='w-full h-full p-8'>
                                        <div className='w-full p-3'>
                                            <div>
                                                <Typography className='flex flex-col text-sm'><strong className='text-base'>{fullLearnerDetails?.otjTimeSpend - fullLearnerDetails?.otjTimeSpendRequired}</strong>Hours differential</Typography>
                                            </div>

                                            <div className='py-8'>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Stack sx={{ width: '100%', mr: 1, color: "#D4D4D4", backgroundColor: 'white', border: "1px solid #d3d3d3", borderRadius: "6px" }}>
                                                        <LinearProgress variant="determinate" value={(fullLearnerDetails?.otjTimeSpend / fullLearnerDetails?.otjTimeSpendRequired) * 100} sx={{ height: '2.2rem', backgroundColor: 'white', borderRadius: "6px", '& .MuiLinearProgress-bar': { backgroundColor: "#D4D4D4", borderRadius: "5px" } }} />
                                                    </Stack>
                                                </Box>
                                            </div>

                                            <div>
                                                <Typography className='text-sm'><strong>{fullLearnerDetails?.otjTimeSpend}</strong>Actual hrs completed</Typography>
                                                <Typography className='text-sm'><strong>{fullLearnerDetails?.otjTimeSpendRequired}</strong>Expected hrs to date</Typography>
                                            </div>
                                        </div>
                                        <strong className="text-black text-xl">
                                            OTJ Hours
                                        </strong>
                                    </div>
                                </Card>
                                <Card className='relative cursor-pointer h-160 rounded-4 bg-[#7473AF]'>
                                    <div className='flex flex-col justify-around items-center h-full p-8'>
                                        <img src='./assets/icons/New-Docs.png' className='w-112 h-112' />
                                        <strong className="text-white text-xl">
                                            New Docs to Sign
                                        </strong>
                                    </div>
                                    {/* <strong className='absolute top-8 right-8 text-white border-2 border-white rounded-full w-10 h-16 p-14 flex items-center justify-center'>1</strong> */}
                                </Card>
                                <Card className='relative cursor-pointer h-160 rounded-4 bg-[#676767]'>
                                    <div className='flex flex-col justify-around items-center h-full p-8'>
                                        <img src='./assets/icons/EILP-icon-grey.png' className='w-112 h-112' />
                                        <strong className="text-white text-xl">
                                            EILP
                                        </strong>
                                    </div>
                                    {/* <strong className='absolute top-8 right-8 text-white border-2 border-white rounded-full w-10 h-16 p-14 flex items-center justify-center'>1</strong> */}
                                </Card>
                                <Card className='relative cursor-pointer h-160 rounded-4 bg-[#F7941D]' onClick={handleActivities}>
                                    <div className='flex flex-col justify-around items-center h-full p-4'>
                                        <img src='./assets/icons/Actions-Activities.png' className='w-112 h-112' />
                                        <strong className="text-white text-xl">
                                            Actions & Activities
                                        </strong>
                                    </div>
                                    {/* <strong className='absolute top-8 right-8 text-white border-2 border-white rounded-full w-10 h-16 p-14 flex items-center justify-center'>1</strong> */}
                                </Card>
                                <Card className='h-160 cursor-pointer rounded-4 bg-[#ED008C]' onClick={handleOpenCalender}>
                                    <div className='flex flex-col justify-around items-center h-full p-8'>
                                        <img src='./assets/icons/ic-calender.png' className='w-112 h-112' />
                                        <strong className="text-white text-xl">
                                            28 Oct - 11:00AM
                                        </strong>
                                    </div>
                                </Card>
                                <Card className='relative cursor-pointer h-160 rounded-4'>
                                    <div className='w-full h-full'>
                                        <img src="./assets/icons/smart-vle-counter-btn.png" alt="svle" className='w-full h-full' />
                                    </div>
                                    <strong className='absolute top-8 right-8 text-[#5680C1] border-2 !border-[#5680C1] rounded-full w-10 h-16 p-14 flex items-center justify-center'>1</strong>
                                </Card>
                                <Card className='relative cursor-pointer h-160 rounded-4'>
                                    <div className='w-full h-full bg-cover bg-center' style={{ backgroundImage: `url('./assets/icons/wellbeing-btn.png')` }} >
                                        <div className='flex flex-col justify-end items-start h-full p-8'>
                                            <strong className="text-white text-xl">
                                                Wellbeing
                                            </strong>
                                        </div>
                                    </div>
                                    {/* <strong className='absolute top-8 right-8 text-white border-2 border-white rounded-full w-10 h-16 p-14 flex items-center justify-center'>1</strong> */}
                                </Card>
                            </Grid>
                        </Grid>
                    </WelcomeSection>
                ) : (
                    <CourseSection>
                        <Grid className='w-full p-10 bg-grey-300 h-full'>
                            <Grid className='grid grid-cols-4 gap-20'>
                                <Card className='h-160 cursor-pointer rounded-4 bg-[#B3B3B3]' onClick={handleOpenProgressWidget} >
                                    <div className='flex flex-col justify-around items-start h-full p-8'>
                                        <div className='w-full'>
                                            <LinearProgressWithLabel value={(singleCourse?.notStarted / singleCourse?.totalSubUnits) * 100} color="darkred" />
                                            <LinearProgressWithLabel value={(singleCourse?.partiallyCompleted / singleCourse?.totalSubUnits) * 100} color="coral" />
                                            <LinearProgressWithLabel value={(singleCourse?.fullyCompleted / singleCourse?.totalSubUnits) * 100} color="green" />
                                        </div>
                                        <strong className="text-white text-xl">
                                            Progress Widget
                                        </strong>
                                    </div>
                                </Card>
                                <Card className='h-160 cursor-pointer rounded-4 bg-[#04A4A4]' onClick={handleOpenUploadWork}>
                                    <div className='flex flex-col justify-between items-start h-full p-8'>
                                        <div className='w-full max-h-128 overflow-y-auto'>
                                            <Typography className='text-white text-sm'>No files found.</Typography>
                                        </div>
                                        <strong className="text-white text-xl bg-[#04A4A4]">
                                            Upload Work
                                        </strong>
                                    </div>
                                </Card>
                                <Card className='h-160 cursor-pointer rounded-4 bg-[#7473AF]'>
                                    <div className='flex flex-col justify-between items-start h-full p-8'>
                                        <div className='w-full max-h-128 overflow-y-auto'>
                                            <div className='flex gap-4 p-4 flex-col'>
                                                {singleCourse?.course?.units?.map(item => {
                                                    return (
                                                        <div key={item.id} className='flex items-center gap-2'>
                                                            <FaFolderOpen className='text-white text-xl overflow-visible' />
                                                            <Typography
                                                                className='text-white text-sm whitespace-nowrap overflow-hidden text-ellipsis'>{item?.title}</Typography>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <strong className="text-white text-xl bg-[#7473AF]">
                                            Units
                                        </strong>
                                    </div>
                                </Card>
                                <Card className='h-160 cursor-pointer rounded-4 bg-[#1AA1E1]'>
                                    <div className='flex flex-col justify-between items-start h-full p-8'>
                                        <div className='w-full max-h-128 overflow-y-auto'>
                                            <div className='p-4'>
                                                <Typography className='text-white text-md'><strong>Next Session:</strong></Typography>
                                                <Typography className='text-white text-md'><strong>28th October 2024</strong></Typography>
                                            </div>
                                            <div className='p-4'>
                                                <Typography className='text-white text-md'><strong>Planning Notes:</strong></Typography>
                                                <Typography className='text-white text-sm'>Teaching sequence 2/3 and progress review</Typography>
                                            </div>
                                        </div>
                                        <strong className="text-white text-xl bg-[#1AA1E1]">
                                            Learning Plan
                                        </strong>
                                    </div>
                                </Card>
                                <Card className='relative cursor-pointer h-160 rounded-4 bg-[#F7941D]' onClick={handleOpenResource}>
                                    <div className='flex flex-col justify-around items-center h-full p-8'>
                                        <img src='./assets/icons/Recources.png' className='w-92' />
                                        <strong className="text-white text-base">
                                            Resources
                                        </strong>
                                    </div>
                                    {/* <strong className='absolute top-8 right-8 text-white border-2 border-white rounded-full w-10 h-16 p-14 flex items-center justify-center'>1</strong> */}
                                </Card>
                                <Card className='h-160 cursor-pointer rounded-4 bg-[#ED008C]'>
                                    <div className='flex flex-col justify-between items-start h-full p-8'>
                                        <div className='w-full max-h-128 overflow-y-auto'>
                                            <Typography className='text-white text-sm'>No files found.</Typography>
                                        </div>
                                        <strong className="text-white text-xl bg-[#ED008C]">
                                            Files From Course
                                        </strong>
                                    </div>
                                </Card>
                                <Card className='relative cursor-pointer h-160 rounded-4'>
                                    <div className='w-full h-full'>
                                        <img src="./assets/icons/smart-vle-counter-btn.png" alt="svle" className='w-full h-full' />
                                    </div>
                                    {/* <strong className='absolute top-8 right-8 text-[#5680C1] border-2 !border-[#5680C1] rounded-full w-10 h-16 p-14 flex items-center justify-center'>1</strong> */}
                                </Card>
                                <Card className='h-160 cursor-pointer rounded-4 bg-[#5AC400]'>
                                    <div className='flex flex-col justify-around items-center h-full p-8'>
                                        <img src='./assets/icons/Process-Map.png' className='w-68' onClick={handleOpenProgressMap} />
                                        <strong className="text-white text-xl">
                                            Progress Map
                                        </strong>
                                    </div>
                                </Card>
                            </Grid>
                        </Grid>
                    </CourseSection>
                )}
            </div>
            {/* <Dialog
                open={openUploadWork}
                onClose={handleClose}
                sx={{
                    ".MuiDialog-paper": {
                        borderRadius: "4px",
                        padding: "1rem",
                    },
                }}
            >
                <UploadWorkDialog dialogFn={{ handleClose }} />
            </Dialog> */}

            <Dialog
                open={openCalender}
                onClose={handleClose}
                sx={{
                    ".MuiDialog-paper": {
                        borderRadius: "4px",
                        padding: "1rem",
                        width: "90%",
                        maxWidth: "lg",
                    },
                }}
            >
                <Calendar />
            </Dialog>


            <Dialog
                open={isDialogOpen}
                onClose={handleCloseEmail}
                sx={{
                    ".MuiDialog-paper": {
                        borderRadius: "4px",
                        width: "100%",
                    },
                }}
            >
                <DialogTitle>Email {learner.user_name}</DialogTitle>

                <DialogContent>
                    <Box className="flex flex-col justify-between gap-12 p-0">
                        <div>
                            <Typography
                                sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}
                            >
                                Subject
                            </Typography>
                            <TextField
                                name="subject"
                                size="small"
                                placeholder="Subject"
                                fullWidth
                                value={emailData?.subject}
                                onChange={handleChangeEmail}
                            />
                        </div>
                        <div>
                            <Typography
                                sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}
                            >
                                Message
                            </Typography>
                            <TextField
                                name="message"
                                size="small"
                                placeholder="Message"
                                fullWidth
                                multiline
                                rows={6}
                                value={emailData?.message}
                                onChange={handleChangeEmail}
                            />
                        </div>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <SecondaryButton name="Send" disable={!emailData?.subject || !emailData?.message} onClick={handleSend} />
                    <SecondaryButtonOutlined name="Close" onClick={handleCloseEmail} />
                </DialogActions>
            </Dialog>

            <Dialog
                open={openSession}
                onClose={handleClose}
                fullWidth
                sx={{
                    ".MuiDialog-paper": {
                        borderRadius: "4px",
                        width: "100%",
                    },
                }}
            >
                <DialogContent className="p-0">
                    <NewSession edit={true} handleCloseDialog={handleClose} />
                </DialogContent>
            </Dialog>

        </Container>
    );
}

export default LearnerPortfolio;
