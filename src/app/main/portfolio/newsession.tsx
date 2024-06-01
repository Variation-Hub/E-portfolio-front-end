import { Box, Card, Grid, IconButton, MenuItem, Paper, Select, TextField, Tooltip, Typography } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { AdminRedirect, EmployerRedirect, fundingBodyData, roles } from 'src/app/contanst';
import { LoadingButton, SecondaryButton, SecondaryButtonOutlined } from 'src/app/component/Buttons';
import { timezones } from 'src/app/contanst/timezoneData';
import { emailValidationMsg, mobileValidationMsg, nameValidationMsg, passwordValidation, usernameValidationMsg } from 'src/app/contanst/regValidation';
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { DatePicker } from '@mui/x-date-pickers';
import { FileUploader } from 'react-drag-drop-files';
import { useState } from 'react';
import Breadcrumb from 'src/app/component/Breadcrumbs';


const NewSession = (props) => {

    const [companyData, setCompanyData] = useState({
        company_name: '',
        mis_employer_id: '',
        business_department: '',
        business_location: '',
        branch_code: '',
        address1: '',
        address2: '',
        city: '',
        country: '',
        postal_code: ''
    });

    const handleDataUpdate = (e) => {
        const { name, value } = e.target;
        setCompanyData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [detailsData, setCompanyDetailsData] = useState({
        employer_id: '',
        business_category: '',
        Employee_no: '',
        external_code: '',
        telephone: '',
        website: '',
        contact: '',
        email: '',
    });

    const handleDetailsUpdate = (e) => {
        const { name, value } = e.target;
        setCompanyDetailsData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [descriptionData, setDescriptionData] = useState({
        business_description: '',
        comments: '',
    });

    const handleDescriptionUpdate = (e) => {
        const { name, value } = e.target;
        setDescriptionData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [date, setDate] = useState({
        assessment_date: '',
        renewal_date: '',
        insurance_date: '',
    });

    const handleDateUpdate = (e) => {
        const { name, value } = e.target;
        setDate(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const { handleClose, userData, updateData, updateUserHandler, dataUpdatingLoadding, userDataError } = props;

    const createUserHandler = (e) => {
        // const { name, value } = e.target;
        // setDate(prevState => ({
        //     ...prevState,
        //     [name]: value
        // }));
        console.log("Company Data: ", companyData)
        console.log("Company Details Data: ", detailsData)
        console.log("Description Data: ", descriptionData)
        console.log("Date Data: ", date)
    };



    const fileTypes = ["PDF"];
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
        console.log("File : ", file)
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
                                        name="company_name"
                                        // label="Username"
                                        value={companyData.company_name}
                                        size="small"
                                        placeholder='Select trainer'
                                        required
                                        fullWidth
                                        onChange={handleDataUpdate}
                                    >
                                        <MenuItem value={'Soft skills training'}>Soft skills training</MenuItem>
                                        <MenuItem value={'Leadership'}>Leadership</MenuItem>
                                        <MenuItem value={'Technical training'}>Technical training</MenuItem>
                                    </Select>

                                </Grid>

                                <Grid className='w-full'>
                                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Select Learner</Typography>
                                    <Select
                                        name="mis_employer_id"
                                        value={companyData.mis_employer_id}
                                        size="small"
                                        placeholder='Select learner'
                                        required
                                        fullWidth
                                        onChange={handleDataUpdate}
                                    >
                                    </Select>

                                </Grid>

                                <Grid className='w-full'>
                                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Select Session Method</Typography>
                                    <Select
                                        name="company_name"
                                        // label="Username"
                                        value={companyData.company_name}
                                        size="small"
                                        placeholder='Select session method'
                                        required
                                        fullWidth
                                        onChange={handleDataUpdate}
                                        className='bg-none '
                                    >
                                    </Select>
                                </Grid>

                                <Grid className='w-full'>
                                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Enter Session Location</Typography>
                                    <TextField
                                        name="mis_employer_id"
                                        value={companyData.mis_employer_id}
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
                                        name="company_name"
                                        value={companyData.company_name}
                                        size="small"
                                        placeholder='DD / MM / YYYY  HH:MM'
                                        required
                                        fullWidth
                                        onChange={handleDataUpdate}
                                    />
                                </Grid>

                                <Grid className='w-full'>
                                    <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Select Session Duration</Typography>
                                    <TextField
                                        name="mis_employer_id"
                                        value={companyData.mis_employer_id}
                                        size="small"
                                        placeholder='HH:MM'
                                        required
                                        fullWidth
                                        onChange={handleDataUpdate}
                                    />
                                </Grid>
                            </Box>

                        </Box>

                        <Box style={{ margin: "auto 1rem 1rem auto" }}>
                            {dataUpdatingLoadding ?
                                <LoadingButton />
                                :
                                <>
                                    <SecondaryButtonOutlined name="Cancel" onClick={handleClose} style={{ width: "10rem", marginRight: "2rem" }} />
                                    <SecondaryButton name={updateData ? "Update" : "Save"} style={{ width: "10rem" }} onClick={createUserHandler} />
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