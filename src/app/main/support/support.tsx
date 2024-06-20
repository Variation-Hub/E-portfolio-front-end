import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/system";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useState } from "react";
import {
  SecondaryButton,
  SecondaryButtonOutlined,
} from "src/app/component/Buttons";
import AddRequest from "./addRequest";

function createData(title: string, description: string, status: string) {
  return {
    title,
    description,
    status,
  };
}

const rows = [
  createData(
    "ABC",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
    "Active"
  ),
  createData(
    "ABC",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
    "Active"
  ),
  createData(
    "ABC",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
    "Active"
  ),
  createData(
    "ABC",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
    "Inactive"
  ),
  createData(
    "ABC",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
    "Inactive"
  ),
  createData(
    "ABC",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
    "Inactive"
  ),
  createData(
    "ABC",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
    "Active"
  ),
  createData(
    "ABC",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
    "Active"
  ),
  createData(
    "ABC",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
    "Active"
  ),
  createData(
    "ABC",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
    "Active"
  ),
  createData(
    "ABC",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
    "Active"
  ),
  // createData(
  //   "ABC",
  //   "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
  //   "Active"
  // ),
  // createData(
  //   "ABC",
  //   "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
  //   "Lorem ips"
  // ),
  // createData(
  //   "ABC",
  //   "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
  //   "Lorem ips"
  // ),
  // createData(
  //   "ABC",
  //   "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
  //   "Lorem ips"
  // ),
  // createData(
  //   "ABC",
  //   "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
  //   "Lorem ips"
  // ),
  // createData(
  //   "ABC",
  //   "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
  //   "Lorem ips"
  // ),
  // createData(
  //   "ABC",
  //   "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, neque sequi.",
  //   "Lorem ips"
  // ),
];

const Support = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogType, setDialogType] = useState(false);

  const handleClickOpen = () => {
    setDialogType(true);
  };

  const handleCloseDialog = () => {
    setDialogType(null);
  };

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = () => {
    console.log("Edit row:", selectedRow);
    handleClose();
  };

  const handleDelete = () => {
    console.log("Delete row:", selectedRow);
    handleClose();
  };
  return (
    <>
      <div className="m-10">
        <div className="flex justify-end mb-10">
          <SecondaryButton
            name="Add Request"
            startIcon={<AddIcon sx={{ mx: -0.5 }} />}
            onClick={() => handleClickOpen()}
          />
        </div>
        <TableContainer component={Paper} className="rounded-6">
          <Table
            sx={{ minWidth: 650, height: "100%" }}
            size="small"
            aria-label="simple table"
          >
            <TableHead className="bg-[#F8F8F8]">
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="left" >Description</TableCell>
                <TableCell align="left">Status&nbsp;</TableCell>
                <TableCell align="left">Action&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ borderBottom: '2px solid #F8F8F8' }}>
                    {row.title}
                  </TableCell>
                  <TableCell align="left" sx={{ borderBottom: '2px solid #F8F8F8' }}>{row.description}</TableCell>
                  <TableCell align="left" sx={{ borderBottom: '2px solid #F8F8F8' }}>{row.status}</TableCell>
                  <TableCell align="left" sx={{ borderBottom: '2px solid #F8F8F8' }}>
                    <IconButton
                      size="small"
                      sx={{ color: "#5B718F", marginRight: "4px" }}
                      onClick={(e) => handleClick(e, row)}
                    >
                      <MoreHorizIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Stack
            spacing={2}
            className="flex justify-center items-center w-full my-12"
          >
            <Pagination count={3} variant="outlined" shape="rounded" />
          </Stack>
        </TableContainer>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>

        <Dialog
          open={dialogType}
          onClose={handleCloseDialog}
          sx={{
            ".MuiDialog-paper": {
              borderRadius: "4px",
              width: "100%",
            },
          }}
        >
          <DialogContent>{<AddRequest />}</DialogContent>
          <DialogActions>
            <SecondaryButtonOutlined
              onClick={handleCloseDialog}
              name="Cancel"
            />
            <SecondaryButton name="Save" />
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Support;
