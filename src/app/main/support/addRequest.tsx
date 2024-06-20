import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const AddRequest = () => {
  return (
    <>
      <Box className="flex flex-col justify-between gap-12 p-0">
        <div>
          <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
            Title
          </Typography>
          <TextField
            name="title"
            size="small"
            placeholder="Add your title"
            fullWidth
            multiline
            // value={}
            // onChange={handleChange}
          />
        </div>
        <div>
          <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
            Description
          </Typography>
          <TextField
            name="description"
            size="small"
            placeholder="Add your description"
            fullWidth
            multiline
            rows={3}
            // value={}
            // onChange={handleChange}
          />
        </div>
      </Box>
    </>
  );
};

export default AddRequest;
