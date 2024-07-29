import { Box } from "@mui/system";
import React, { useState } from "react";
import {
  LoadingButton,
  SecondaryButton,
  SecondaryButtonOutlined,
} from "../Buttons";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { roles } from "src/app/contanst";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import { useNavigate } from "react-router-dom";
import { createAssignmentAPI, selectAssignment, updateAssignmentAPI } from "app/store/assignment";
import { useDispatch } from "react-redux";

const UploadedEvidenceFile = (props) => {
  const { setFormData, formData, handleChange, handleCheckboxChange, edit = "Save" } = props;

  const { handleClose } = props.dialogFn || {};
  const dispatch: any = useDispatch();
  const { singleData, dataUpdatingLoadding } = useSelector(selectAssignment)
  const navigate = useNavigate();

  console.log(formData)
  const handleSubmit = async () => {
    try {
      let response;
      let id = singleData.assignment_id;
      response = await dispatch(updateAssignmentAPI(id, formData));
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      handleClose();
    }

  };

  const user = useSelector(selectUser);

  return (
    <div>
      <div>
        <Box className="m-12 flex flex-col justify-between gap-12">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Title
            </Typography>
            <TextField
              name="title"
              size="small"
              placeholder={"Enter Title"}
              fullWidth
              value={formData?.title}
              onChange={handleChange}
              disabled={edit === "view"}
            />
          </div>

          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Description
            </Typography>
            <TextField
              name="description"
              size="small"
              placeholder="Enter description"
              fullWidth
              multiline
              rows={5}
              value={formData?.description}
              onChange={handleChange}
              disabled={edit === "view"}
            />
          </div>

          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Trainer Feedback
            </Typography>
            <TextField
              name="trainer_feedback"
              size="small"
              placeholder="Enter your feedback"
              fullWidth
              multiline
              rows={5}
              value={formData?.trainer_feedback}
              onChange={handleChange}
              disabled={user.data.role !== "Trainer" || edit === "view"}
              style={user.data.role !== "Trainer" ? { backgroundColor: "whitesmoke" } : {}}
            />
          </div>

          {/* <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Uploaded External Feedback
            </Typography>
            <TextField
              name="uploaded_external_feedback"
              size="small"
              placeholder={"Trainer file 4.2.3(13).docx"}
              fullWidth
              value={formData.uploaded_external_feedback}
              onChange={handleChange}
            />
          </div> */}

          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Learner Comments
            </Typography>
            <TextField
              name="learner_comments"
              size="small"
              placeholder="lorem ipsum is just dummy context...."
              fullWidth
              multiline
              rows={5}
              value={formData?.learner_comments}
              onChange={handleChange}
              disabled={user.data.role !== "Learner" || edit === "view"}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Points of Improvement
            </Typography>
            <TextField
              name="points_of_improvement"
              size="small"
              placeholder="lorem ipsum is just dummy context...."
              fullWidth
              multiline
              rows={5}
              value={formData?.points_of_improvement}
              onChange={handleChange}
              disabled={user.data.role !== "Trainer" || edit === "view"}
              style={user.data.role !== "Trainer" ? { backgroundColor: "whitesmoke" } : {}}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Assessment Method
            </Typography>
            <Select
              name="assessment_method"
              value={formData?.assessment_method}
              onChange={handleChange}
              fullWidth
              size="small"
              displayEmpty
              placeholder="Select"
              disabled={user.data.role !== "Trainer" || edit === "view"}
              style={user.data.role !== "Trainer" ? { backgroundColor: "whitesmoke" } : {}}
            >
              <MenuItem value={"WO"}>
                WO
              </MenuItem>
              <MenuItem
                value={"WP"}
              >
                WP
              </MenuItem>
              <MenuItem value={"PW"}>
                PW
              </MenuItem>
              <MenuItem value={"VI"}>VI</MenuItem>
              <MenuItem value={"LB"}>
                LB
              </MenuItem>
              <MenuItem value={"PD"}>
                PD
              </MenuItem>
              <MenuItem value={"PT"}>
                PT
              </MenuItem>
              <MenuItem value={"TE"}>
                TE
              </MenuItem>
              <MenuItem value={"RJ"}>
                RJ
              </MenuItem>
              <MenuItem value={"OT"}>OT</MenuItem>
              <MenuItem value={"RPL"}>
                RPL
              </MenuItem>
            </Select>
            <FormGroup>
              {['WO', 'WP', 'PW', 'VI', 'LB', 'PD', 'PT', 'TE', 'RJ', 'OT', 'RPL'].map((method) => (
                <FormControlLabel
                  key={method}
                  control={
                    <Checkbox
                      checked={formData?.assessment_method?.includes(method) || false}
                      onChange={(e) => handleChange(e, method)}
                      name="assessment_method"
                      disabled={user.data.role !== "Trainer" || edit === "view"}
                    />
                  }
                  label={method}
                />
              ))}
            </FormGroup>
          </div>
        </Box>

        <Box className="m-12 flex flex-col gap-12 sm:flex-row">
          <div className="w-full ">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Session
            </Typography>
            <Grid className='w-full flex gap-10'>
              <Grid className='w-full '>
                <TextField
                  name="startDate"
                  // value={sessionData.startDate}
                  size="small"
                  type='datetime-local'
                  placeholder='YYYY-MM-DDTHH:MM'
                  required
                  fullWidth
                  onChange={handleChange}
                  disabled={user.data.role !== "Trainer" || edit === "view"}
                  style={user.data.role !== "Trainer" ? { backgroundColor: "whitesmoke" } : {}}
                />
              </Grid>
              <Grid className='w-full flex gap-10'>
                <TextField
                  disabled={user.data.role !== "Trainer" || edit === "view"}
                  style={user.data.role !== "Trainer" ? { backgroundColor: "whitesmoke" } : {}}
                  placeholder='Hours'
                  name="hours"
                  size="small"
                  required
                  type="number"
                  fullWidth
                  value={(formData?.session?.split(":")[0])}
                  onChange={(e) => {
                    const value = Number(e.target.value);

                    if (value < 0 || value > 23) {
                      return
                    }

                    setFormData((prevState: any) => ({
                      ...prevState,
                      session: `${value}:${formData?.session?.split(':')[1]}`
                    }));
                  }}
                />
                <TextField
                  disabled={user.data.role !== "Trainer" || edit === "view"}
                  style={user.data.role !== "Trainer" ? { backgroundColor: "whitesmoke" } : {}}
                  placeholder='Minutes'
                  name="minutes"
                  required
                  size="small"
                  type="number"
                  fullWidth
                  value={(formData?.session?.split(':')[1])}
                  onChange={(e) => {
                    const value = Number(e.target.value);

                    if (value < 0 || value > 59) {
                      return
                    }

                    setFormData((prevState: any) => ({
                      ...prevState,
                      session: `${formData?.session?.split(':')[0]}:${value}`
                    }));
                  }}
                />
              </Grid>
            </Grid>
          </div>

          <div className="w-full ">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Grade
            </Typography>
            <TextField
              name="grade"
              size="small"
              placeholder="Enter Grade"
              fullWidth
              value={formData?.grade}
              onChange={handleChange}
              disabled={user.data.role !== "Trainer" || edit === "view"}
              style={user.data.role !== "Trainer" ? { backgroundColor: "whitesmoke" } : {}}
            />
          </div>
        </Box>
        <Box className="m-12 flex flex-col justify-between gap-12">
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData?.declaration}
                  onChange={handleCheckboxChange}
                  name="declaration"
                  color="primary"
                />
              }
              label={
                <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
                  Please tick to confirm.
                  <br /> I declare that all material in this submission is my
                  own work except where there is clear acknowledgement and
                  appropriate reference to the work of others.
                </Typography>
              }
              disabled={edit === "view"}
            />
          </div>
        </Box>
      </div>
      <div className="flex justify-end mr-24 mb-20">
        {dataUpdatingLoadding ?
          <LoadingButton />
          :
          <>
            {edit === "view" ?
              <SecondaryButtonOutlined name="Cancel" className="mr-12" onClick={handleClose} />
              :
              <SecondaryButtonOutlined name="Cancel" className="mr-12" onClick={handleClose} />
            }
            {edit !== "view" &&
              <SecondaryButton name={"Update"} disable={!formData?.declaration || !formData?.title || !formData?.description} onClick={handleSubmit} />
            }
          </>
        }
      </div>
    </div>
  );
};

export default UploadedEvidenceFile;
