import { Button } from '@mui/material'

export const SecondaryButton = (props) => {
    const {name} = props;
    return (
        <Button
            variant="contained"
            color="secondary"
            className=" w-full mt-16"
            aria-label="Sign in"
            type="submit"
            size="large"
            sx={{
                '&:hover':{
                    backgroundColor: "#6D81A3"
                }
            }}
        >
           {name}
        </Button>
    )
}

