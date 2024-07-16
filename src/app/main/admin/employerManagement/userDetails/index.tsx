import {
  Box,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  AdminRedirect,
  EmployerRedirect,
  fundingBodyData,
  roles,
} from "src/app/contanst";
import {
  LoadingButton,
  SecondaryButton,
  SecondaryButtonOutlined,
} from "src/app/component/Buttons";
import { timezones } from "src/app/contanst/timezoneData";
import {
  emailValidationMsg,
  mobileValidationMsg,
  nameValidationMsg,
  passwordValidation,
  usernameValidationMsg,
} from "src/app/contanst/regValidation";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { DatePicker } from "@mui/x-date-pickers";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import Breadcrumb from "src/app/component/Breadcrumbs";
import Style from "./style.module.css";

const UserDetails = (props) => {
  const [companyData, setCompanyData] = useState({
    company_name: "",
    mis_employer_id: "",
    business_department: "",
    business_location: "",
    branch_code: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    postal_code: "",
  });

  const handleDataUpdate = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [detailsData, setCompanyDetailsData] = useState({
    employer_id: "",
    business_category: "",
    Employee_no: "",
    external_code: "",
    telephone: "",
    website: "",
    contact: "",
    email: "",
  });

  const handleDetailsUpdate = (e) => {
    const { name, value } = e.target;
    setCompanyDetailsData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [descriptionData, setDescriptionData] = useState({
    business_description: "",
    comments: "",
  });

  const handleDescriptionUpdate = (e) => {
    const { name, value } = e.target;
    setDescriptionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [date, setDate] = useState({
    assessment_date: "",
    renewal_date: "",
    insurance_date: "",
  });

  const handleDateUpdate = (e) => {
    const { name, value } = e.target;
    setDate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const {
    handleClose,
    userData,
    updateData,
    updateUserHandler,
    dataUpdatingLoadding,
    userDataError,
  } = props;

  const createUserHandler = () => {
    const createUser =
      Object.values(companyData).find((data) => data === "") === undefined &&
      Object.values(detailsData).find((data) => data === "") === undefined &&
      Object.values(descriptionData).find((data) => data === "") ===
        undefined &&
      Object.values(date).find((data) => data === "") === undefined;

    console.log("Company Data: ", companyData);
    console.log("Company Details Data: ", detailsData);
    console.log("Description Data: ", descriptionData);
    console.log("Date Data: ", date);

    return createUser;
  };

  const fileTypes = ["PDF"];
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
    console.log("File : ", file);
  };

  return (
    <div>
      <Breadcrumb
        linkData={[AdminRedirect, EmployerRedirect]}
        currPage="Create Employer"
      />
      <div className="mb-20 mx-20">
        <Card className="rounded-6 items-center " variant="outlined">
          <div className="h-full flex flex-col">
            <Box>
              <Grid xs={12} className="p-10 font-600 border-b-2 bg-gray-100">
                <p>Company</p>
              </Grid>
              <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                <div className="w-1/2">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Company Name
                  </Typography>
                  <TextField
                    name="company_name"
                    // label="Username"
                    value={companyData.company_name}
                    size="small"
                    placeholder="Company name"
                    required
                    fullWidth
                    onChange={handleDataUpdate}
                    // error={userDataError?.user_name}
                    // InputProps={{
                    //     endAdornment:
                    //         <Tooltip title={usernameValidationMsg} placement="bottom" arrow>
                    //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                    //         </Tooltip>
                    // }}
                  />
                </div>

                <div className="w-1/2">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    MIS Employer ID
                  </Typography>
                  <TextField
                    name="mis_employer_id"
                    value={companyData.mis_employer_id}
                    size="small"
                    placeholder="Enter ID"
                    required
                    fullWidth
                    onChange={handleDataUpdate}
                    // error={userDataError?.email}
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
                <div className="w-1/3">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Business Department
                  </Typography>

                  <TextField
                    name="business_department"
                    placeholder="Business Department"
                    value={companyData.business_department}
                    size="small"
                    required
                    fullWidth
                    onChange={handleDataUpdate}
                    // error={userDataError?.password}
                    // InputProps={{
                    //     endAdornment:
                    //         <Tooltip title={passwordValidation} placement="bottom" arrow>
                    //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                    //         </Tooltip>
                    // }}
                  />
                </div>

                <div className="w-1/3">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Business Location
                  </Typography>
                  <TextField
                    name="business_location"
                    placeholder="Business Location"
                    value={companyData.business_location}
                    size="small"
                    required
                    fullWidth
                    onChange={handleDataUpdate}
                    // error={userDataError?.confrimpassword}
                  />
                </div>

                <div className="w-1/3 ">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Branch Code
                  </Typography>
                  <TextField
                    name="branch_code"
                    placeholder="Branch Code"
                    value={companyData.branch_code}
                    size="small"
                    required
                    fullWidth
                    onChange={handleDataUpdate}
                    // error={userDataError?.confrimpassword}
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
                <div className="w-1/2">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Address 1
                  </Typography>
                  <TextField
                    name="address1"
                    // label="Username"
                    value={companyData.address1}
                    size="small"
                    placeholder="Address"
                    required
                    fullWidth
                    onChange={handleDataUpdate}
                    // error={userDataError?.user_name}
                    // InputProps={{
                    //     endAdornment:
                    //         <Tooltip title={usernameValidationMsg} placement="bottom" arrow>
                    //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                    //         </Tooltip>
                    // }}
                  />
                </div>

                <div className="w-1/2">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Address 2
                  </Typography>
                  <TextField
                    name="address2"
                    value={companyData.address2}
                    size="small"
                    placeholder="Address"
                    required
                    fullWidth
                    onChange={handleDataUpdate}
                    // error={userDataError?.email}
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
                <div className="w-1/3">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Town/City
                  </Typography>

                  <TextField
                    name="city"
                    placeholder="City"
                    value={companyData.city}
                    size="small"
                    required
                    fullWidth
                    onChange={handleDataUpdate}
                    // error={userDataError?.password}
                    // InputProps={{
                    //     endAdornment:
                    //         <Tooltip title={passwordValidation} placement="bottom" arrow>
                    //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                    //         </Tooltip>
                    // }}
                  />
                </div>

                <div className="w-1/3">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Country
                  </Typography>
                  <TextField
                    name="country"
                    placeholder="Country"
                    value={companyData.country}
                    size="small"
                    required
                    fullWidth
                    onChange={handleDataUpdate}
                    // error={userDataError?.confrimpassword}
                  />
                </div>

                <div className="w-1/3 ">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Postal Code
                  </Typography>
                  <TextField
                    name="postal_code"
                    placeholder="Postal Code"
                    value={companyData.postal_code}
                    size="small"
                    required
                    fullWidth
                    onChange={handleDataUpdate}
                    // error={userDataError?.confrimpassword}
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
              <Grid xs={12} className="p-10 font-600 border-y-2 bg-gray-100 ">
                <p>Company Details</p>
              </Grid>

              <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                <div className="w-1/3">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    A44 - Employer Identifier / EDRS Number
                  </Typography>
                  <TextField
                    name="employer_id"
                    // label="Username"
                    value={detailsData.employer_id}
                    size="small"
                    placeholder="ID"
                    required
                    fullWidth
                    onChange={handleDetailsUpdate}
                    // error={userDataError?.user_name}
                    // InputProps={{
                    //     endAdornment:
                    //         <Tooltip title={usernameValidationMsg} placement="bottom" arrow>
                    //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                    //         </Tooltip>
                    // }}
                  />
                </div>

                <div className="w-1/3">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Business Category
                  </Typography>
                  <Select
                    name="business_category"
                    value={detailsData.business_category}
                    size="small"
                    required
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Category"
                    onChange={handleDetailsUpdate}
                    // error={userDataError?.email}
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

                <div className="w-1/3">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    # of Employee
                  </Typography>
                  <TextField
                    name="Employee_no"
                    value={detailsData.Employee_no}
                    size="small"
                    placeholder="number"
                    required
                    fullWidth
                    onChange={handleDetailsUpdate}
                    // error={userDataError?.email}
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
                <div className="w-1/3">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    External Data Code
                  </Typography>

                  <TextField
                    name="external_code"
                    placeholder="Code"
                    value={detailsData.external_code}
                    size="small"
                    required
                    fullWidth
                    onChange={handleDetailsUpdate}
                    // error={userDataError?.password}
                    // InputProps={{
                    //     endAdornment:
                    //         <Tooltip title={passwordValidation} placement="bottom" arrow>
                    //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                    //         </Tooltip>
                    // }}
                  />
                </div>

                <div className="w-1/3">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Telephone
                  </Typography>
                  <TextField
                    name="telephone"
                    placeholder="Phone Number"
                    value={detailsData.telephone}
                    size="small"
                    required
                    fullWidth
                    onChange={handleDetailsUpdate}
                    // error={userDataError?.confrimpassword}
                  />
                </div>

                <div className="w-1/3 ">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Website
                  </Typography>
                  <TextField
                    name="website"
                    placeholder="Link"
                    value={detailsData.website}
                    size="small"
                    required
                    fullWidth
                    onChange={handleDetailsUpdate}
                    // error={userDataError?.confrimpassword}
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
                <div className="w-1/2">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Key Contact
                  </Typography>
                  <TextField
                    name="contact"
                    // label="Username"
                    value={detailsData.contact}
                    size="small"
                    placeholder="Contact"
                    required
                    fullWidth
                    onChange={handleDetailsUpdate}
                    // error={userDataError?.user_name}
                    // InputProps={{
                    //     endAdornment:
                    //         <Tooltip title={usernameValidationMsg} placement="bottom" arrow>
                    //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                    //         </Tooltip>
                    // }}
                  />
                </div>

                <div className="w-1/2">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Email
                  </Typography>
                  <TextField
                    name="email"
                    value={detailsData.email}
                    size="small"
                    placeholder="Email"
                    required
                    fullWidth
                    onChange={handleDetailsUpdate}
                    // error={userDataError?.email}
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
              <Grid xs={12} className="p-10 font-600 border-y-2 bg-gray-100 ">
                <p>Business Description / Comments</p>
              </Grid>

              <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                <div className="w-1/2">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Business Description
                  </Typography>
                  <TextField
                    name="business_description"
                    // label="Business Description"
                    value={descriptionData.business_description}
                    size="small"
                    placeholder="Business Description"
                    fullWidth
                    multiline
                    rows={8}
                    id="outlined-multiline-static"
                    onChange={handleDescriptionUpdate}
                    // error={userDataError?.user_name}
                    // InputProps={{
                    //     endAdornment:
                    //         <Tooltip title={usernameValidationMsg} placement="bottom" arrow>
                    //             <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                    //         </Tooltip>
                    // }}
                  />
                </div>

                <div className="w-1/2">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Comments
                  </Typography>
                  <TextField
                    name="comments"
                    value={descriptionData.comments}
                    size="small"
                    placeholder="Comments"
                    required
                    fullWidth
                    multiline
                    rows={8}
                    id="outlined-multiline-static"
                    onChange={handleDescriptionUpdate}
                    // error={userDataError?.email}
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
              <Grid xs={12} className="p-10 font-600 border-y-2 bg-gray-100 ">
                <p>Company Details</p>
              </Grid>

              <Grid className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                <div className="w-1/3">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Health and Safety Assessment Date
                  </Typography>
                  <TextField
                    name="assessment_date"
                    type="date"
                    value={date.assessment_date}
                    onChange={handleDateUpdate}
                  />
                </div>

                <div className="w-1/3">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Health and Safety Assessment renewal Date
                  </Typography>
                  <TextField
                    name="renewal_date"
                    type="date"
                    value={date.renewal_date}
                    onChange={handleDateUpdate}
                  />
                </div>

                <div className="w-1/3">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Liability Insurance renewal date
                  </Typography>
                  <TextField
                    name="insurance_date"
                    type="date"
                    value={date.insurance_date}
                    onChange={handleDateUpdate}
                  />
                </div>
              </Grid>
            </Grid>

            <Box>
              <Grid xs={12} className="p-10 font-600 border-y-2 bg-gray-100 ">
                <p>Assesment Date</p>
              </Grid>

              <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                <div className="w-full">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                    className={Style.name}
                  >
                    Choose resource for course
                  </Typography>

                  <FileUploader
                    children={
                      <div
                        style={{
                          border: "1px dotted lightgray",
                          padding: "5rem",
                          cursor: "pointer",
                        }}
                      >
                        <div className="flex justify-center mt-8">
                          <img
                            src="assets/images/svgImage/uploadimage.svg"
                            alt="Alert"
                            className="w-64 pb-8 "
                          />
                        </div>
                        {file ? (
                          <p className="text-center mb-4">{file.name}</p>
                        ) : (
                          <>
                            <p className="text-center mb-4">
                              Drag and drop your files here or{" "}
                              <a className="text-blue-500 font-500 ">Browse</a>
                            </p>
                            <p className="text-center mb-4">
                              Max 10MB files are allowed
                            </p>
                          </>
                        )}
                      </div>
                    }
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                  />
                </div>
              </Box>
            </Box>

            <Box style={{ margin: "auto 1rem 1rem auto" }}>
              {dataUpdatingLoadding ? (
                <LoadingButton />
              ) : (
                <>
                  <SecondaryButtonOutlined
                    name="Cancel"
                    onClick={handleClose}
                    style={{ width: "10rem", marginRight: "2rem" }}
                  />
                  <SecondaryButton
                    name={updateData ? "Update" : "Save"}
                    style={{ width: "10rem" }}
                    disable={!createUserHandler()}
                  />
                  {/* <SecondaryButton name={updateData ? "Update" : "Save"} style={{ width: "10rem" }} onClick={updateData ? updateUserHandler : createUserHandler} /> */}
                </>
              )}
            </Box>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserDetails;
