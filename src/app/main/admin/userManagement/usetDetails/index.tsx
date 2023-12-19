import { Box, CircularProgress, IconButton, MenuItem, TextField } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { roles } from 'src/app/contanst';
import { SecondaryButton } from 'src/app/component/Buttons';

const UserDetails = (props) => {

    const { handleClose, handleUpdate, createUserHandler, userData, updateData, updateUserHandler, dataUpdatingLoadding } = props;

    return (
        <div className='h-full flex flex-col'>
            <Box sx={{ position: "sticky", top: "0", backgroundColor: "white", zIndex: "10" }}>
                <IconButton onClick={handleClose} size='small' sx={{ color: "black" }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box>
                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField name="first_name" label="First Name" value={userData?.first_name} size="small" required fullWidth onChange={handleUpdate} />
                    <TextField name="last_name" label="Last Name" value={userData?.last_name} size="small" required fullWidth onChange={handleUpdate} />
                </Box>
                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField name="user_name" label="Username" value={userData?.user_name} size="small" required fullWidth onChange={handleUpdate} />
                    <TextField name="email" label="Email" value={userData?.email} size="small" required fullWidth onChange={handleUpdate} />
                </Box>
                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField name="password" label="Password" value={userData?.password} size="small" required={!updateData} fullWidth onChange={handleUpdate} disabled={updateData} />
                    <TextField name="confrimpassword" label="Confirm password" value={userData?.confrimpassword} size="small" required={!updateData} fullWidth onChange={handleUpdate} disabled={updateData} />
                </Box>

                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField name="sso_id" label="SSO ID" value={userData?.sso_id} size="small" required fullWidth onChange={handleUpdate} />
                    <TextField name="mobile" label="Mobile" value={userData?.mobile} size="small" fullWidth onChange={handleUpdate} />
                </Box>

                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField name="phone" label="Phone" value={userData?.phone} size="small" fullWidth onChange={handleUpdate} />
                    <TextField name="time_zone" label="Timezone" value={userData?.time_zone} size="small" fullWidth onChange={handleUpdate} />
                </Box>

                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField name="role" select label="Role" value={userData?.role} size="small" required fullWidth onChange={handleUpdate}>
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
                    <CircularProgress />
                    :
                    <SecondaryButton name={updateData ? "Update" : "Create"} onClick={updateData ? updateUserHandler : createUserHandler} />
                }
            </Box>
        </div>
    )
}

export default UserDetails