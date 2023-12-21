import { Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material'
import { styled } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '.MuiDialog-paper': {
        borderRadius: "4px",
        width: "400px",
        height: "200px"
    },
    '.MuiDialogTitle-root': {
        padding: "1rem"
    }
}));

const AlertDialog = (props) => {

    const { open, close, title, content, actionButton, cancelButton } = props
    return (
        <BootstrapDialog
            open={open}
            onClose={close}
            PaperProps={{
                sx: {
                    width: "400px",
                    height: "228px",
                },
            }}
        >
            <DialogTitle id="alert-dialog-title" style={{ color: "red" }}>
                {title}
            </DialogTitle>
            <Divider />
            <DialogContent>
                {content}
            </DialogContent>
            <Divider />
            <DialogActions>
                {cancelButton}
                {actionButton}
            </DialogActions>
        </BootstrapDialog>
    )
}

export default AlertDialog