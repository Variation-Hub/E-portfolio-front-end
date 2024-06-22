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
import React, { useEffect, useState } from "react";
import {
  DangerButton,
  LoadingButton,
  SecondaryButton,
  SecondaryButtonOutlined,
} from "src/app/component/Buttons";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { tr } from "date-fns/locale";
import {
  createSupportDataAPI,
  deleteSupportHandler,
  getSupportDataAPI,
  selectSupportData,
  slice,
  updateSupportDataAPI,
} from "app/store/supportData";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import AlertDialog from "src/app/component/Dialogs/AlertDialog";
import { log } from "console";

// function createData(title: string, description: string, status: string) {
//   return {
//     title,
//     description,
//     status,
//   };
// }

const AddRequest = (props) => {
  const { supportData = {}, handleChange = () => { } } = props;

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
            value={supportData.title}
            onChange={handleChange}
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
            rows={6}
            value={supportData.description}
            onChange={handleChange}
          />
        </div>
      </Box>
    </>
  );
};

const Support = (props) => {
  const { data } = useSelector(selectUser);
  const { singleData, dataUpdatingLoadding } = useSelector(selectSupportData);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [dialogType, setDialogType] = useState(false);

  const [deleteId, setDeleteId] = useState("");

  const [supportData, setSupportData] = useState({
    request_id: data.user_id,
    title: "",
    description: "",
  });

  const deleteIcon = (id) => {
    setDeleteId(selectedRow.support_id);
  };

  const deleteConfromation = async () => {
    await dispatch(deleteSupportHandler(deleteId));
    dispatch(getSupportDataAPI({ page: 1, page_size: 10 }, data.user_id));
    setDeleteId("");
  };

  const dispatch: any = useDispatch();

  const clearSingleData = () => {
    dispatch(slice.setSingleData({}));
    setSupportData({
      request_id: data.user_id,
      title: "",
      description: "",
    });
  };
  const handleClickOpen = () => {
    setDialogType(true);
  };

  const handleCloseDialog = () => {
    setDialogType(null);
    clearSingleData();
  };

  const handleClick = (event, row) => {
    dispatch(slice.setSingleData(row));
    setSelectedRow(row);
    console.log(row);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
    clearSingleData();
  };

  const handleEdit = () => {
    setSupportData(singleData);
    handleClickOpen();
  };

  const support = useSelector(selectSupportData);

  useEffect(() => {
    dispatch(getSupportDataAPI({ page: 1, page_size: 10 }, data.user_id));
  }, [dispatch]);

  const handleSubmit = async () => {
    try {
      let response;
      response = await dispatch(createSupportDataAPI(supportData));
      dispatch(getSupportDataAPI({ page: 1, page_size: 10 }, data.user_id));
    } catch (err) {
      console.log(err);
    } finally {
      handleCloseDialog();
      handleClose();
    }
  };

  const handleUpdate = async () => {
    try {
      let response;
      response = await dispatch(updateSupportDataAPI(supportData));
      dispatch(getSupportDataAPI({ page: 1, page_size: 10 }, data.user_id));
    } catch (err) {
      console.log(err);
    } finally {
      handleCloseDialog();
      handleClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupportData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {support.data?.map((row) => (
                <TableRow
                  key={row.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "2px solid #F8F8F8" }}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "2px solid #F8F8F8" }}
                  >
                    {row.description}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "2px solid #F8F8F8" }}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: "2px solid #F8F8F8" }}
                  >
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

        <AlertDialog
          open={Boolean(deleteId)}
          close={() => deleteIcon("")}
          title="Delete Support?"
          content="Deleting this support will also remove all associated data and relationships. Proceed with deletion?"
          className="-224 "
          actionButton={
            dataUpdatingLoadding ? (
              <LoadingButton />
            ) : (
              <DangerButton
                onClick={deleteConfromation}
                name="Delete Support"
              />
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
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              deleteIcon(selectedRow);
            }}
          >
            Delete
          </MenuItem>
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
          <DialogContent>
            <AddRequest supportData={supportData} handleChange={handleChange} />
          </DialogContent>
          <DialogActions>
            {dataUpdatingLoadding ?
              <LoadingButton />
              :
              <>
                <SecondaryButtonOutlined
                  onClick={handleCloseDialog}
                  name="Cancel"
                />
                <SecondaryButton
                  name={Object.keys(singleData).length !== 0 ? "Edit" : "Save"}
                  onClick={
                    Object.keys(singleData).length !== 0
                      ? handleUpdate
                      : handleSubmit
                  }
                />
              </>
            }
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Support;
