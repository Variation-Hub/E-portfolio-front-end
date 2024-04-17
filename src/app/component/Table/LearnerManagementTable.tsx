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
  Box,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Style from "./style.module.css";
import { useDispatch } from "react-redux";
import { deleteUserHandler, fetchUserAPI } from "app/store/userManagement";
import { userTableMetaData } from "src/app/contanst/metaData";
import AlertDialog from "../Dialogs/AlertDialog";
import {
  DangerButton,
  LoadingButton,
  SecondaryButton,
  SecondaryButtonOutlined,
} from "../Buttons";
import { deleteLearnerHandler } from "app/store/learnerManagement";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import {
  courseAllocationAPI,
  selectCourseManagement,
} from "app/store/courseManagement";

export default function LearnerManagementTable(props) {
  const {
    columns,
    rows,
    handleOpen = () => {},
    setUserData = () => {},
    setUpdateData = () => {},
    meta_data,
    dataUpdatingLoadding,
    search_keyword = "",
    search_role = "",
  } = props;

  const [deleteId, setDeleteId] = useState("");
  const [openMenuDialog, setOpenMenuDialog] = useState("");
  const [couseId, setCourseId] = useState("");
  const [courseDialog, setCourseDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch: any = useDispatch();

  const { data } = useSelector(selectCourseManagement);

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(
      fetchUserAPI({ page: newPage, page_size: userTableMetaData.page_size })
    );
  };

  const editIcon = (id) => {
    setUpdateData(id);
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
    } = rows.filter((item) => item.learner_id === id)[0];
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
      deleteLearnerHandler(deleteId, meta_data, search_keyword, search_role)
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
  };

  const clsoeCourseDialog = () => {
    setCourseDialog(false);
  };

  const courseAllocation = async () => {
    setLoading(true);
    const response = await dispatch(
      courseAllocationAPI({ course_id: couseId, learner_id: openMenuDialog })
    );
    if (response) {
      clsoeCourseDialog();
      setOpenMenuDialog("");
      setCourseId("");
    }
    setLoading(false);
  };

  return (
    <>
      <div style={{ width: "100%", overflow: "hidden", marginTop: "0.5rem" }}>
        <TableContainer sx={{ maxHeight: 480, minHeight: 480 }}>
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
                          <TableCell key={column.id} align={column.align}>
                            {/* <IconButton
                              size="small"
                              sx={{ color: "#5B718F", marginRight: "4px" }}
                              onClick={() => editIcon(row.learner_id)}
                            >
                              <ModeEditOutlineOutlinedIcon fontSize="small" />
                            </IconButton> */}
                            <IconButton
                              size="small"
                              sx={{ color: "#5B718F", marginRight: "4px" }}
                              onClick={(e) => openMenu(e, row.learner_id)}
                            >
                              <MoreHorizIcon fontSize="small" />
                            </IconButton>
                            {/* <IconButton
                              size="small"
                              sx={{ color: "maroon", marginLeft: "4px" }}
                              onClick={() => deleteIcon(row.learner_id)}
                            >
                              <DeleteOutlineOutlinedIcon fontSize="small" />
                            </IconButton> */}
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <div className={Style.avatar}>
                            {column.id === "first_name" ? (
                              <>
                                <Avatar
                                  alt={value}
                                  src={row?.avatar?.url}
                                  sx={{
                                    marginRight: "8px",
                                    width: "24px",
                                    height: "24px",
                                  }}
                                />
                                {value} {row["last_name"]}
                              </>
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
        <div className="flex justify-center p-8">
          <Pagination
            page={meta_data?.page}
            count={Math.ceil(meta_data?.items / userTableMetaData?.page_size)}
            showFirstButton
            showLastButton
            onChange={handleChangePage}
          />
        </div>
      </div>
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
            handleClose();
            editIcon(openMenuDialog);
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
        <Typography variant="h6">Course Allocation</Typography>
        <Box className="m-12 flex flex-col justify-between gap-12 sm:flex-row">
          <div className="w-full">
            <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
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
                />
              )}
              onChange={(e, value: any) => setCourseId(value.course_id)}
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
