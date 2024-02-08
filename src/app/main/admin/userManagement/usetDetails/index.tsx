import { Autocomplete, Box, IconButton, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { roles } from 'src/app/contanst';
import { LoadingButton, SecondaryButton, SecondaryButtonOutlined } from 'src/app/component/Buttons';
import { timezones } from 'src/app/contanst/timezoneData';
import { emailValidationMsg, mobileValidationMsg, nameValidationMsg, passwordValidation, usernameValidationMsg } from 'src/app/contanst/regValidation';
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";

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

    return (
        <div className='h-full flex flex-col'>
            <Box>
                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <div>
                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>First Name<sup>*</sup></Typography>
                        <TextField
                            name="first_name"
                            // label="First Name"
                            value={userData?.first_name}
                            size="small"
                            placeholder='Enter first name'
                            required
                            fullWidth
                            onChange={handleUpdate}
                            error={userDataError?.first_name}
                            InputProps={{
                                endAdornment:
                                    <Tooltip title={nameValidationMsg} placement="bottom" arrow>
                                        <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                    </Tooltip>
                            }}
                        />
                    </div>
                    <div>
                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Last Name<sup>*</sup></Typography>
                        <TextField
                            name="last_name"
                            value={userData?.last_name}
                            size="small"
                            placeholder='Enter last name'
                            required
                            fullWidth
                            onChange={handleUpdate}
                            error={userDataError?.last_name}
                            InputProps={{
                                endAdornment:
                                    <Tooltip title={nameValidationMsg} placement="bottom" arrow>
                                        <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                    </Tooltip>
                            }}
                        />
                    </div>
                </Box>
                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <div>
                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>User Name<sup>*</sup></Typography>
                        <TextField
                            name="username"
                            // label="Username"
                            value={userData?.username}
                            size="small"
                            placeholder='Enter username'
                            required
                            fullWidth
                            onChange={handleUpdate}
                            error={userDataError?.username}
                            InputProps={{
                                endAdornment:
                                    <Tooltip title={usernameValidationMsg} placement="bottom" arrow>
                                        <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                    </Tooltip>
                            }}
                        />
                    </div>

                    <div>
                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Email<sup>*</sup></Typography>
                        <TextField
                            name="email"
                            value={userData?.email}
                            size="small"
                            placeholder='Enter email'
                            required
                            fullWidth
                            onChange={handleUpdate}
                            error={userDataError?.email}
                            InputProps={{
                                endAdornment:
                                    <Tooltip title={emailValidationMsg} placement="bottom" arrow>
                                        <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                    </Tooltip>
                            }}
                        />
                    </div>
                </Box>
                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <div>
                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Password<sup>*</sup></Typography>

                        <TextField
                            name="password"
                            placeholder="Enter Password"
                            value={updateData ? "Locker@2024" : userData?.password}
                            size="small"
                            type="password"
                            required={!updateData}
                            fullWidth
                            onChange={handleUpdate}
                            error={userDataError?.password}
                            InputProps={{
                                endAdornment:
                                    <Tooltip title={passwordValidation} placement="bottom" arrow>
                                        <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                    </Tooltip>
                            }}
                        />
                    </div>

                    <div>
                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Confirm Password<sup>*</sup></Typography>
                        <TextField
                            name="confrimpassword"
                            placeholder="Enter confirm password"
                            value={updateData ? "Locker@2024" : userData?.confrimpassword}
                            size="small"
                            type={updateData ? "password" : "text"}
                            required={!updateData}
                            fullWidth
                            onChange={handleUpdate}
                            error={userDataError?.confrimpassword}
                            InputProps={{
                                endAdornment:
                                    <Tooltip title="Password must be same" placement="bottom" arrow>
                                        <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                    </Tooltip>
                            }}
                        />
                    </div>

                </Box>

                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <div>
                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Mobile<sup>*</sup></Typography>
                        <TextField
                            name="mobile"
                            value={userData?.mobile}
                            size="small"
                            placeholder='Enter mobile number'
                            required
                            fullWidth
                            onChange={handleUpdate}
                            error={userDataError?.mobile}
                            InputProps={{
                                endAdornment:
                                    <Tooltip title={mobileValidationMsg} placement="bottom" arrow>
                                        <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                    </Tooltip>
                            }}
                        />
                    </div>
                    <div className='w-1/2'>
                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Time Zone<sup>*</sup></Typography>
                        <Autocomplete
                            freeSolo
                            fullWidth
                            size="small"
                            value={userData?.time_zone}
                            options={timezones.map((option) => option)}
                            renderInput={(params) => <TextField {...params} placeholder="Select timezone" name="time_zone" />}
                            onChange={(e, value) => handleUpdate({ target: { name: "time_zone", value: value } })}
                            sx={{
                                '.MuiAutocomplete-clearIndicator': {
                                    color: "#5B718F"
                                }
                            }}
                        />
                    </div>
                </Box>

                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <div className='w-full'>
                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Role<sup>*</sup></Typography>
                        <TextField
                            name="role"
                            select
                            defaultValue="Learner"
                            value={userData?.role}
                            size="small"
                            required
                            fullWidth
                            onChange={handleUpdate}
                            error={userDataError?.role}>
                            {roles.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
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
    )
}

export default UserDetails