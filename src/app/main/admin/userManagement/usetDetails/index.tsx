import { Autocomplete, Box, IconButton, MenuItem, TextField, Tooltip } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { roles } from 'src/app/contanst';
import { LoadingButton, SecondaryButton } from 'src/app/component/Buttons';
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
            <Box sx={{ position: "sticky", top: "0", backgroundColor: "white", zIndex: "10" }}>
                <IconButton onClick={handleClose} size='small' sx={{ color: "black" }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box>
                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField
                        name="first_name"
                        label="First Name"
                        value={userData?.first_name}
                        size="small"
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

                    <TextField
                        name="last_name"
                        label="Last Name"
                        value={userData?.last_name}
                        size="small" required
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
                </Box>
                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField
                        name="user_name"
                        label="Username"
                        value={userData?.user_name}
                        size="small"
                        required
                        fullWidth
                        onChange={handleUpdate}
                        error={userDataError?.user_name}
                        InputProps={{
                            endAdornment:
                                <Tooltip title={usernameValidationMsg} placement="bottom" arrow>
                                    <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                </Tooltip>
                        }}
                    />

                    <TextField
                        name="email"
                        label="Email"
                        value={userData?.email}
                        size="small"
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
                </Box>
                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField
                        name="password"
                        label="Password"
                        value={updateData ? "Locker@2024" : userData?.password}
                        size="small"
                        type="password"
                        required={!updateData}
                        fullWidth
                        onChange={handleUpdate}
                        disabled={updateData}
                        error={userDataError?.password}
                        InputProps={{
                            endAdornment:
                                <Tooltip title={passwordValidation} placement="bottom" arrow>
                                    <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                </Tooltip>
                        }}
                    />

                    <TextField
                        name="confrimpassword"
                        label="Confirm password"
                        value={updateData ? "Locker@2024" : userData?.confrimpassword}
                        size="small"
                        type={updateData ? "password" : "text"}
                        required={!updateData}
                        fullWidth
                        onChange={handleUpdate}
                        disabled={updateData}
                        error={userDataError?.confrimpassword}
                        InputProps={{
                            endAdornment:
                                <Tooltip title="Password must be same" placement="bottom" arrow>
                                    <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                </Tooltip>
                        }}
                    />
                </Box>

                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField
                        name="sso_id"
                        label="SSO ID"
                        value={userData?.sso_id}
                        size="small"
                        required
                        fullWidth
                        onChange={handleUpdate}
                        error={userDataError?.sso_id}
                        InputProps={{
                            endAdornment:
                                <Tooltip title="Enter a valid ID. It should be at least 3 characters long." placement="bottom" arrow>
                                    <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                </Tooltip>
                        }} />

                    <TextField
                        name="mobile"
                        label="Mobile"
                        value={userData?.mobile}
                        size="small"
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
                </Box>

                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField
                        name="phone"
                        label="Phone"
                        value={userData?.phone}
                        size="small"
                        fullWidth
                        onChange={handleUpdate}
                        error={userDataError?.phone}
                        InputProps={{
                            endAdornment:
                                <Tooltip title={mobileValidationMsg} placement="bottom" arrow>
                                    <HelpOutlinedIcon sx={{ fontSize: "16px", color: "gray", marginLeft: "2px", cursor: "help" }} />
                                </Tooltip>
                        }}
                    />

                    <Autocomplete
                        freeSolo
                        fullWidth
                        size="small"
                        value={userData?.time_zone}
                        options={timezones.map((option) => option)}
                        renderInput={(params) => <TextField {...params} label="Timezone" name="time_zone" />}
                        onChange={(e, value) => handleUpdate({ target: { name: "time_zone", value: value } })}
                        sx={{
                            '.MuiAutocomplete-clearIndicator': {
                                color: "#5B718F"
                            }
                        }}
                    />
                </Box>

                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField
                        name="role" select label="Role" value={userData?.role} size="small" required fullWidth onChange={handleUpdate}
                        error={userDataError?.role}>
                        {roles.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </Box>
            <Box style={{ margin: "auto 1rem 1rem auto" }}>
                {dataUpdatingLoadding ?
                    <LoadingButton />
                    :
                    <SecondaryButton name={updateData ? "Update" : "Create"} onClick={updateData ? updateUserHandler : createUserHandler} />
                }
            </Box>
        </div>
    )
}

export default UserDetails