import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Autocomplete,
  Avatar,
  AvatarGroup,
  Box,
  Checkbox,
  Dialog,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Style from "./style.module.css";
import { useDispatch } from "react-redux";
import { userTableMetaData } from "src/app/contanst/metaData";
import AlertDialog from "../Dialogs/AlertDialog";
import {
  DangerButton,
  LoadingButton,
  SecondaryButton,
  SecondaryButtonOutlined,
} from "../Buttons";
import {
  deleteLearnerHandler,
  fetchLearnerAPI,
  selectLearnerManagement,
} from "app/store/learnerManagement";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import {
  courseAllocationAPI,
  selectCourseManagement,
} from "app/store/courseManagement";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { slice } from 'app/store/reloadData'
import { getRandomColor, IconsData } from "src/utils/randomColor";
import { AutoStories } from "@mui/icons-material";
import { FaFolderOpen } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { IoCloseSharp, IoLockClosedSharp } from "react-icons/io5";

export default function LearnerManagementTable(props) {
  const {
    columns,
    rows,
    handleOpen = () => { },
    setUserData = () => { },
    setUpdateData = () => { },
    meta_data,
    dataUpdatingLoadding,
    search_keyword = "",
    search_C = "",
    checkedLabels,
    handleCheckboxChange,
    refetchLearner
  } = props;

  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState("");
  const [openMenuDialog, setOpenMenuDialog] = useState("");
  const [courseDialog, setCourseDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch: any = useDispatch();
  const [courseAllocationData, setCourseAllocationData] = useState({
    course_id: "",
    trainer_id: "",
    IQA_id: "",
    learner_id: "",
    EQA_id: "",
    LIQA_id: "",
    employer_id: "",
    start_date: "",
    end_date: ""
  });

  const handleUpdateData = (name, value) => {
    setCourseAllocationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { data } = useSelector(selectCourseManagement);
  const { LIQA, IQA, trainer, employer, EQA } = useSelector(selectLearnerManagement);

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(
      fetchLearnerAPI({ page: newPage, page_size: userTableMetaData.page_size })
    );
  };

  const editIcon = () => {
    setUpdateData(openMenuDialog);
    const {
      first_name,
      last_name,
      user_name,
      email,
      password,
      confrimpassword,
      mobile,
      employer_id,
      funding_body,
      national_ins_no,
    } = rows.filter((item) => item.learner_id === openMenuDialog)[0];
    setUserData({
      first_name,
      last_name,
      user_name,
      email,
      password,
      confrimpassword,
      mobile,
      employer_id,
      funding_body,
      national_ins_no,
    });
    handleOpen();
  };

  const deleteIcon = (id) => {
    setDeleteId(id);
  };

  const deleteConfromation = async () => {
    await dispatch(
      deleteLearnerHandler(deleteId, meta_data, search_keyword, search_C)
    );
    setDeleteId("");
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openMenu = (e, id) => {
    handleClick(e);
    setOpenMenuDialog(id);
    setCourseAllocationData((prevState) => ({
      ...prevState,
      "learner_id": id,
    }));
  };

  const clsoeCourseDialog = () => {
    setCourseDialog(false);
  };

  const courseAllocation = async () => {
    setLoading(true);
    const response = await dispatch(
      courseAllocationAPI(courseAllocationData)
    );
    if (response) {
      refetchLearner()
      clsoeCourseDialog();
      setOpenMenuDialog("");
      setCourseAllocationData({
        course_id: "",
        trainer_id: "",
        IQA_id: "",
        learner_id: "",
        EQA_id: "",
        LIQA_id: "",
        employer_id: "",
        start_date: "",
        end_date: ""
      });
    }
    setLoading(false);
  };

  const redirection = (id, user_id) => {
    dispatch(slice.setLeanerId({ id, user_id }))
    navigate('/portfolio')
  }

  return (
    <>
      <Grid className='w-full p-12'>
        <Typography className="font-600" sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
          Status
        </Typography>
        <FormGroup className="flex flex-row flex-wrap">
          {Object.keys(checkedLabels).map((label) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  checked={checkedLabels[label]}
                  onChange={handleCheckboxChange}
                  name={label}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </Grid>
      <div style={{ width: "100%", marginTop: "0.5rem" }}>
        <TableContainer sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {columns?.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{ backgroundColor: "#F8F8F8" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => {
                return (
                  <TableRow role="checkbox" tabIndex={-1} key={row.learner_id}>
                    {columns?.map((column) => {
                      const value = row[column.id];
                      if (column.id === "actions") {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{ borderBottom: "2px solid #F8F8F8" }}
                          >
                            <IconButton
                              size="small"
                              sx={{ color: "#5B718F", marginRight: "4px" }}
                              onClick={(e) => openMenu(e, row.learner_id)}
                            >
                              <MoreHorizIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ borderBottom: "2px solid #F8F8F8" }}
                        >
                          <div className={Style.avatar}>
                            {column.id === "first_name" ? (
                              <>
                                <Avatar
                                  alt={value}
                                  src={row?.avatar}
                                  sx={{
                                    marginRight: "8px",
                                    width: "24px",
                                    height: "24px",
                                    backgroundColor: getRandomColor(row?.user_name?.toLowerCase().charAt(0))
                                  }}
                                />
                                <div className="hover:text-[#2D6498] cursor-pointer " onClick={() => redirection(row.learner_id, row.user_id)}>
                                  {value} {row["last_name"]}
                                </div>
                              </>
                            ) : column.id === "course" ? (
                              row?.course && row.course.length > 0 ? (
                                <AvatarGroup
                                  max={4}
                                  className="items-center gap-8"
                                  sx={{
                                    ".MuiAvatar-root": {
                                      backgroundColor: "#6d81a3",
                                      width: "3rem",
                                      height: "3rem",
                                      fontSize: "medium",
                                      border: "1px solid #FFFFFF",
                                    },
                                  }}>
                                  {row?.course.map((course) => (
                                    <>
                                      <Tooltip key={course.course.course_id} title={course.course.course_name}>
                                        {
                                          false // Course Completed
                                            ?
                                            <Grid className="relative cursor-pointer">
                                              <FaFolderOpen className="text-3xl -rotate-12" style={{ color: IconsData[(IconsData.findIndex((item) => item.name === course.course.course_type))]?.color || "#1d61b5" }} />
                                              <Grid>
                                                <GiCheckMark className="text-base absolute top-8 left-5" style={{ color: '#000000' }} />
                                              </Grid>
                                            </Grid> :
                                            false ? // Early Leaver
                                              <Grid className="relative cursor-pointer">
                                                <FaFolderOpen className="text-3xl -rotate-12" style={{ color: IconsData[(IconsData.findIndex((item) => item.name === course.course.course_type))]?.color || "#1d61b5" }} />
                                                <Grid>
                                                  <IoCloseSharp className="text-base absolute top-8 left-5 font-600" style={{ color: '#CC1D17' }} />
                                                </Grid>
                                              </Grid> :
                                              false ? // Training Suspended
                                                <Grid className="relative cursor-pointer">
                                                  <FaFolderOpen className="text-3xl -rotate-12" style={{ color: IconsData[(IconsData.findIndex((item) => item.name === course.course.course_type))]?.color || "#1d61b5" }} />
                                                  <Grid>
                                                    <IoLockClosedSharp className="text-base absolute top-8 left-5" style={{ color: '#D0AD45' }} />
                                                  </Grid>
                                                </Grid> :
                                                <Grid className="cursor-pointer">
                                                  <FaFolderOpen className="text-3xl -rotate-12" style={{ color: IconsData[(IconsData.findIndex((item) => item.name === course.course.course_type))]?.color || "#1d61b5" }} />
                                                </Grid>
                                        }
                                      </Tooltip>
                                    </>
                                  ))}
                                </AvatarGroup >
                              ) : (
                                <strong>-</strong>
                              )
                            ) : (
                              value || "Active"
                            )}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="w-full flex justify-center py-4 mb-14">
          <Stack
            spacing={2}
            className="flex justify-center items-center w-full mt-12 bg-white"
          >
            <Pagination
              count={meta_data?.pages}
              page={meta_data?.page}
              variant="outlined"
              onChange={handleChangePage}
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
            />
          </Stack>
        </div>
      </div >
      <AlertDialog
        open={Boolean(deleteId)}
        close={() => deleteIcon("")}
        title="Delete learner?"
        content="Deleting this learner will also remove all associated data and relationships. Proceed with deletion?"
        actionButton={
          dataUpdatingLoadding ? (
            <LoadingButton />
          ) : (
            <DangerButton onClick={deleteConfromation} name="Delete learner" />
          )
        }
        cancelButton={
          <SecondaryButtonOutlined
            className="px-24"
            onClick={() => deleteIcon("")}
            name="Cancel"
          />
        }
      />
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            editIcon();
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            deleteIcon(openMenuDialog);
          }}
        >
          Delete
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setCourseDialog(true);
          }}
        >
          Course Allocation
        </MenuItem>
      </Menu>

      <Dialog
        open={courseDialog}
        onClose={clsoeCourseDialog}
        sx={{
          ".MuiDialog-paper": {
            borderRadius: "4px",
            padding: "1rem",
            width: "440px",
          },
        }}
      >
        <Box className="m-4 flex flex-col justify-between gap-12 sm:flex-row">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }} className={Style.name}>
              Select Course
            </Typography>
            <Autocomplete
              disableClearable
              fullWidth
              size="small"
              options={data}
              getOptionLabel={(option: any) => option.course_name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Course"
                  name="role"
                  value={courseAllocationData?.course_id}
                />
              )}
              onChange={(e, value: any) =>
                handleUpdateData("course_id", value.course_id)
              }
              sx={{
                ".MuiAutocomplete-clearIndicator": {
                  color: "#5B718F",
                },
              }}
              PaperComponent={({ children }) => (
                <Paper style={{ borderRadius: "4px" }}>{children}</Paper>
              )}
            />
          </div>
        </Box>
        <Box className="m-4 flex flex-col justify-between gap-12 sm:flex-row">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }} className={Style.name}>
              Trainer
            </Typography>
            <Autocomplete
              disableClearable
              fullWidth
              size="small"
              options={trainer}
              getOptionLabel={(option: any) => option.user_name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Trainer"
                  name="role"
                  value={courseAllocationData?.trainer_id}
                />
              )}
              onChange={(e, value: any) =>
                handleUpdateData("trainer_id", value.user_id)
              }
              sx={{
                ".MuiAutocomplete-clearIndicator": {
                  color: "#5B718F",
                },
              }}
              PaperComponent={({ children }) => (
                <Paper style={{ borderRadius: "4px" }}>{children}</Paper>
              )}
            />
          </div>
        </Box>
        <Box className="m-4 flex flex-col justify-between gap-12 sm:flex-row">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }} className={Style.name}>
              IQA
            </Typography>
            <Autocomplete
              disableClearable
              fullWidth
              size="small"
              options={IQA}
              getOptionLabel={(option: any) => option.user_name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select IQA"
                  name="role"
                  value={courseAllocationData?.IQA_id}
                />
              )}
              onChange={(e, value: any) =>
                handleUpdateData("IQA_id", value.user_id)
              }
              sx={{
                ".MuiAutocomplete-clearIndicator": {
                  color: "#5B718F",
                },
              }}
              PaperComponent={({ children }) => (
                <Paper style={{ borderRadius: "4px" }}>{children}</Paper>
              )}
            />
          </div>
        </Box>
        <Box className="m-4 flex flex-col justify-between gap-12 sm:flex-row">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }} className={Style.name}>
              LIQA
            </Typography>
            <Autocomplete
              disableClearable
              fullWidth
              size="small"
              options={LIQA}
              getOptionLabel={(option: any) => option.user_name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select LIQA"
                  name="role"
                  value={courseAllocationData?.LIQA_id}
                />
              )}
              onChange={(e, value: any) =>
                handleUpdateData("LIQA_id", value.user_id)
              }
              sx={{
                ".MuiAutocomplete-clearIndicator": {
                  color: "#5B718F",
                },
              }}
              PaperComponent={({ children }) => (
                <Paper style={{ borderRadius: "4px" }}>{children}</Paper>
              )}
            />
          </div>
        </Box>
        <Box className="m-4 flex flex-col justify-between gap-12 sm:flex-row">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }} className={Style.name}>
              EQA
            </Typography>
            <Autocomplete
              disableClearable
              fullWidth
              size="small"
              options={EQA}
              getOptionLabel={(option: any) => option.user_name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select EQA"
                  name="role"
                  value={courseAllocationData?.EQA_id}
                />
              )}
              onChange={(e, value: any) =>
                handleUpdateData("EQA_id", value.user_id)
              }
              sx={{
                ".MuiAutocomplete-clearIndicator": {
                  color: "#5B718F",
                },
              }}
              PaperComponent={({ children }) => (
                <Paper style={{ borderRadius: "4px" }}>{children}</Paper>
              )}
            />
          </div>
        </Box>
        <Box className="m-4 flex flex-col justify-between gap-12 sm:flex-row">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }} className={Style.name}>
              Employer
            </Typography>
            <Autocomplete
              disableClearable
              fullWidth
              size="small"
              options={employer}
              getOptionLabel={(option: any) => option.employer?.employer_name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Employer"
                  name="role"
                  value={courseAllocationData?.employer_id}
                />
              )}
              onChange={(e, value: any) =>
                handleUpdateData("employer_id", value.user_id)
              }
              sx={{
                ".MuiAutocomplete-clearIndicator": {
                  color: "#5B718F",
                },
              }}
              PaperComponent={({ children }) => (
                <Paper style={{ borderRadius: "4px" }}>{children}</Paper>
              )}
            />
          </div>
        </Box>
        <Box className="m-4 flex flex-col justify-between gap-12 sm:flex-row">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }} className={Style.name}>
              Start Date
            </Typography>
            <TextField
              name="start_date"
              value={courseAllocationData?.start_date}
              size="small"
              type='date'
              required
              fullWidth
              onChange={(e) => setCourseAllocationData({
                ...courseAllocationData,
                start_date: e.target.value
              })}
            />

          </div>
        </Box>
        <Box className="m-4 flex flex-col justify-between gap-12 sm:flex-row">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }} className={Style.name}>
              End Date
            </Typography>
            <TextField
              name="end_date"
              value={courseAllocationData?.end_date}
              size="small"
              type='date'
              required
              fullWidth
              onChange={(e) => setCourseAllocationData({
                ...courseAllocationData,
                end_date: e.target.value
              })}
            />

          </div>
        </Box>
        <div className="flex justify-end mt-4">
          {loading ? (
            <LoadingButton style={{ width: "10rem" }} />
          ) : (
            <>
              <SecondaryButtonOutlined
                name="Cancel"
                style={{ width: "10rem", marginRight: "2rem" }}
                onClick={clsoeCourseDialog}
              />
              <SecondaryButton
                name="Allocate"
                style={{ width: "10rem" }}
                onClick={courseAllocation}
              />
            </>
          )}
        </div>
      </Dialog>
    </>
  );
}
