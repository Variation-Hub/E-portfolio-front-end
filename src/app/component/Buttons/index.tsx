import { Button } from '@mui/material'

export const SecondaryButton = (props) => {
    const {name, disable=false, onClick=()=>{}} = props;
    return (
        <Button
            variant="contained"
            color="secondary"
            className=" w-full"
            aria-label="Sign in"
            type="submit"
            size="small"
            disabled={disable}
            sx={{
                borderRadius: "4px",
                '&:hover':{
                    backgroundColor: "#6D81A3"
                }
            }}
            onClick={onClick}
        >
           {name}
        </Button>
    )
}

