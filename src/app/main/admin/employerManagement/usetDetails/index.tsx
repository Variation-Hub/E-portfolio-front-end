import { Box, Card, Grid, IconButton, MenuItem, Paper, Select, TextField, Tooltip, Typography } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { fundingBodyData, roles } from 'src/app/contanst';
import { LoadingButton, SecondaryButton, SecondaryButtonOutlined } from 'src/app/component/Buttons';
import { timezones } from 'src/app/contanst/timezoneData';
import { emailValidationMsg, mobileValidationMsg, nameValidationMsg, passwordValidation, usernameValidationMsg } from 'src/app/contanst/regValidation';
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { DatePicker } from '@mui/x-date-pickers';

const UserDetails = (props) => {

    const { handleClose,
        handleUpdate,
        createUserHandler,
        userData,
        updateData,
        updateUserHandler,
        dataUpdatingLoadding,
        userDataError
    } = props;
    console.log("sddfadaf", userDataError)
    return (
        <div className='m-20'>
            <Card className='rounded-6 items-center ' variant="outlined">
                <div className='h-full flex flex-col'>
                    <Box>
                        <Grid xs={12} className='p-10 font-600 border-b-2 bg-gray-100'>
                            <p>Company</p>
                        </Grid>
                        <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                            <div className='w-1/2'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Company Name</Typography>
                                <TextField
                                    name="user_name"
                                    // label="Username"
                                    value={userData?.user_name}
                                    size="small"
                                    placeholder='Company name'
                                    required
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.user_name}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={usernameValidationMsg} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>

                            <div className='w-1/2'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>MIS Employer ID</Typography>
                                <TextField
                                    name="email"
                                    value={userData?.email}
                                    size="small"
                                    placeholder='Enter ID'
                                    required
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.email}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={emailValidationMsg} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>
                        </Box>
                        <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                            <div className='w-1/3'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Business Department</Typography>

                                <TextField
                                    name="password"
                                    placeholder="Course name"
                                    value={updateData ? "Locker@2024" : userData?.password}
                                    size="small"
                                    type="password"
                                    required={!updateData}
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.password}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={passwordValidation} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>

                            <div className='w-1/3'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Business Location</Typography>
                                <TextField
                                    name="confrimpassword"
                                    placeholder="Course name"
                                    value={updateData ? "Locker@2024" : userData?.confrimpassword}
                                    size="small"
                                    type={updateData ? "password" : "text"}
                                    required={!updateData}
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.confrimpassword}
                                />
                            </div>

                            <div className='w-1/3 '>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Branch Code</Typography>
                                <TextField
                                    name="confrimpassword"
                                    placeholder="Course name"
                                    value={updateData ? "Locker@2024" : userData?.confrimpassword}
                                    size="small"
                                    type={updateData ? "password" : "text"}
                                    required={!updateData}
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.confrimpassword}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title="Password must be same" placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>

                        </Box>
                        <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                            <div className='w-1/2'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Address 1</Typography>
                                <TextField
                                    name="user_name"
                                    // label="Username"
                                    value={userData?.user_name}
                                    size="small"
                                    placeholder='Address'
                                    required
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.user_name}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={usernameValidationMsg} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>

                            <div className='w-1/2'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Address 2</Typography>
                                <TextField
                                    name="email"
                                    value={userData?.email}
                                    size="small"
                                    placeholder='Address'
                                    required
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.email}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={emailValidationMsg} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>
                        </Box>
                        <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                            <div className='w-1/3'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Town/City</Typography>

                                <TextField
                                    name="password"
                                    placeholder="City"
                                    value={updateData ? "Locker@2024" : userData?.password}
                                    size="small"
                                    type="password"
                                    required={!updateData}
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.password}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={passwordValidation} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>

                            <div className='w-1/3'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Country</Typography>
                                <TextField
                                    name="confrimpassword"
                                    placeholder="Country"
                                    value={updateData ? "Locker@2024" : userData?.confrimpassword}
                                    size="small"
                                    type={updateData ? "password" : "text"}
                                    required={!updateData}
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.confrimpassword}
                                />
                            </div>

                            <div className='w-1/3 '>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Postal Code</Typography>
                                <TextField
                                    name="confrimpassword"
                                    placeholder="Postal Code"
                                    value={updateData ? "Locker@2024" : userData?.confrimpassword}
                                    size="small"
                                    type={updateData ? "password" : "text"}
                                    required={!updateData}
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.confrimpassword}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title="Password must be same" placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>

                        </Box>

                        {/* <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                            <div className='w-1/2'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Employer<sup>*</sup></Typography>
                                <Autocomplete
                                    disableClearable
                                    fullWidth
                                    size="small"
                                    options={[{ id: "1", name: "Jenis Savaliya" }, { id: "2", name: "Mohan Sharma" }]}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params} placeholder="Select employer"
                                        value={userData?.employer_id}
                                        name="employer_id" />}
                                    onChange={(e, value) => handleUpdate({ target: { name: "employer_id", value: value.id } })}
                                    sx={{
                                        '.MuiAutocomplete-clearIndicator': {
                                            color: "#5B718F"
                                        }
                                    }}
                                    PaperComponent={({ children }) => (
                                        <Paper style={{ borderRadius: "4px" }}>{children}</Paper>
                                    )}
                                />
                            </div>

                            <div className='w-1/2'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Mobile</Typography>
                                <TextField
                                    name="mobile"
                                    value={userData?.mobile}
                                    size="small"
                                    placeholder='Enter mobile number'
                                    required
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.mobile}

                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={mobileValidationMsg} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>

                        </Box> */}

                        {/* <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                            <div className='w-1/2'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>National Insurance Number</Typography>

                                <TextField
                                    name="national_ins_no"
                                    placeholder="Enter national insurance number"
                                    value={userData?.national_ins_no}
                                    size="small"
                                    type="text"
                                    fullWidth
                                    onChange={handleUpdate}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={passwordValidation} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>

                            <div className='w-1/2'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Funding Body<sup>*</sup></Typography>
                                <TextField
                                name="funding_body"
                                value={userData?.funding_body}
                                size="small"
                                placeholder='Enter funding details'
                                fullWidth
                                onChange={handleUpdate}
                                error={userDataError?.funding_body}
                            />
                                <Autocomplete
                                    disableClearable
                                    fullWidth
                                    size="small"
                                    value={userData?.funding_body}
                                    options={["Bursary",
                                        "Commercial ",
                                        "Community Learning",
                                        "EFA",
                                        "Employer",
                                        "ESF",
                                        "ESF",
                                        "ESFA",
                                        "Fee Waiver",
                                        "FWDF",
                                        "ITA",
                                        "Levy",
                                        "MA Fully Funded",
                                        "MA-Employer",
                                        "Non-Levy",
                                        "Other",
                                        "SAAS",
                                        "SAAS-Employer",
                                        "SAAS-Self",
                                        "SDS",
                                        "Self",
                                        "SFA",
                                        "Student Loan"
                                    ].map((option) => option)}
                                    renderInput={(params) => <TextField {...params} placeholder="Select funding body" name="funding_body" error={true || userDataError?.funding_body} />}
                                    onChange={(e, value) => handleUpdate({ target: { name: "funding_body", value: value } })}
                                    sx={{
                                        '.MuiAutocomplete-clearIndicator': {
                                            color: "#5B718F"
                                        }
                                    }}
                                    PaperComponent={({ children }) => (
                                        <Paper style={{ borderRadius: "4px" }}>{children}</Paper>
                                    )}
                                />
                            </div>

                        </Box> */}

                    </Box>

                    <Box>
                        <Grid xs={12} className='p-10 font-600 border-y-2 bg-gray-100 '>
                            <p>Company Details</p>
                        </Grid>

                        <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                            <div className='w-1/3'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>A44 - Employer Identifier / EDRS Number</Typography>
                                <TextField
                                    name="user_name"
                                    // label="Username"
                                    value={userData?.user_name}
                                    size="small"
                                    placeholder='ID'
                                    required
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.user_name}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={usernameValidationMsg} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>

                            <div className='w-1/3'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Business Category</Typography>
                                <Select
                                    name="email"
                                    value={userData?.email}
                                    size="small"
                                    required
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Category"
                                    onChange={handleUpdate}
                                    error={userDataError?.email}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={emailValidationMsg} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </div>

                            <div className='w-1/3'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}># of Employee</Typography>
                                <TextField
                                    name="email"
                                    value={userData?.email}
                                    size="small"
                                    placeholder='number'
                                    required
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.email}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={emailValidationMsg} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>
                        </Box>

                        <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                            <div className='w-1/3'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>External Data Code</Typography>

                                <TextField
                                    name="password"
                                    placeholder="Code"
                                    value={updateData ? "Locker@2024" : userData?.password}
                                    size="small"
                                    type="password"
                                    required={!updateData}
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.password}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={passwordValidation} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>

                            <div className='w-1/3'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Telephone</Typography>
                                <TextField
                                    name="confrimpassword"
                                    placeholder="Phone Number"
                                    value={updateData ? "Locker@2024" : userData?.confrimpassword}
                                    size="small"
                                    type={updateData ? "password" : "text"}
                                    required={!updateData}
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.confrimpassword}
                                />
                            </div>

                            <div className='w-1/3 '>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Website</Typography>
                                <TextField
                                    name="confrimpassword"
                                    placeholder="Link"
                                    value={updateData ? "Locker@2024" : userData?.confrimpassword}
                                    size="small"
                                    type={updateData ? "password" : "text"}
                                    required={!updateData}
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.confrimpassword}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title="Password must be same" placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>

                        </Box>

                        <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                            <div className='w-1/2'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Key Contact</Typography>
                                <TextField
                                    name="user_name"
                                    // label="Username"
                                    value={userData?.user_name}
                                    size="small"
                                    placeholder='Contact'
                                    required
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.user_name}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={usernameValidationMsg} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>

                            <div className='w-1/2'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Email</Typography>
                                <TextField
                                    name="email"
                                    value={userData?.email}
                                    size="small"
                                    placeholder='Email'
                                    required
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.email}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={emailValidationMsg} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>
                        </Box>

                        {/* <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                            <div className='w-1/2'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Employer<sup>*</sup></Typography>
                                <Autocomplete
                                    disableClearable
                                    fullWidth
                                    size="small"
                                    options={[{ id: "1", name: "Jenis Savaliya" }, { id: "2", name: "Mohan Sharma" }]}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params} placeholder="Select employer"
                                        value={userData?.employer_id}
                                        name="employer_id" />}
                                    onChange={(e, value) => handleUpdate({ target: { name: "employer_id", value: value.id } })}
                                    sx={{
                                        '.MuiAutocomplete-clearIndicator': {
                                            color: "#5B718F"
                                        }
                                    }}
                                    PaperComponent={({ children }) => (
                                        <Paper style={{ borderRadius: "4px" }}>{children}</Paper>
                                    )}
                                />
                            </div>

                            <div className='w-1/2'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Mobile</Typography>
                                <TextField
                                    name="mobile"
                                    value={userData?.mobile}
                                    size="small"
                                    placeholder='Enter mobile number'
                                    required
                                    fullWidth
                                    onChange={handleUpdate}
                                    error={userDataError?.mobile}

                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={mobileValidationMsg} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>

                        </Box> */}

                        {/* <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                            <div className='w-1/2'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>National Insurance Number</Typography>

                                <TextField
                                    name="national_ins_no"
                                    placeholder="Enter national insurance number"
                                    value={userData?.national_ins_no}
                                    size="small"
                                    type="text"
                                    fullWidth
                                    onChange={handleUpdate}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={passwordValidation} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>

                            <div className='w-1/2'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Funding Body<sup>*</sup></Typography>
                                <TextField
                                name="funding_body"
                                value={userData?.funding_body}
                                size="small"
                                placeholder='Enter funding details'
                                fullWidth
                                onChange={handleUpdate}
                                error={userDataError?.funding_body}
                            />
                                <Autocomplete
                                    disableClearable
                                    fullWidth
                                    size="small"
                                    value={userData?.funding_body}
                                    options={["Bursary",
                                        "Commercial ",
                                        "Community Learning",
                                        "EFA",
                                        "Employer",
                                        "ESF",
                                        "ESF",
                                        "ESFA",
                                        "Fee Waiver",
                                        "FWDF",
                                        "ITA",
                                        "Levy",
                                        "MA Fully Funded",
                                        "MA-Employer",
                                        "Non-Levy",
                                        "Other",
                                        "SAAS",
                                        "SAAS-Employer",
                                        "SAAS-Self",
                                        "SDS",
                                        "Self",
                                        "SFA",
                                        "Student Loan"
                                    ].map((option) => option)}
                                    renderInput={(params) => <TextField {...params} placeholder="Select funding body" name="funding_body" error={true || userDataError?.funding_body} />}
                                    onChange={(e, value) => handleUpdate({ target: { name: "funding_body", value: value } })}
                                    sx={{
                                        '.MuiAutocomplete-clearIndicator': {
                                            color: "#5B718F"
                                        }
                                    }}
                                    PaperComponent={({ children }) => (
                                        <Paper style={{ borderRadius: "4px" }}>{children}</Paper>
                                    )}
                                />
                            </div>

                        </Box> */}

                    </Box>

                    <Box>
                        <Grid xs={12} className='p-10 font-600 border-y-2 bg-gray-100 '>
                            <p>Business Description / Comments</p>
                        </Grid>

                        <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                            <div className='w-1/2'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Business Description</Typography>
                                <TextField
                                    name="user_name"
                                    // label="Business Description"
                                    value={userData?.user_name}
                                    size="small"
                                    placeholder='Business Description'
                                    fullWidth
                                    multiline
                                    rows={8}
                                    id='outlined-multiline-static'
                                    onChange={handleUpdate}
                                    error={userDataError?.user_name}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={usernameValidationMsg} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>

                            <div className='w-1/2'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Comments</Typography>
                                <TextField
                                    name="email"
                                    value={userData?.email}
                                    size="small"
                                    placeholder='Comments'
                                    required
                                    fullWidth
                                    multiline
                                    rows={8}
                                    id='outlined-multiline-static'
                                    onChange={handleUpdate}
                                    error={userDataError?.email}
                                // InputProps={{
                                //     endAdornment:
                                //         <Tooltip title={emailValidationMsg} placement="bottom" arrow>
                                //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                //         </Tooltip>
                                // }}
                                />
                            </div>
                        </Box>

                    </Box>

                    <Grid>
                        <Grid xs={12} className='p-10 font-600 border-y-2 bg-gray-100 '>
                            <p>Company Details</p>
                        </Grid>

                        <Grid className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                            <div className='w-1/3'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Health and Safety Assessment Date</Typography>
                                <TextField
                                    // name="user_name"
                                    type='date'
                                    // label="Date"
                                // value={userData?.user_name}
                                // onChange={handleUpdate}
                                />
                            </div>

                            <div className='w-1/3'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Health and Safety Assessment renewal Date</Typography>
                                <TextField
                                    // name="user_name"
                                    type='date'
                                    // label="Date"
                                // value={userData?.user_name}
                                // onChange={handleUpdate}
                                />
                            </div>

                            <div className='w-1/3'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Liability Insurance renewal date</Typography>
                                <DatePicker
                                    // name="user_name"
                                    // type='date'
                                    label="Date"
                                // value={userData?.user_name}
                                // onChange={handleUpdate}
                                />
                            </div>
                        </Grid>

                    </Grid>

                    <Box>
                        <Grid xs={12} className='p-10 font-600 border-y-2 bg-gray-100 '>
                            <p>Assesment Date</p>
                        </Grid>

                        <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                            <div className='w-1/3'>
                                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "500" }}>Choose course for courses</Typography>
                            </div>
                        </Box>

                    </Box>

                    <Box style={{ margin: "auto 1rem 1rem auto" }}>
                        {dataUpdatingLoadding ?
                            <LoadingButton />
                            :
                            <>
                                <SecondaryButtonOutlined name="Cancel" onClick={handleClose} style={{ width: "10rem", marginRight: "2rem" }} />
                                <SecondaryButton name={updateData ? "Update" : "Create"} style={{ width: "10rem" }} onClick={updateData ? updateUserHandler : createUserHandler} />
                            </>
                        }
                    </Box>
                </div>
            </Card >
        </div >
    )
}

export default UserDetails