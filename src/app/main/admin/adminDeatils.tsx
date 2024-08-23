import { Autocomplete, Box, Card, Checkbox, FormControlLabel, Grid, ListSubheader, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { fetchLearnerAPI, selectLearnerManagement, updateLearnerAPI } from 'app/store/learnerManagement';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SecondaryButton } from 'src/app/component/Buttons';

const AdminDetails = () => {

    const [isChecked, setIsChecked] = useState(false);
    const dispatch: any = useDispatch();
    const { employer } = useSelector(selectLearnerManagement);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const [adminData, setAdminData] = useState({
        uln: "",
        mis_learner_id: "",
        student_id: "",
        user_id: "",
        first_name: "",
        surname: "",
        known_as: "",
        email: "",
        telephone: "",
        mobile: "",
        date_of_birth: "",
        gender: "",
        national_insurance_no: "",
        ethnicity: "",
        learner_disability: "",
        learning_difficulties: "",
        initial_assessment_numeracy: "",
        initial_ssessment_literacy: "",
        initial_assessment_ict: "",
        functional_skills_date: "",
        technical_certificate_date: "",
        err_date: "",
        house_name: "",
        village: "",
        city: "",
        county: "",
        postcode: "",
        country_of_domicile: "",
        external_data_code: "",
        employer: "",
        cost_centre: "",
        job_title: "",
        location: "",
        manager_name: "",
        manager_job_title: "",
        mentor: "",
        funding_contractor: "",
        partner: "",
        area: "",
        sub_area: "",
        shift: "",
        cohort: "",
        lsf: "",
        curriculum_area: "",
        ssa_1: "",
        ssa_2: "",
        director_of_curriculum: "",
        wage: "",
        wage_type: "",
        archived_access: "",
        branding_type: "",
        learner_type: "",
        funding_body: "",
        exprcted_job_hours: "",
    })

    const handleDataUpdate = (e) => {
        const { name, value } = e.target;
        setAdminData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            let response;
            let id = 1;
            //   response = await dispatch(updateLearnerAPI(id, adminData));

            //   if (response) {
            //     navigate("/home")
            //   }
        } catch (error) {
            console.error("Error updated data:", error);
        }
        console.log(adminData);
    }

    useEffect(() => {
        dispatch(fetchLearnerAPI())
    }, [dispatch])

    return (
        <Grid>
            <Grid className='my-20 mx-20 flex flex-col gap-20'>

                <Card className='rounded-6 items-center ' variant="outlined">
                    <Grid className='h-full flex flex-col'>
                        <Box>
                            <Grid xs={12} className='p-10 border-b-2 bg-gray-100'>
                                <Typography className='font-600 '>Student ID</Typography>
                            </Grid>
                            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-col">
                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>ULN</Typography>
                                        <TextField
                                            name="uln"
                                            value={adminData?.uln}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>MIS Learner ID</Typography>
                                        <TextField
                                            name="mis_learner_id"
                                            value={adminData?.mis_learner_id}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                </Grid>
                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Student ID</Typography>
                                        <TextField
                                            name="student_id"
                                            value={adminData?.student_id}
                                            size="small"
                                            required
                                            fullWidth
                                            placeholder='Internal Student Number'
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>User ID*</Typography>
                                        <TextField
                                            name="user_id"
                                            value={adminData?.user_id}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                </Grid>
                            </Box>

                        </Box>
                    </Grid>
                </Card >

                <Card className='rounded-6 items-center ' variant="outlined">
                    <Grid className='h-full flex flex-col'>
                        <Box>
                            <Grid xs={12} className='p-10 border-b-2 bg-gray-100'>
                                <Typography className='font-600 '>About You</Typography>
                            </Grid>
                            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-col">

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>First Name*</Typography>
                                        <TextField
                                            name="first_name"
                                            value={adminData?.first_name}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Surname*</Typography>
                                        <TextField
                                            name="surname"
                                            value={adminData?.surname}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Also Known As</Typography>
                                        <TextField
                                            name="known_as"
                                            value={adminData?.known_as}
                                            size="small"
                                            required
                                            fullWidth
                                            placeholder='Internal Student Number'
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Email*</Typography>
                                        <TextField
                                            name="email"
                                            value={adminData?.email}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Telephone</Typography>
                                        <TextField
                                            name="telephone"
                                            value={adminData?.telephone}
                                            type='number'
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Mobile</Typography>
                                        <TextField
                                            name="mobile"
                                            value={adminData?.mobile}
                                            type='number'
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Date of birth</Typography>
                                        <TextField
                                            name="date_of_birth"
                                            value={adminData?.date_of_birth}
                                            size="small"
                                            type='date'
                                            required
                                            fullWidth
                                            placeholder='Internal Student Number'
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Gender</Typography>
                                        <Select
                                            name="gender"
                                            // label="Username"
                                            value={adminData?.gender}
                                            size="small"
                                            placeholder='Please Select'
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            sx={{ ".muiltr-156t61m-MuiSvgIcon-root-MuiSelect-icon": { color: "black" } }}
                                        >
                                            <MenuItem value={"Male"}>Male</MenuItem>
                                            <MenuItem value={"Female"}>Female</MenuItem>
                                            <MenuItem value={"Non-Binary"}>Non-Binary</MenuItem>
                                            <MenuItem value={"Other"}>Other</MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/4'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>National Insurance No</Typography>
                                        <TextField
                                            name="national_insurance_no"
                                            value={adminData?.national_insurance_no}
                                            type='number'
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>

                                    <Grid className='w-1/4'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Ethnicity</Typography>
                                        <TextField
                                            name="ethnicity"
                                            value={adminData?.ethnicity}
                                            type='text'
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>

                                    <Grid className='w-1/4'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Learner Disability</Typography>
                                        <Select
                                            name="learner_disability"
                                            // label="Username"
                                            value={adminData?.learner_disability}
                                            size="small"
                                            placeholder='Please Select'
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            sx={{ ".muiltr-156t61m-MuiSvgIcon-root-MuiSelect-icon": { color: "black" } }}
                                        >
                                            <MenuItem value={"Visual impairment"}>Visual impairment</MenuItem>
                                            <MenuItem value={"Asperger's syndrome"}>Asperger's syndrome</MenuItem>
                                            <MenuItem value={"Hearing impairment"}>Hearing impairment</MenuItem>
                                            <MenuItem value={"Disability affecting mobility"}>Disability affecting mobility</MenuItem>
                                            <MenuItem value={"Other physical disability"}>Other physical disability</MenuItem>
                                            <MenuItem value={"Other medical condition"}>Other medical condition</MenuItem>
                                            <MenuItem value={"Emotional/behavioural"}>Emotional/behavioural</MenuItem>
                                            <MenuItem value={"Mental health difficulty"}>Mental health difficulty</MenuItem>
                                            <MenuItem value={"Temporary disability after illness"}>Temporary disability after illness</MenuItem>
                                            <MenuItem value={"Profound complex disabilities"}>Profound complex disabilities</MenuItem>
                                            <MenuItem value={"Multiple disabilities"}>Multiple disabilities</MenuItem>
                                            <MenuItem value={"Other"}>Other</MenuItem>
                                            <MenuItem value={"No disability"}>No disability</MenuItem>
                                            <MenuItem value={"Not known / Not provided"}>Not known / Not provided</MenuItem>
                                        </Select>
                                    </Grid>

                                    <Grid className='w-1/4'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Learning Difficulties</Typography>
                                        <Select
                                            name="learning_difficulties"
                                            // label="Username"
                                            value={adminData?.learning_difficulties}
                                            size="small"
                                            placeholder='Please Select'
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            sx={{ ".muiltr-156t61m-MuiSvgIcon-root-MuiSelect-icon": { color: "black" } }}
                                        >
                                            <ListSubheader className='font-700'>English</ListSubheader>
                                            <MenuItem value={"Moderate learning difficulty"}>Moderate learning difficulty</MenuItem>
                                            <MenuItem value={"Severe learning difficulty"}>Severe learning difficulty</MenuItem>
                                            <MenuItem value={"Dyslexia"}>Dyslexia</MenuItem>
                                            <MenuItem value={"Dyscalculia"}>Dyscalculia</MenuItem>
                                            <MenuItem value={"Other specific learning difficulty"}>Other specific learning difficulty</MenuItem>
                                            <MenuItem value={"Autism spectrum disorder"}>Autism spectrum disorder</MenuItem>
                                            <MenuItem value={"Multiple learning difficulties"}>Multiple learning difficulties</MenuItem>
                                            <MenuItem value={"Other"}>Other</MenuItem>
                                            <MenuItem value={"No learning difficulty"}>No learning difficulty</MenuItem>
                                            <MenuItem value={"Not known/information not provided"}>Not known/information not provided</MenuItem>
                                            <ListSubheader className='font-700'>Welsh</ListSubheader>
                                            <MenuItem value={"Visual impairment"}>Visual impairment</MenuItem>
                                            <MenuItem value={"Hearing impairment"}>Hearing impairment</MenuItem>
                                            <MenuItem value={"Physical and/or medical difficulties"}>Physical and/or medical difficulties</MenuItem>
                                            <MenuItem value={"Behavioural, emotional and social difficulties"}>Behavioural, emotional and social difficulties</MenuItem>
                                            <MenuItem value={"Multi-sensory impairment"}>Multi-sensory impairment</MenuItem>
                                            <MenuItem value={"Autistic spectrum disorders"}>Autistic spectrum disorders</MenuItem>
                                            <MenuItem value={"Speech, language and communication difficulties"}>Speech, language and communication difficulties</MenuItem>
                                            <MenuItem value={"Moderate Learning Difficulties"}>Moderate Learning Difficulties</MenuItem>
                                            <MenuItem value={"Severe Learning Difficulties"}>Severe Learning Difficulties</MenuItem>
                                            <MenuItem value={"Profound and Multiple Learning Difficulties"}>Profound and Multiple Learning Difficulties</MenuItem>
                                            <MenuItem value={"SPLD - Dyslexia"}>SPLD - Dyslexia</MenuItem>
                                            <MenuItem value={"SPLD Dyscalculia"}>SPLD Dyscalculia</MenuItem>
                                            <MenuItem value={"SPLD- Dyspraxia"}>SPLD- Dyspraxia</MenuItem>
                                            <MenuItem value={"SPLD - Attention Deficit Hyperactivity Disorder"}>SPLD - Attention Deficit Hyperactivity Disorder</MenuItem>
                                            <MenuItem value={"General Learning Difficulties"}>General Learning Difficulties</MenuItem>
                                            <MenuItem value={"Does not apply"}>Does not apply</MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/3'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Initial Assessment Numeracy</Typography>
                                        <TextField
                                            name="initial_assessment_numeracy"
                                            value={adminData?.initial_assessment_numeracy}
                                            type='text'
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>

                                    <Grid className='w-1/3'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Initial Assessment Literacy</Typography>
                                        <TextField
                                            name="initial_ssessment_literacy"
                                            value={adminData?.initial_ssessment_literacy}
                                            type='text'
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>

                                    <Grid className='w-1/3'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Initial Assessment ICT</Typography>
                                        <TextField
                                            name="initial_assessment_ict"
                                            value={adminData?.initial_assessment_ict}
                                            type='text'
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>

                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/3'>
                                        <FormControlLabel
                                            control={<Checkbox sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "200" }} />}
                                            label="Functional Skills"
                                        />
                                        <TextField
                                            name="functional_skills_date"
                                            value={adminData?.functional_skills_date}
                                            type='date'
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>

                                    <Grid className='w-1/3'>
                                        <FormControlLabel
                                            control={<Checkbox sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "200" }} />}
                                            label="Technical Certificate"
                                        />
                                        <TextField
                                            name="technical_certificate_date"
                                            value={adminData?.technical_certificate_date}
                                            type='date'
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>

                                    <Grid className='w-1/3'>
                                        <FormControlLabel
                                            control={<Checkbox sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "200" }} />}
                                            label="ERR"
                                        />
                                        <TextField
                                            name="err_date"
                                            value={adminData?.err_date}
                                            type='date'
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>

                                </Grid>

                            </Box>

                        </Box>
                    </Grid>
                </Card >

                <Card className='rounded-6 items-center ' variant="outlined">
                    <Grid className='h-full flex flex-col'>
                        <Box>
                            <Grid xs={12} className='p-10 border-b-2 bg-gray-100'>
                                <Typography className='font-600 '>Address</Typography>
                            </Grid>
                            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-col">
                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>House No/Name and Street</Typography>
                                        <TextField
                                            name="house_name"
                                            value={adminData?.house_name}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Suburb/Village</Typography>
                                        <TextField
                                            name="village"
                                            value={adminData?.village}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                </Grid>
                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Town/City</Typography>
                                        <TextField
                                            name="city"
                                            value={adminData?.city}
                                            size="small"
                                            required
                                            fullWidth
                                            placeholder='Internal Student Number'
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>County</Typography>
                                        <TextField
                                            name="county"
                                            value={adminData?.county}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/3'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Home Postcode</Typography>
                                        <TextField
                                            name="postcode"
                                            value={adminData?.postcode}
                                            type='number'
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>

                                    <Grid className='w-1/3'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Country of Domicile</Typography>
                                        <Select
                                            name="country_of_domicile"
                                            // label="Username"
                                            value={adminData?.country_of_domicile}
                                            size="small"
                                            placeholder='Please Select'
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            sx={{ ".muiltr-156t61m-MuiSvgIcon-root-MuiSelect-icon": { color: "black" } }}
                                        >
                                            <MenuItem value={"XF - England"}>XF - England</MenuItem>
                                            <MenuItem value={"XG Northern Ireland"}>XG Northern Ireland</MenuItem>
                                            <MenuItem value={"XH Scotland"}>XH Scotland</MenuItem>
                                            <MenuItem value={"XI - Wales"}>XI - Wales</MenuItem>
                                            <MenuItem value={"XK Channel Islands"}>XK Channel Islands</MenuItem>
                                            <MenuItem value={"IM Isle of Man"}>IM Isle of Man</MenuItem>
                                            <MenuItem value={"GB United Kingdom"}>GB United Kingdom</MenuItem>
                                            <MenuItem value={"AU Australia"}>AU Australia</MenuItem>
                                        </Select>
                                    </Grid>

                                    <Grid className='w-1/3'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>External Data Code</Typography>
                                        <TextField
                                            name="external_data_code"
                                            value={adminData?.external_data_code}
                                            type='text'
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>

                                </Grid>
                            </Box>

                        </Box>
                    </Grid>
                </Card >

                <Card className='rounded-6 items-center ' variant="outlined">
                    <Grid className='h-full flex flex-col'>
                        <Box>
                            <Grid xs={12} className='p-10 border-b-2 bg-gray-100'>
                                <Typography className='font-600 '>Employer</Typography>
                            </Grid>
                            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-col">
                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Employer*</Typography>
                                        <Autocomplete
                                            disableClearable
                                            fullWidth
                                            size="small"
                                            options={employer}
                                            getOptionLabel={(option: any) => option.employer?.employer_name}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Select Employer"
                                                    name="role"
                                                    value={adminData?.employer}
                                                />
                                            )}
                                            onChange={(event, value) => {
                                                setAdminData((prevData) => ({
                                                    ...prevData,
                                                    employer: value?.employer?.employer_name, 
                                                }));
                                            }}
                                            sx={{
                                                ".MuiAutocomplete-clearIndicator": {
                                                    color: "#5B718F",
                                                },
                                            }}
                                            PaperComponent={({ children }) => (
                                                <Paper style={{ borderRadius: "4px" }}>{children}</Paper>
                                            )}
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Cost Centre</Typography>
                                        <TextField
                                            name="cost_centre"
                                            value={adminData?.cost_centre}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Job Title</Typography>
                                        <TextField
                                            name="job_title"
                                            value={adminData?.job_title}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Location</Typography>
                                        <TextField
                                            name="location"
                                            value={adminData?.location}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Manager Name</Typography>
                                        <TextField
                                            name="manager_name"
                                            value={adminData?.manager_name}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Manager Job Title</Typography>
                                        <TextField
                                            name="manager_job_title"
                                            value={adminData?.manager_job_title}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Mentor</Typography>
                                        <TextField
                                            name="mentor"
                                            value={adminData?.mentor}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Funding Contractor</Typography>
                                        <TextField
                                            name="funding_contractor"
                                            value={adminData?.funding_contractor}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Partner</Typography>
                                        <TextField
                                            name="partner"
                                            value={adminData?.partner}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Area</Typography>
                                        <TextField
                                            name="area"
                                            value={adminData?.area}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Sub Area</Typography>
                                        <TextField
                                            name="sub_area"
                                            value={adminData?.sub_area}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Shift</Typography>
                                        <TextField
                                            name="shift"
                                            value={adminData?.shift}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Cohort</Typography>
                                        <TextField
                                            name="cohort"
                                            value={adminData?.cohort}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>LSF</Typography>
                                        <TextField
                                            name="lsf"
                                            value={adminData?.lsf}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Curriculum Area</Typography>
                                        <TextField
                                            name="curriculum_area"
                                            value={adminData?.curriculum_area}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>SSA1</Typography>
                                        <TextField
                                            name="ssa_1"
                                            value={adminData?.ssa_1}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>SSA2</Typography>
                                        <TextField
                                            name="ssa_2"
                                            value={adminData?.ssa_2}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Director of Curriculum</Typography>
                                        <TextField
                                            name="director_of_curriculum"
                                            value={adminData?.director_of_curriculum}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Wage(£)</Typography>
                                        <TextField
                                            name="wage"
                                            value={adminData?.wage}
                                            size="small"
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            className='bg-none '
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Wage Type</Typography>
                                        <Select
                                            name="wage_type"
                                            // label="Username"
                                            value={adminData?.wage_type}
                                            size="small"
                                            placeholder='Please Select'
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            sx={{ ".muiltr-156t61m-MuiSvgIcon-root-MuiSelect-icon": { color: "black" } }}
                                        >
                                            <MenuItem value={"Per Hour"}>Per Hour</MenuItem>
                                            <MenuItem value={"Per Annum"}>Per Annum</MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>

                            </Box>

                        </Box>
                    </Grid>
                </Card >

                <Card className='rounded-6 items-center ' variant="outlined">
                    <Grid className='h-full flex flex-col'>
                        <Box>
                            <Grid xs={12} className='p-10 border-b-2 bg-gray-100 flex justify-between items-center'>
                                <Typography className='font-600 '>Funding Body</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <Typography className='font-600 '>User Archived </Typography>
                                    <Checkbox sx={{ marginLeft: '8px' }} />
                                </Box>
                            </Grid>
                            <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-col">
                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Allow Archived Access</Typography>
                                        <Select
                                            name="archived_access"
                                            // label="Username"
                                            value={adminData?.archived_access}
                                            size="small"
                                            placeholder='Please Select'
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            sx={{ ".muiltr-156t61m-MuiSvgIcon-root-MuiSelect-icon": { color: "black" } }}
                                        >
                                            <MenuItem value={"Yes"}>Yes</MenuItem>
                                            <MenuItem value={"No"}>No</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Branding Type:</Typography>
                                        <Select
                                            name="branding_type"
                                            // label="Username"
                                            value={adminData?.branding_type}
                                            size="small"
                                            placeholder='Please Select'
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            sx={{ ".muiltr-156t61m-MuiSvgIcon-root-MuiSelect-icon": { color: "black" } }}
                                        >
                                            <MenuItem value={""}>Select Branding Type</MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>

                                <Grid className='w-full flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Learner Type</Typography>
                                        <Select
                                            name="learner_type"
                                            // label="Username"
                                            value={adminData?.learner_type}
                                            size="small"
                                            placeholder='Please Select'
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            sx={{ ".muiltr-156t61m-MuiSvgIcon-root-MuiSelect-icon": { color: "black" } }}
                                        >
                                            <MenuItem value={"Apprentice"}>Apprentice</MenuItem>
                                            <MenuItem value={"Pending BIL"}>Pending BIL</MenuItem>
                                            <MenuItem value={"Pending WD"}>Pending WD</MenuItem>
                                            <MenuItem value={"Private"}>Private</MenuItem>
                                        </Select>
                                    </Grid>

                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Funding Body</Typography>
                                        <Select
                                            name="funding_body"
                                            // label="Username"
                                            value={adminData?.funding_body}
                                            size="small"
                                            placeholder='Please Select'
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            sx={{ ".muiltr-156t61m-MuiSvgIcon-root-MuiSelect-icon": { color: "black" } }}
                                        >
                                            <MenuItem value={"Advanced Learning Loan"}>Advanced Learning Loan</MenuItem>
                                            <MenuItem value={"Bursary"}>Bursary</MenuItem>
                                            <MenuItem value={"Commercial"}>Commercial</MenuItem>
                                            <MenuItem value={"Community Learning"}>Community Learning</MenuItem>
                                            <MenuItem value={"EFA"}>Select</MenuItem>
                                            <MenuItem value={"Employer"}>Employer</MenuItem>
                                            <MenuItem value={"ESF"}>ESF</MenuItem>
                                            <MenuItem value={"ESF"}>ESF</MenuItem>
                                            <MenuItem value={"ESFA"}>ESFA</MenuItem>
                                            <MenuItem value={"Fee Waiver"}>Fee Waiver</MenuItem>
                                            <MenuItem value={"FWDF"}>FWDF</MenuItem>
                                            <MenuItem value={"ITA"}>ITA</MenuItem>
                                            <MenuItem value={"Levy"}>Levy</MenuItem>
                                            <MenuItem value={"MA Fully Funded"}>MA Fully Funded</MenuItem>
                                            <MenuItem value={"MA-Employer"}>MA-Employer</MenuItem>
                                            <MenuItem value={"Non-Levy"}>Non-Levy</MenuItem>
                                            <MenuItem value={"Other"}>Other</MenuItem>
                                            <MenuItem value={"SAAS"}>SAAS</MenuItem>
                                            <MenuItem value={"SAAS-Employer"}>SAAS-Employer</MenuItem>
                                            <MenuItem value={"SAAS-Self"}>SAAS-Self</MenuItem>
                                            <MenuItem value={"SDS"}>SDS</MenuItem>
                                            <MenuItem value={"Self"}>Self</MenuItem>
                                            <MenuItem value={"SFA"}>SFA</MenuItem>
                                            <MenuItem value={"Student Loan"}>Student Loan</MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>

                                <Grid className='w-yfull flex flex-row gap-20'>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Use specified Off the Job hours</Typography>
                                        <Checkbox
                                            className='p-0'
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                    </Grid>
                                    <Grid className='w-1/2'>
                                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Expected off the Job hours</Typography>
                                        <TextField
                                            name="exprcted_job_hours"
                                            value={adminData?.exprcted_job_hours}
                                            size="small"
                                            type='number'
                                            required
                                            fullWidth
                                            onChange={handleDataUpdate}
                                            disabled={!isChecked}
                                            sx={{
                                                backgroundColor: !isChecked ? '#f0f0f0' : 'inherit'
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                            </Box>

                        </Box>
                    </Grid>
                </Card >

                <div className="flex justify-end mr-24 mb-20">
                    <SecondaryButton name="Save" onClick={handleSubmit} />
                </div>

            </Grid >
        </Grid>
    )
}
export default AdminDetails