import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Button,
  Chip,
  List,
  ListItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Planning from "./planning";
import Activity from "./activity";
import Evaluation from "./evaluation";
import Reflection from "./reflection";
import {
  LoadingButton,
  SecondaryButton,
  SecondaryButtonOutlined,
} from "src/app/component/Buttons";
import { createActivityAPI, createCpdPlanningAPI, createEvaluationAPI, createReflectionAPI, selectCpdPlanning, updateActivityAPI, updateCpdPlanningAPI, updateEvaluationAPI, updateReflectionsAPI, uploadImages } from "app/store/cpdPlanning";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FileUploader } from "react-drag-drop-files";
import FileCopyIcon from '@mui/icons-material/FileCopy';

// Separate components for dialog content
const AddPlanDialogContent = ({ props, formData, handleChange, cpdId, minEndDate }) => {

  const { edit = "Save" } = props;

  const Year = new Date().getFullYear();

  const startYear = `${Year - 1}-${String(Year).slice(-2)}`;
  const currentYear = `${Year}-${String(Year + 1).slice(-2)}`;
  const endYear = `${Year + 1}-${String(Year + 2).slice(-2)}`;

  const years = [startYear, currentYear, endYear];

  const formatDate = (date) => {
    if (!date) return ''; // Return empty string if date is empty
    const formattedDate = date.substr(0, 10);
    return formattedDate;
  };

  return (
    <>
      <div>
        <Box className="flex flex-col gap-12 sm:flex-row">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Year
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                labelId="year-select-label"
                id="year-select"
                name="year"
                value={formData?.year}
                onChange={handleChange}
                disabled={edit === "view"}
              >
                {years?.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Start Date
            </Typography>
            <TextField
              name="start_date"
              size="small"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={formatDate(formData?.start_date)}
              onChange={handleChange}
              disabled={edit === "view"}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              End Date
            </Typography>
            <TextField
              name="end_date"
              size="small"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: { min: minEndDate },
              }}
              value={formatDate(formData?.end_date)}
              onChange={handleChange}
              disabled={edit === "view"}
            />
          </div>
        </Box>
        <Box className="mt-12 flex flex-col justify-between gap-12">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              What is your CPD plan?
            </Typography>
            <TextField
              name="cpd_plan"
              size="small"
              placeholder="Enter your CPD Plan..."
              fullWidth
              multiline
              rows={5}
              value={formData?.cpd_plan}
              onChange={handleChange}
              disabled={edit === "view"}
            />
          </div>
          <div className="w-full flex flex-col space-y-4">
            <Typography sx={{ fontSize: "0.9vw", marginRight: "0.5rem" }}>
              Impact
            </Typography>
            <div
              className="border-2"
              style={{
                padding: "1rem",
                border: "1px solid #E4E3E3",
                borderRadius: "4px",
              }}
            >
              {[
                { label: "On you:-", name: "impact_on_you", value: formData.impact_on_you },
                {
                  label: "Colleagues:-",
                  name: "impact_on_colleagues",
                  value: formData?.impact_on_colleagues,
                },
                {
                  label: "Managers:-",
                  name: "impact_on_managers",
                  value: formData.impact_on_managers,
                },
                {
                  label: "Organization:-",
                  name: "impact_on_organisation",
                  value: formData.impact_on_organisation,
                },
              ]?.map((group) => (
                <div key={group.name} className="flex items-center">
                  <Typography
                    sx={{
                      fontSize: "0.9vw",
                      marginRight: "0.1rem",
                      minWidth: "10rem",
                    }}
                  >
                    {group.label}
                  </Typography>
                  <div className="flex space-x-16 m-2">
                    {[1, 2, 3, 4, 5]?.map((value) => (
                      <label
                        key={`${group.name}-${value}`}
                        className="flex items-center"
                      >
                        <input
                          type="radio"
                          name={group.name}
                          value={value}
                          checked={group.value == String(value)}
                          onChange={handleChange}
                          className="mr-1"
                          disabled={edit === "view"}
                        />
                        {value}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};

const AddNewDialogContent = ({ props, formData, handleChangeYear, setActivityData, activityData }) => {

  const { edit = "Save" } = props;

  const data = useSelector(selectCpdPlanning);

  const currentYear = new Date().getFullYear();

  const years = [
    `${currentYear - 1}-${currentYear.toString().slice(-2)}`,
    `${currentYear}-${(currentYear + 1).toString().slice(-2)}`,
    `${currentYear + 1}-${(currentYear + 2).toString().slice(-2)}`,
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setActivityData((prev) => ({
      ...prev,
      [name]: value,
    }))
    console.log(activityData.files.map(file => file.url));
  }

  const handleTimeTakeChange = (e) => {
    const { name, value } = e.target;
    setActivityData((prev) => ({
      ...prev,
      timeTake: {
        ...prev.timeTake,
        [name]: parseInt(value)
      }
    }))
  }

  const formatDate = (date) => {
    if (!date) return ''; // Return empty string if date is empty
    const formattedDate = date.substr(0, 10);
    return formattedDate;
  };

  const fileTypes = ["PDF"];
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const dispatch: any = useDispatch();

  const handleUploadButtonClick = async () => {
    setUploadedFiles(files);
    const data = await dispatch(uploadImages(files));


    setActivityData(prevData => ({
      ...prevData,
      files: [...prevData.files, ...data.data]
    }));

  };

  const handleDelete = (fileToDelete) => () => {

    setActivityData(prevData => ({
      ...prevData,
      files: prevData.files.filter(file => file !== fileToDelete)
    }));
  };

  return (
    <>
      <div>
        <Box className="flex flex-col justify-between gap-12">
          <div className="flex flex-row justify-between gap-12 w-full">
            <div className="w-full">
              <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
                Year
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  name="year"
                  value={formData.year}
                  // onChange={handleChangeYear}
                  onChange={handleChangeYear}
                  disabled={edit === "view"}
                >
                  {years?.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="w-full">
              <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
                Date
              </Typography>
              <TextField
                name="date"
                size="small"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={formatDate(activityData.date)}
                onChange={handleChange}
                disabled={edit === "view"}
              />
            </div>
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Learning Objective
            </Typography>
            <TextField
              name="learning_objective"
              size="small"
              placeholder="Lorem ipsum is just dummy context....."
              fullWidth
              multiline
              rows={3}
              value={activityData.learning_objective}
              onChange={handleChange}
              disabled={edit === "view"}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Activity
            </Typography>
            <TextField
              name="activity"
              size="small"
              placeholder="Lorem ipsum is just dummy context....."
              fullWidth
              multiline
              rows={3}
              value={activityData.activity}
              onChange={handleChange}
              disabled={edit === "view"}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Who should support you
            </Typography>
            <TextField
              name="support_you"
              size="small"
              placeholder="Lorem ipsum is just dummy context....."
              fullWidth
              multiline
              rows={3}
              value={activityData.support_you}
              onChange={handleChange}
              disabled={edit === "view"}
            />
          </div>
          <div>
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              How long did it take
            </Typography>
            <Box className="flex justify-between gap-12 sm:flex-row">
              <TextField
                label="day"
                name="day"
                size="small"
                type="number"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={activityData?.timeTake?.day}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (value < 0 || value > 365) {
                    return
                  }
                  handleTimeTakeChange(e)
                }}
                disabled={edit === "view"}
              />
              <TextField
                label="hours"
                name="hours"
                size="small"
                type="number"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={activityData?.timeTake?.hours}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (value < 0 || value > 24) {
                    return
                  }
                  handleTimeTakeChange(e)
                }}
                disabled={edit === "view"}
              />
              <TextField
                label="minutes"
                name="minutes"
                size="small"
                type="number"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={activityData?.timeTake?.minutes}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (value < 0 || value > 60) {
                    return
                  }
                  handleTimeTakeChange(e)
                }}
                disabled={edit === "view"}
              />
            </Box>
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Completed
            </Typography>
            <Select
              name="completed"
              value={activityData.completed}
              onChange={handleChange}
              fullWidth
              size="small"
              displayEmpty
              placeholder="Select"
              disabled={edit === "view"}
            >
              <MenuItem value={"Fully"}>Fully</MenuItem>
              <MenuItem value={"Partially"}>Partially</MenuItem>
              <MenuItem value={"Not at all"}>Not at all</MenuItem>
            </Select>
          </div>
          <Box className="flex justify-between gap-12 sm:flex-row">
            <div className='w-full'>
              <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Choose resource for activity</Typography>

              <FileUploader
                multiple={true}
                children={
                  <div
                    style={{
                      border: "1px dotted lightgray",
                      padding: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    <div className="flex justify-center mt-8">
                      <img
                        src="assets/images/svgImage/uploadimage.svg"
                        alt="Upload"
                        className="w-64 pb-8"
                      />
                    </div>
                    {files.length > 0 ? (
                      files.map((file, index) => (
                        <p className="text-center mb-4" key={index}>{file.name}</p>
                      ))
                    ) : (
                      <>
                        <p className="text-center mb-4">
                          Drag and drop your files here or{" "}
                          <a className="text-blue-500 font-500 ">Browse</a>
                        </p>
                        <p className="text-center mb-4">Max 10MB files are allowed</p>
                      </>
                    )}
                  </div>
                }
                handleChange={handleFileChange}
                name="file"
                types={fileTypes}
                disabled={edit === "view"}
              />
            </div>
          </Box>
          <div style={{ marginTop: '16px' }}>
            {activityData.files.map((file, index) => (
              <Chip
                key={index}
                icon={<FileCopyIcon />}
                label={file.key}
                onDelete={handleDelete(file)}
                style={{ margin: '4px' }}
                disabled={edit === "view"}
              />
            ))}
          </div>
          <div className="w-full mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleUploadButtonClick}
              disabled={files.length === 0}
            >
              Upload
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
};

const ExportPdfDialogContent = () => <div>Hello PDF In Evaluation</div>;

const AddNewEvaluationDialogContent = ({ props, formData, handleChangeYear, evaluationData, setEvaluationData }) => {

  const { edit = "Save" } = props;

  const currentYear = new Date().getFullYear();

  const years = [
    `${currentYear - 1}-${currentYear.toString().slice(-2)}`,
    `${currentYear}-${(currentYear + 1).toString().slice(-2)}`,
    `${currentYear + 1}-${(currentYear + 2).toString().slice(-2)}`,
  ];

  const handleEvaluationChange = (e) => {
    const { name, value } = e.target;
    setEvaluationData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const fileTypes = ["PDF"];
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const dispatch: any = useDispatch();

  const handleUploadButtonClick = async () => {
    setUploadedFiles(files);
    const data = await dispatch(uploadImages(files));

    console.log(data);

    setEvaluationData(prevData => ({
      ...prevData,
      files: [...prevData.files, ...data.data]
    }));

  };

  const handleDelete = (fileToDelete) => () => {

    setEvaluationData(prevData => ({
      ...prevData,
      files: prevData.files.filter(file => file !== fileToDelete)
    }));
  };

  return (
    <>
      <div>
        <Box className="flex flex-col justify-between gap-12">
          <div className="flex flex-row justify-between gap-12 w-full">
            <div className="w-full">
              <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
                Year
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  name="year"
                  value={formData.year}
                  onChange={handleChangeYear}
                  disabled={edit === "view"}
                >
                  {years?.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="w-full">
              <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
                Learning Objective
              </Typography>
              <TextField
                name="learning_objective"
                size="small"
                placeholder="lorent's learning"
                fullWidth
                value={evaluationData.learning_objective}
                onChange={handleEvaluationChange}
                disabled={edit === "view"}
              />
            </div>
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Completed
            </Typography>
            <Select
              name="completed"
              value={evaluationData.completed}
              onChange={handleEvaluationChange}
              fullWidth
              size="small"
              displayEmpty
              placeholder="Select"
              disabled={edit === "view"}
            >
              <MenuItem value={"Fully"}>Fully</MenuItem>
              <MenuItem value={"Partially"}>Partially</MenuItem>
              <MenuItem value={"Not at all"}>Not at all</MenuItem>
            </Select>
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Describe an example of how you have applied what you have learnt
            </Typography>
            <TextField
              name="example_of_learning"
              size="small"
              placeholder="Lorem ipsum is just dummy context....."
              fullWidth
              multiline
              rows={3}
              value={evaluationData.example_of_learning}
              onChange={handleEvaluationChange}
              disabled={edit === "view"}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Who support you
            </Typography>
            <TextField
              name="support_you"
              size="small"
              placeholder="Lorem ipsum dolor sit..."
              fullWidth
              value={evaluationData.support_you}
              onChange={handleEvaluationChange}
              disabled={edit === "view"}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Describe and feedback you have had from someone who your learning
              has had an impact..
            </Typography>
            <TextField
              name="feedback"
              size="small"
              placeholder="Lorem ipsum is just dummy context....."
              fullWidth
              multiline
              rows={3}
              value={evaluationData.feedback}
              onChange={handleEvaluationChange}
              disabled={edit === "view"}
            />
          </div>
          <Box className="flex justify-between gap-12 sm:flex-row">
            <div className='w-full'>
              <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Choose resource for evaluation</Typography>

              <FileUploader
                multiple={true}
                children={
                  <div
                    style={{
                      border: "1px dotted lightgray",
                      padding: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    <div className="flex justify-center mt-8">
                      <img
                        src="assets/images/svgImage/uploadimage.svg"
                        alt="Upload"
                        className="w-64 pb-8"
                      />
                    </div>
                    {files.length > 0 ? (
                      files.map((file, index) => (
                        <p className="text-center mb-4" key={index}>{file.name}</p>
                      ))
                    ) : (
                      <>
                        <p className="text-center mb-4">
                          Drag and drop your files here or{" "}
                          <a className="text-blue-500 font-500 ">Browse</a>
                        </p>
                        <p className="text-center mb-4">Max 10MB files are allowed</p>
                      </>
                    )}
                  </div>
                }
                handleChange={handleFileChange}
                name="file"
                types={fileTypes}
                disabled={edit === "view"}
              />
            </div>
          </Box>
          <div style={{ marginTop: '16px' }}>
            {evaluationData.files.map((file, index) => (
              <Chip
                key={index}
                icon={<FileCopyIcon />}
                label={file.key}
                onDelete={handleDelete(file)}
                style={{ margin: '4px' }}
                disabled={edit === "view"}
              />
            ))}
          </div>
          <div className="w-full mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleUploadButtonClick}
              disabled={files.length === 0}
            >
              Upload
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
};

const AddReflectionDialogContent = ({ props, formData, handleChangeYear, reflectionData, setReflectionData }) => {

  const { edit = "Save" } = props;

  const currentYear = new Date().getFullYear();

  const years = [
    `${currentYear - 1}-${currentYear.toString().slice(-2)}`,
    `${currentYear}-${(currentYear + 1).toString().slice(-2)}`,
    `${currentYear + 1}-${(currentYear + 2).toString().slice(-2)}`,
  ];

  const handleReflectionChange = (e) => {
    const { name, value } = e.target;
    setReflectionData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const fileTypes = ["PDF"];
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const dispatch: any = useDispatch();

  const handleUploadButtonClick = async () => {
    setUploadedFiles(files);
    const data = await dispatch(uploadImages(files));

    console.log(data);

    setReflectionData(prevData => ({
      ...prevData,
      files: [...prevData.files, ...data.data]
    }));

  };

  const handleDelete = (fileToDelete) => () => {

    setReflectionData(prevData => ({
      ...prevData,
      files: prevData.files.filter(file => file !== fileToDelete)
    }));
  };


  return (
    <>
      <div>
        <Box className="flex flex-col justify-between gap-12">
          <div className="flex flex-row justify-between gap-12 w-full">
            <div className="w-full">
              <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
                Year
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  name="year"
                  value={formData.year}
                  onChange={handleChangeYear}
                  disabled={edit === "view"}
                >
                  {years?.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="w-full">
              <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
                Learning Objective
              </Typography>
              <TextField
                name="learning_objective"
                size="small"
                placeholder="lorent's learning"
                fullWidth
                value={reflectionData.learning_objective}
                onChange={handleReflectionChange}
                disabled={edit === "view"}
              />
            </div>
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              What Went Well
            </Typography>
            <TextField
              name="what_went_well"
              value={reflectionData.what_went_well}
              onChange={handleReflectionChange}
              fullWidth
              size="small"
              placeholder="What Went Well"
              disabled={edit === "view"}
            >
            </TextField>
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              What would you do differently next time
            </Typography>
            <TextField
              name="differently_next_time"
              size="small"
              placeholder="Lorem ipsum is just dummy context....."
              fullWidth
              multiline
              rows={3}
              value={reflectionData.differently_next_time}
              onChange={handleReflectionChange}
              disabled={edit === "view"}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              How could you share this learning
            </Typography>
            <TextField
              name="feedback"
              size="small"
              placeholder="Lorem ipsum dolor sit..."
              fullWidth
              value={reflectionData.feedback}
              onChange={handleReflectionChange}
              disabled={edit === "view"}
            />
          </div>
          <Box className="flex justify-between gap-12 sm:flex-row">
            <div className='w-full'>
              <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>Choose resource for reflection</Typography>

              <FileUploader
                multiple={true}
                children={
                  <div
                    style={{
                      border: "1px dotted lightgray",
                      padding: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    <div className="flex justify-center mt-8">
                      <img
                        src="assets/images/svgImage/uploadimage.svg"
                        alt="Upload"
                        className="w-64 pb-8"
                      />
                    </div>
                    {files.length > 0 ? (
                      files.map((file, index) => (
                        <p className="text-center mb-4" key={index}>{file.name}</p>
                      ))
                    ) : (
                      <>
                        <p className="text-center mb-4">
                          Drag and drop your files here or{" "}
                          <a className="text-blue-500 font-500 ">Browse</a>
                        </p>
                        <p className="text-center mb-4">Max 10MB files are allowed</p>
                      </>
                    )}
                  </div>
                }
                handleChange={handleFileChange}
                name="file"
                types={fileTypes}
                disabled={edit === "view"}
              />
            </div>
          </Box>
          <div style={{ marginTop: '16px' }}>
            {reflectionData.files.map((file, index) => (
              <Chip
                key={index}
                icon={<FileCopyIcon />}
                label={file.key}
                onDelete={handleDelete(file)}
                style={{ margin: '4px' }}
                disabled={edit === "view"}
              />
            ))}
          </div>
          <div className="w-full mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleUploadButtonClick}
              disabled={files.length === 0}
            >
              Upload
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Cpd = (props) => {
  const { edit = "Save" } = props;
  const data = useSelector(selectCpdPlanning);
  const [value, setValue] = useState(0);
  const [dialogType, setDialogType] = useState<string | null>(data.dialogType);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const { singleData } = useSelector(selectCpdPlanning)


  const [formData, setFormData] = useState({
    year: singleData?.year || "",
    start_date: singleData?.start_date || "",
    end_date: singleData?.end_date || "",
    cpd_plan: singleData?.cpd_plan || "",
    impact_on_you: singleData?.impact_on_you || "",
    impact_on_colleagues: singleData?.impact_on_colleagues || "",
    impact_on_managers: singleData?.impact_on_managers || "",
    impact_on_organisation: singleData?.impact_on_organisation || "",
    activities: [],
    evaluations: [],
    reflections: [],
  });

  // const foundItem = data?.data?.find(item => item.year === formData.year);

  // console.log("Found Item:", foundItem?.id);

  const [activityData, setActivityData] = useState({
    cpd_id: singleData?.cpdId || null,
    date: singleData?.date || "",
    learning_objective: singleData?.learning_objective || "",
    activity: singleData?.activity || "",
    comment: singleData?.comment || "",
    support_you: singleData?.support_you || "",
    timeTake: {
      day: singleData?.timeTake?.day || 0,
      hours: singleData?.timeTake?.hours || 0,
      minutes: singleData?.timeTake?.minutes || 0
    },
    completed: singleData?.completed || "",
    files: singleData?.files || [],
  });

  // console.log(activityData);

  const handleAddActivity = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      activities: [...prevFormData.activities, activityData]
    }));

    setActivityData({
      cpd_id: cpdId || null,
      date: "",
      learning_objective: "",
      activity: "",
      comment: "",
      support_you: "",
      timeTake: {
        day: 0,
        hours: 0,
        minutes: 0
      },
      completed: "",
      files: [],
    });
  };

  const [evaluationData, setEvaluationData] = useState({
    cpd_id: singleData?.cpdId || null,
    learning_objective: singleData?.learning_objective || "",
    completed: singleData?.completed || "",
    example_of_learning: singleData?.example_of_learning || "",
    support_you: singleData?.support_you || "",
    feedback: singleData?.feedback || "",
    files: singleData?.files || [],
  });

  // console.log(evaluationData);

  const handleAddEvaluation = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      evaluations: [...prevFormData.evaluations, evaluationData]
    }));

    setEvaluationData({
      cpd_id: cpdId || null,
      learning_objective: "",
      completed: "",
      example_of_learning: "",
      support_you: "",
      feedback: "",
      files: [],
    });
  };

  const [reflectionData, setReflectionData] = useState({
    cpd_id: singleData?.cpdId || null,
    learning_objective: singleData?.learning_objective || "",
    what_went_well: singleData?.what_went_well || "",
    differently_next_time: singleData?.differently_next_time || "",
    feedback: singleData?.feedback || "",
    files: singleData?.files || [],
  });


  const handleAddReflection = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      reflections: [...prevFormData.reflections, reflectionData]
    }));

    setReflectionData({
      cpd_id: cpdId || null,
      learning_objective: "",
      what_went_well: "",
      differently_next_time: "",
      feedback: "",
      files: [],
    });
  };

  const [minEndDate, setMinEndDate] = useState("");

  const [cpdId, setcpdId] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "start_date") {
      setMinEndDate(value);
    }
    if (name == "year") {
      setcpdId(data.data.find(item => item.year === value).id);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      let response = "";
      let id = singleData.id;
      console.log(id);

      switch (dialogType) {

        case "addPlan":
          if (edit === "Save") {
            response = await dispatch(createCpdPlanningAPI({ ...formData }));
          } else if (edit == "edit") {
            response = await dispatch(updateCpdPlanningAPI({ ...formData }));
          }
          console.log("Submitting Add Plan data:", formData);
          break;
        case "addNew":
          handleAddActivity()

          if (edit === "Save") {
            response = await dispatch(createActivityAPI({ ...activityData, cpd_id: cpdId }));
          } else if (edit == "edit") {
            response = await dispatch(updateActivityAPI(id, activityData));
          }
          console.log("Submitting Add New data:", id, activityData);
          break;
        case "addNewEvaluation":
          handleAddEvaluation()

          if (edit === "Save") {
            response = await dispatch(createEvaluationAPI({ ...evaluationData, cpd_id: cpdId }));
          } else if (edit == "edit") {
            response = await dispatch(updateEvaluationAPI(id, evaluationData));
          }
          console.log("Submitting Add New Evaluation data:", evaluationData);
          break;
        case "exportPdf":
          console.log("Exporting PDF with data:", formData);
          break;
        case "addReflection":
          handleAddReflection()
          if (edit === "Save") {
            response = await dispatch(createReflectionAPI({ ...reflectionData, cpd_id: cpdId }));
          } else if (edit == "edit") {
            response = await dispatch(updateReflectionsAPI(id, reflectionData));
          }
          console.log("Submitting Add Reflection data:", reflectionData);
          break;
        default:
          break;
      }

      if (response) {
        navigate("/cpd")
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setLoading(false);
      handleClose();
      setcpdId("")
    }

  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = (type) => {
    setDialogType(type);
  };

  const handleClose = () => {
    setDialogType(null);
  };

  const renderDialogContent = () => {
    switch (dialogType) {
      case "addPlan":
        return (
          <AddPlanDialogContent
            props={props}
            formData={formData}
            handleChange={handleChange}
            minEndDate={minEndDate}
            cpdId={cpdId}
          />
        );
      case "addNew":
        return <AddNewDialogContent
          props={props}
          formData={formData}
          handleChangeYear={handleChange}
          // handleIdChange={handleIdChange}
          setActivityData={setActivityData}
          activityData={activityData}
        />;
      case "addNewEvaluation":
        return <AddNewEvaluationDialogContent
          props={props}
          formData={formData}
          handleChangeYear={handleChange}
          evaluationData={evaluationData}
          setEvaluationData={setEvaluationData}

        />;
      case "exportPdf":
        return <ExportPdfDialogContent />;
      case "addReflection":
        return <AddReflectionDialogContent
          props={props}
          formData={formData}
          handleChangeYear={handleChange}
          reflectionData={reflectionData}
          setReflectionData={setReflectionData}
        />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            className="border-1 m-12 rounded-md"
            sx={{
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            <Tab
              label="Planning"
              {...a11yProps(0)}
              // className="p-0"
              sx={{
                borderRight: "1px solid #e5e7eb",
                "&:last-child": { borderRight: "none" },
                // borderRadius: "4px",
                // textTransform: "none",
                // color: "#ffffff",
                // backgroundColor: "secondary.main",
                // margin: "0 4px",
                "&:hover": {
                  backgroundColor: "#6D81A3",
                  color: "#ffffff",
                  borderRadius: "0px",
                },
                "&.Mui-selected": {
                  backgroundColor: "#6D81A3",
                  color: "#ffffff",
                  borderRadius: "0px",
                },
              }}
            />
            <Tab
              label="Activity"
              {...a11yProps(1)}
              sx={{
                borderRight: "1px solid #e5e7eb",
                "&:last-child": { borderRight: "none" },
                // borderRadius: "4px",
                // textTransform: "none",
                // color: "#ffffff",
                // backgroundColor: "secondary.main",
                // margin: "0 4px",
                // "&:hover": {
                //   backgroundColor: "#6D81A3",
                //   color: "#ffffff",
                //   borderRadius: "0px",
                // },
                "&.Mui-selected": {
                  backgroundColor: "#6D81A3",
                  color: "#ffffff",
                  borderRadius: "0px",
                },
              }}
            />
            <Tab
              label="Evaluation"
              {...a11yProps(2)}
              sx={{
                borderRight: "1px solid #e5e7eb",
                "&:last-child": { borderRight: "none" },
                // borderRadius: "4px",
                // textTransform: "none",
                // color: "#ffffff",
                // backgroundColor: "secondary.main",
                // margin: "0 4px",
                // "&:hover": {
                //   backgroundColor: "#6D81A3",
                //   color: "#ffffff",
                //   borderRadius: "0px",
                // },
                "&.Mui-selected": {
                  backgroundColor: "#6D81A3",
                  color: "#ffffff",
                  borderRadius: "0px",
                },
              }}
            />
            <Tab
              label="Reflection"
              {...a11yProps(3)}
              sx={{
                borderRight: "1px solid #e5e7eb",
                "&:last-child": { borderRight: "none" },
                // borderRadius: "4px",
                // textTransform: "none",
                // color: "#ffffff",
                // backgroundColor: "secondary.main",
                // margin: "0 4px",
                // "&:hover": {
                //   backgroundColor: "#6D81A3",
                //   color: "#ffffff",
                //   borderRadius: "0px",
                // },
                "&.Mui-selected": {
                  backgroundColor: "#6D81A3",
                  color: "#ffffff",
                  borderRadius: "0px",
                },
              }}
            />
          </Tabs>
          <div className="flex space-x-4 mr-12">
            {value === 0 && (
              <SecondaryButton
                className="p-12"
                name="Add Plan"
                startIcon={<AddIcon sx={{ mx: -0.5 }} />}
                onClick={() => handleClickOpen("addPlan")}
              />
            )}
            {value === 1 && (
              <SecondaryButton
                className="p-12"
                name="Add New"
                startIcon={<AddIcon sx={{ mx: -0.5 }} />}
                onClick={() => handleClickOpen("addNew")}
              />
            )}
            {value === 2 && (
              <>
                <SecondaryButton
                  className="p-12"
                  name="Export PDF"
                  startIcon={<AddIcon sx={{ mx: -0.5 }} />}
                  onClick={() => handleClickOpen("exportPdf")}
                />
                <SecondaryButton
                  className="p-12"
                  name="Add New"
                  startIcon={<AddIcon sx={{ mx: -0.5 }} />}
                  onClick={() => handleClickOpen("addNewEvaluation")}
                />
              </>
            )}
            {value === 3 && (
              <SecondaryButton
                className="p-12"
                name="Add Reflection"
                startIcon={<AddIcon sx={{ mx: -0.5 }} />}
                onClick={() => handleClickOpen("addReflection")}
              />
            )}
          </div>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Planning />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Activity />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Evaluation />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Reflection />
        </CustomTabPanel>
      </Box>

      <Dialog
        open={!!dialogType}
        onClose={handleClose}
        sx={{
          ".MuiDialog-paper": {
            borderRadius: "4px",
            width: "100%",
          },
        }}
      >
        <DialogContent>{renderDialogContent()}</DialogContent>
        <Box className="flex items-center justify-end m-12 mt-24">

          {loading ? <LoadingButton className="w-1/12" /> :
            <>
              {edit === "view" ?
                <SecondaryButtonOutlined name="Cancel" className=" w-1/12" onClick={handleClose} />
                :
                <SecondaryButtonOutlined name="Cancel" className=" w-1/12" onClick={handleClose} />
              }
              {edit !== "view" &&
                <SecondaryButton name={edit === "edit" ? "Update" : "Save"} className=" w-1/12 ml-10" onClick={handleSubmit} />
              }
            </>
            // <DialogActions>
            //   <SecondaryButtonOutlined onClick={handleClose} name="Cancel" />
            //   <SecondaryButton onClick={handleSubmit} name="Save" />
            // </DialogActions>
          }
        </Box>
      </Dialog>
    </div>
  );
};

export default Cpd;
