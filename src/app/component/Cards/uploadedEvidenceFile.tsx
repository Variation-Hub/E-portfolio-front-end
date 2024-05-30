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
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

const UploadedEvidenceFile = () => {
  const [formData, setFormData] = useState({
    uploaded_evidence_file: "",
    evidence_uploaded_by: "",
    name: "",
    description: "",
    trainer_feedback: "",
    uploaded_external_feedback: "",
    smart_annotator_feedback: "",
    learner_comments: "",
    points_of_improvement: "",
    assessment_method: "",
    session: "",
    grade: "",
    declaration: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/uploadedFiles",
        formData
      );
      console.log("Upload successful!", response.data);
      // You can add any further actions after successful upload here
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div>
      <div>
        <Box className="m-12 flex flex-col justify-between gap-12">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Uploaded Evidence File
            </Typography>
            <TextField
              name="uploaded_evidence_file"
              size="small"
              placeholder={"Trainer file 4.2.3(13).docx"}
              fullWidth
              value={formData.uploaded_evidence_file}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Evidence Uploaded By
            </Typography>
            <TextField
              name="evidence_uploaded_by"
              size="small"
              placeholder={"Elaine buttler on 14-03-2023 "}
              fullWidth
              value={formData.evidence_uploaded_by}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Name
            </Typography>
            <TextField
              name="name"
              size="small"
              placeholder={"Trainer file 4.2.3(13).docx"}
              fullWidth
              value={formData.name}
              onChange={handleChange}
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
              value={formData.description}
              onChange={handleChange}
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
              value={formData.trainer_feedback}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
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
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Smart Annotator Feedback
            </Typography>
            <TextField
              name="smart_annotator_feedback"
              size="small"
              placeholder="Smart Annotator Feedback"
              fullWidth
              value={formData.smart_annotator_feedback}
              onChange={handleChange}
            />
          </div>
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
              value={formData.learner_comments}
              onChange={handleChange}
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
              value={formData.points_of_improvement}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Assessment Method
            </Typography>
            <Select
              name="assessment_method"
              value={formData.assessment_method}
              onChange={handleChange}
              fullWidth
              size="small"
              displayEmpty 
              placeholder="Select"
            >
              <MenuItem value={"Workplace Observation(WO)"}>
                Workplace Observation(WO)
              </MenuItem>
              <MenuItem
                value={"Workplace Projects/Projects away from work(WP)"}
              >
                Workplace Projects/Projects away from work(WP)
              </MenuItem>
              <MenuItem value={"Portfolio of Work(PW)"}>
                Portfolio of Work(PW)
              </MenuItem>
              <MenuItem value={"Viva(VI)"}>Viva(VI)</MenuItem>
              <MenuItem value={"Log Book/Assignment"}>
                Log Book/Assignment
              </MenuItem>
              <MenuItem value={"Professional Discussions(PD)"}>
                Professional Discussions(PD)
              </MenuItem>
              <MenuItem value={"Practical Test(PT)"}>
                Practical Test(PT)
              </MenuItem>
              <MenuItem value={"Test/Examinations(TE)"}>
                Test/Examinations(TE)
              </MenuItem>
              <MenuItem value={"Reflective Journal(RJ)"}>
                Reflective Journal(RJ)
              </MenuItem>
              <MenuItem value={"Other(OT)"}>Other(OT)</MenuItem>
              <MenuItem value={"Recognized Prior Learning"}>
                Recognized Prior Learning
              </MenuItem>
            </Select>
          </div>
          {/* <div>
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Smart Annotator Feedback
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  //   checked={}
                  //   onChange={}
                  color="primary"
                />
              }
              label="Yes"
            />
            <FormControlLabel
              control={
                <Checkbox
                  //   checked={}
                  //   onChange={}
                  color="primary"
                />
              }
              label="No"
            />
          </div> */}
        </Box>

        <Box className="m-12 flex flex-col gap-12 sm:flex-row">
          <div className="w-full ">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Session
            </Typography>
            <Select
              name="session"
              placeholder="Select"
              //   value={}
              //   onChange={}
              fullWidth
              size="small"
            >
              <MenuItem value={"Spring"}>Spring</MenuItem>
              <MenuItem value={"Summer"}>Summer</MenuItem>
              <MenuItem value={"Fall"}>Fall</MenuItem>
              <MenuItem value={"Winter"}>Winter</MenuItem>
            </Select>
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
              value={formData.grade}
              onChange={handleChange}
            />
          </div>
        </Box>
        <Box className="m-12 flex flex-col justify-between gap-12">
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.declaration}
                  onChange={handleCheckboxChange}
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
            />
          </div>
        </Box>
      </div>
      <div className="flex justify-end mr-24">
        <SecondaryButtonOutlined name="Cancel" className="mr-12" />
        <SecondaryButton name="Save" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default UploadedEvidenceFile;
