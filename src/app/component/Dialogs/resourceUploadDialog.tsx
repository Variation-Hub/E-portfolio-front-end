import React, { useState } from "react";
import { SecondaryButton, SecondaryButtonOutlined } from "../Buttons";
import { FileUploader } from "react-drag-drop-files";
import { Autocomplete, Box, Paper, TextField, Typography } from "@mui/material";
import { roles } from "src/app/contanst";

const ResourceUploadDialog = (props) => {

  const { handleClose } = props.dialogFn;

  const fileTypes = ["PDF"];
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded border border-gray-300 max-w-md w-full shadow-md">

        <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
          <div className='w-full'>
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Course</Typography>

            <Autocomplete
              
              fullWidth
              size="small"
              // value={userData?.role}
              options={roles.map((option) => option.label)}
              renderInput={(params) => <TextField {...params} placeholder="Select Course" name="role" />}
              // onChange={(e, value) => handleUpdate({ target: { name: "role", value: value } })}
              sx={{
                '.MuiAutocomplete-clearIndicator': {
                  color: "#5B718F"
                }
              }}
              PaperComponent={({ children }) => (
                <Paper style={{ borderRadius:"4px" }}>{children}</Paper>
              )}
            />
          </div>

        </Box>

        <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
          <div className='w-full'>
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Choose resource for course</Typography>

            <FileUploader
              children={
                <div style={{ border: '1px dotted lightgray', padding: '5rem' }}>

                  <div className="flex justify-center mt-8">
                    <img
                      src="assets/images/svgImage/uploadimage.svg"
                      alt="Alert"
                      className="w-36"
                    />
                  </div>
                  <p className="text-center mb-4">
                    Drag and drop your files here or{" "}
                    <a className="text-blue-500">Browse</a>
                  </p>
                  <p className="text-center mb-4">Max 10MB files are allowed</p>
                </div>
              }
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
          </div>

        </Box>

        <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
          <div className="w-2/3">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Minimum GLH<sup>*</sup></Typography>
            <div className="flex gap-12">
              <TextField
                name="Hour"
                placeholder="Enter hour"
                size="small"
                type="number  "
                fullWidth
                className="w-1/2"
              />

              <TextField
                name="Minute"
                placeholder="Enter minute"
                size="small"
                type="number"
                fullWidth
                className="w-1/2"

              />
            </div>
          </div>
          <div className="w-1/3">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>On/off the job<sup>*</sup></Typography>
            <Autocomplete
              
              fullWidth
              size="small"
              // value={userData?.role}
              options={["On", "Off"].map((option) => option)}
              renderInput={(params) => <TextField {...params} placeholder="Select job" name="role" />}
              // onChange={(e, value) => handleUpdate({ target: { name: "role", value: value } })}
              sx={{
                '.MuiAutocomplete-clearIndicator': {
                  color: "#5B718F"
                }
              }}
              PaperComponent={({ children }) => (
                <Paper style={{ borderRadius:"4px" }}>{children}</Paper>
              )}
            />
          </div>

        </Box>

        <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Resource type<sup>*</sup></Typography>
            <Autocomplete
              
              fullWidth
              size="small"
              // value={userData?.role}
              options={["On", "Off"].map((option) => option)}
              renderInput={(params) => <TextField {...params} placeholder="Select type" name="role" />}
              // onChange={(e, value) => handleUpdate({ target: { name: "role", value: value } })}
              sx={{
                '.MuiAutocomplete-clearIndicator': {
                  color: "#5B718F"
                }
              }}
              PaperComponent={({ children }) => (
                <Paper style={{ borderRadius:"4px" }}>{children}</Paper>
              )}
            />
          </div>
        </Box>

        <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Description</Typography>
            <TextField
              name='description'
              size="small"
              placeholder="Type here..."
              fullWidth
              type="text"
            />
          </div>
        </Box>

        <div className="flex justify-end mt-4">
          <SecondaryButtonOutlined
            name="Cancel"
            style={{ width: "10rem", marginRight: "2rem" }}
            onClick={handleClose}
          />
          <SecondaryButton name="Create" style={{ width: "10rem" }} />
        </div>
      </div>
    </>
  );
};

export default ResourceUploadDialog;
