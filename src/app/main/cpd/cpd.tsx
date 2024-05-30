import React, { useState } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Planning from "./planning";
import Activity from "./activity";
import Evaluation from "./evaluation";
import Reflection from "./reflection";
import {
  SecondaryButton,
  SecondaryButtonOutlined,
} from "src/app/component/Buttons";

// Separate components for dialog content
const AddPlanDialogContent = ({ formData, handleChange }) => {
  return (
    <>
      <div>
        <Box className="flex flex-col gap-12 sm:flex-row">
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
              value={formData.start_date}
              onChange={handleChange}
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
              value={formData.end_date}
              onChange={handleChange}
            />
          </div>
        </Box>
        <Box className="mt-12 flex flex-col justify-between gap-12">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              What is your CPD plan?
            </Typography>
            <TextField
              name="cdp_plan"
              size="small"
              placeholder="Enter your CPD Plan..."
              fullWidth
              multiline
              rows={5}
              value={formData.cdp_plan}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col space-y-4">
            <Typography sx={{ fontSize: "0.9vw", marginRight: "0.5rem" }}>
              Impact
            </Typography>
            {[
              { label: "On you:", name: "on_you", value: formData.on_you },
              {
                label: "Colleagues:",
                name: "colleagues",
                value: formData.colleagues,
              },
              {
                label: "Managers:",
                name: "managers",
                value: formData.managers,
              },
              {
                label: "Organization:",
                name: "organization",
                value: formData.organization,
              },
            ].map((group) => (
              <div
                key={group.name}
                className="flex flex-col sm:flex-row items-center"
              >
                <Typography sx={{ fontSize: "0.9vw", marginRight: "0.5rem" }}>
                  {group.label}
                </Typography>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label
                      key={`${group.name}-${value}`}
                      className="flex items-center"
                    >
                      <input
                        type="radio"
                        name={group.name}
                        value={value}
                        checked={group.value === String(value)}
                        onChange={handleChange}
                        className="mr-1"
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Box>
      </div>
    </>
  );
};

const AddNewDialogContent = () => {
  return (
    <>
      <div>
        <Box className="flex flex-col justify-between gap-12">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Date
            </Typography>
            <TextField
              name="start_date"
              size="small"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              // value={formData.start_date}
              // onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Learning Objective
            </Typography>
            <TextField
              name="learning_ Objective"
              size="small"
              placeholder="Lorem ipsum is just dummy context....."
              fullWidth
              multiline
              rows={3}
              // value={formData.cdp_plan}
              // onChange={handleChange}
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
              // value={formData.cdp_plan}
              // onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Who should support you
            </Typography>
            <TextField
              name="cdp_plan"
              size="small"
              placeholder="Lorem ipsum is just dummy context....."
              fullWidth
              multiline
              rows={3}
              // value={formData.cdp_plan}
              // onChange={handleChange}
            />
          </div>
          <div>
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              How long did it take
            </Typography>
            <Box className="flex justify-between gap-12 sm:flex-row">
              <TextField
                name="start_date"
                size="small"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                // value={formData.start_date}
                // onChange={handleChange}
              />
              <TextField
                name="start_date"
                size="small"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                // value={formData.start_date}
                // onChange={handleChange}
              />
              <TextField
                name="start_date"
                size="small"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                // value={formData.start_date}
                // onChange={handleChange}
              />
            </Box>
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Completed
            </Typography>
            <Select
              name="completed"
              // value={formData.assessment_method}
              // onChange={handleChange}
              fullWidth
              size="small"
              displayEmpty
              placeholder="Select"
            >
              <MenuItem value={"Yes"}>Yes</MenuItem>
              <MenuItem value={"No"}>No</MenuItem>
            </Select>
          </div>
        </Box>
      </div>
    </>
  );
};

const ExportPdfDialogContent = () => <div>Hello PDF In Evaluation</div>;

const AddNewEvaluationDialogContent = () => {
  return (
    <>
      <div>
        <Box className="flex flex-col justify-between gap-12">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Learning Objective
            </Typography>
            <TextField
              name="learning_objective"
              size="small"
              placeholder="lorent's learning"
              fullWidth
              // value={formData.uploaded_evidence_file}
              // onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Completed
            </Typography>
            <Select
              name="completed"
              // value={formData.assessment_method}
              // onChange={handleChange}
              fullWidth
              size="small"
              displayEmpty
              placeholder="Select"
            >
              <MenuItem value={"Yes"}>Yes</MenuItem>
              <MenuItem value={"No"}>No</MenuItem>
            </Select>
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Describe an example of how you have applied what you have learnt
            </Typography>
            <TextField
              name="describe_example"
              size="small"
              placeholder="Lorem ipsum is just dummy context....."
              fullWidth
              multiline
              rows={3}
              // value={formData.cdp_plan}
              // onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Who support you
            </Typography>
            <TextField
              name="who_support_you"
              size="small"
              placeholder="Lorem ipsum dolor sit..."
              fullWidth
              // value={formData.uploaded_evidence_file}
              // onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Describe and feedback you have had from someone who your learning
              has had an impact..
            </Typography>
            <TextField
              name="describe_and_feedback"
              size="small"
              placeholder="Lorem ipsum is just dummy context....."
              fullWidth
              multiline
              rows={3}
              // value={formData.cdp_plan}
              // onChange={handleChange}
            />
          </div>
        </Box>
      </div>
    </>
  );
};

const AddReflectionDialogContent = () => {
  return (
    <>
      <div>
        <Box className="flex flex-col justify-between gap-12">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              Learning Objective
            </Typography>
            <TextField
              name="learning_objective"
              size="small"
              placeholder="lorent's learning"
              fullWidth
              // value={formData.uploaded_evidence_file}
              // onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              What Went Well
            </Typography>
            <Select
              name="what_went_well"
              // value={formData.assessment_method}
              // onChange={handleChange}
              fullWidth
              size="small"
              displayEmpty
              placeholder="Select"
            >
              <MenuItem value={"Yes"}>Yes</MenuItem>
              <MenuItem value={"No"}>No</MenuItem>
            </Select>
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              What would you do differently next time
            </Typography>
            <TextField
              name="what_would_you_do"
              size="small"
              placeholder="Lorem ipsum is just dummy context....."
              fullWidth
              multiline
              rows={3}
              // value={formData.cdp_plan}
              // onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
              How could you share this learning
            </Typography>
            <TextField
              name="how_could_you_share_this"
              size="small"
              placeholder="Lorem ipsum dolor sit..."
              fullWidth
              // value={formData.uploaded_evidence_file}
              // onChange={handleChange}
            />
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

const Cpd = () => {
  const [value, setValue] = useState(0);
  const [dialogType, setDialogType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    cdp_plan: "",
    on_you: "",
    colleagues: "",
    managers: "",
    organization: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    switch (dialogType) {
      case "addPlan":
        console.log("Submitting Add Plan data:", formData);
        break;
      case "addNew":
        console.log("Submitting Add New data:", formData);
        break;
      case "addNewEvaluation":
        console.log("Submitting Add New Evaluation data:", formData);
        break;
      case "exportPdf":
        console.log("Exporting PDF with data:", formData);
        break;
      case "addReflection":
        console.log("Submitting Add Reflection data:", formData);
        break;
      default:
        break;
    }
    handleClose();
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
            formData={formData}
            handleChange={handleChange}
          />
        );
      case "addNew":
        return <AddNewDialogContent />;
      case "addNewEvaluation":
        return <AddNewEvaluationDialogContent />;
      case "exportPdf":
        return <ExportPdfDialogContent />;
      case "addReflection":
        return <AddReflectionDialogContent />;
      default:
        return null;
    }
  };

  return (
    <div className="shadow-lg m-20 rounded-lg h-full">
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
          >
            <Tab label="Planning" {...a11yProps(0)} />
            <Tab label="Activity" {...a11yProps(1)} />
            <Tab label="Evaluation" {...a11yProps(2)} />
            <Tab label="Reflection" {...a11yProps(3)} />
          </Tabs>
          <div className="flex space-x-4 mr-4">
            {value === 0 && (
              <SecondaryButton
                name="Add Plan"
                startIcon={<AddIcon sx={{ mx: -0.5 }} />}
                onClick={() => handleClickOpen("addPlan")}
              />
            )}
            {value === 1 && (
              <SecondaryButton
                name="Add New"
                startIcon={<AddIcon sx={{ mx: -0.5 }} />}
                onClick={() => handleClickOpen("addNew")}
              />
            )}
            {value === 2 && (
              <>
                <SecondaryButton
                  name="Export PDF"
                  startIcon={<AddIcon sx={{ mx: -0.5 }} />}
                  onClick={() => handleClickOpen("exportPdf")}
                />
                <SecondaryButton
                  name="Add New"
                  startIcon={<AddIcon sx={{ mx: -0.5 }} />}
                  onClick={() => handleClickOpen("addNewEvaluation")}
                />
              </>
            )}
            {value === 3 && (
              <SecondaryButton
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
        <DialogActions>
          <SecondaryButtonOutlined onClick={handleClose} name="Cancel" />
          <SecondaryButton onClick={handleSubmit} name="Save" />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cpd;
