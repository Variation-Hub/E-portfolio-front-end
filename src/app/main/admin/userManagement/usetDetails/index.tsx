import { Box, IconButton, MenuItem, TextField } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { roles } from 'src/app/contanst';
import { SecondaryButton } from 'src/app/component/Buttons';

const UserDetails = (props) => {

    const { handleClose } = props;
    return (
        <div>
            <Box sx={{ position: "sticky", top: "0", backgroundColor: "white", zIndex: "10" }}>
                <IconButton onClick={handleClose} size='small' sx={{ color: "black" }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box>
                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField label="First Name" size="small" required fullWidth />
                    <TextField label="Last Name" size="small" required fullWidth />
                </Box>
                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField label="Username" size="small" required fullWidth />
                    <TextField label="Email" size="small" required fullWidth />
                </Box>
                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField label="Password" size="small" required fullWidth />
                    <TextField label="Confirm password" size="small" required fullWidth />
                </Box>

                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField label="SSO ID" size="small" required fullWidth />
                    <TextField label="Mobile" size="small" fullWidth />
                </Box>

                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField label="Phone" size="small" fullWidth />
                    <TextField label="Timezone" size="small" fullWidth />
                </Box>

                <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
                    <TextField select label="Role" size="small" required fullWidth>
                        {roles.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </Box>
            <Box>
                <SecondaryButton name="Create" />
            </Box>
        </div>
    )
}

export default UserDetails