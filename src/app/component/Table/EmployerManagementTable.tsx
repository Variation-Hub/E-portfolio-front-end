import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Avatar, IconButton, Pagination } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Style from "./style.module.css";
import { useDispatch } from "react-redux";
import { deleteUserHandler, fetchUserAPI } from "app/store/userManagement";
import { userTableMetaData } from "src/app/contanst/metaData";
import AlertDialog from "../Dialogs/AlertDialog";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import {
  Menu,
  MenuItem,
  Dialog,
  Typography,
  TextField,
  Autocomplete,
  Box,
} from "@mui/material";
import {
  DangerButton,
  LoadingButton,
  SecondaryButton,
  SecondaryButtonOutlined,
} from "../Buttons";
import {
  courseAllocationAPI,
  selectCourseManagement,
} from "app/store/courseManagement";
import { Stack } from "@mui/system";
import { getRandomColor } from "src/utils/randomColor";
import { deleteEmployerHandler, getEmployerAPI } from "app/store/employer";
import EmployerDetails from "src/app/main/admin/employerManagement/userDetails";

export default function EmployerManagementTable(props) {
  const {
    columns,
    rows,
    handleOpen = () => { },
    meta_data,
    dataUpdatingLoadding,
  } = props;

  const [deleteId, setDeleteId] = useState("");
  const [openMenuDialog, setOpenMenuDialog] = useState();
  const [editEmployer, setEditEmployer] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch: any = useDispatch();

  const { data } = useSelector(selectCourseManagement);


  const [employerData, setEmployerData] = useState({
    employer_name: "",
    msi_employer_id: "",
    business_department: "",
    business_location: "",
    branch_code: "",
    address_1: "",
    address_2: "",
    city: "",
    country: "",
    postal_code: "",
    edrs_number: "",
    business_category: "",
    number: "",
    external_data_code: "",
    telephone: "",
    website: "",
    key_contact: "",
    email: "",
    business_description: "",
    comments: "",
  });

  const handleDataUpdate = (e) => {
    const { name, value } = e.target;
    setEmployerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setEditEmployer(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(
      getEmployerAPI({ page: newPage, page_size: userTableMetaData.page_size })
    );
  };

  const openMenu = (e, id) => {
    handleClick(e);
    setOpenMenuDialog(id);

  };

  const editIcon = () => {
    setEmployerData(openMenuDialog);
    handleOpen();
  };

  const deleteIcon = (id) => {
    setDeleteId(id?.employer_id);
  };

  const closeEditEmployer = () => {
    setEditEmployer(false);
  };

  const deleteConfromation = async () => {
    await dispatch(
      deleteEmployerHandler(deleteId)
    );
    setDeleteId("");
  };


  return (
    <>
      <div style={{ width: "100%", overflow: "hidden", marginTop: "0.5rem" }}>
        <TableContainer sx={{ maxHeight: 530, minHeight: 530 }}>
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
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.user_id}
                  >
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
                              onClick={(e) => openMenu(e, row)}
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
                                  src={row?.avatar?.url}
                                  sx={{
                                    marginRight: "8px",
                                    width: "24px",
                                    height: "24px",
                                    backgroundColor: getRandomColor(row?.user_name?.toLowerCase().charAt(0))
                                  }}
                                />
                                {value} {row["last_name"]}
                              </>
                            ) : (
                              value || "-"
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
        <Stack
          spacing={2}
          className="flex justify-center items-center w-full mt-14"
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
      <AlertDialog
        open={Boolean(deleteId)}
        close={() => deleteIcon("")}
        title="Delete employer?"
        content="Deleting this employer will also remove all associated data and relationships. Proceed with deletion?"
        actionButton={
          dataUpdatingLoadding ? (
            <LoadingButton />
          ) : (
            <DangerButton onClick={deleteConfromation} name="Delete employer" />
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
            setEditEmployer(true);
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
        {/* <MenuItem
          onClick={() => {
            handleClose();
            setEditEmployer(true);
          }}
        >
          Course Allocation
        </MenuItem> */}
      </Menu>
      <Dialog
        open={editEmployer}
        onClose={closeEditEmployer}
        fullScreen
        fullWidth
        sx={{
          ".MuiDialog-paper": {
            borderRadius: "4px",
            padding: "1rem",
          },
        }}
      >
        <EmployerDetails
          setEditEmployer={setEditEmployer}
          employerData={employerData}
          setEmployerData={setEmployerData}
          handleDataUpdate={handleDataUpdate}
        />
      </Dialog>
    </>
  );
}
