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
import {
  createYourInnovationAPI,
  deleteInnovationHandler,
  getYourInnovationAPI,
  selectYourInnovation,
  slice,
  updateYourInnovationAPI,
} from "app/store/yourInnovation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import AlertDialog from "src/app/component/Dialogs/AlertDialog";

const AddInnocations = (props) => {
  const { yourInnovation = {}, handleChange = () => { } } = props;

  return (
    <>
      <Box className="flex flex-col justify-between gap-12 p-0">
        <div>
          <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem" }}>
            Topic
          </Typography>
          <TextField
            name="topic"
            size="small"
            placeholder="Add your topic"
            fullWidth
            multiline
            value={yourInnovation.topic}
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
            value={yourInnovation.description}
            onChange={handleChange}
          />
        </div>
      </Box>
    </>
  );
};

const ProposeYourInnovations = (props) => {
  const { data } = useSelector(selectUser);
  const { singleData, dataUpdatingLoadding } = useSelector(selectYourInnovation);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [dialogType, setDialogType] = useState(false);

  const [deleteId, setDeleteId] = useState("");

  const [yourInnovation, setYourInnovation] = useState({
    innovation_propose_by_id: data.user_id,
    topic: "",
    description: "",
  });

  const deleteIcon = (id) => {
    setDeleteId(selectedRow.id);
    console.log(selectedRow);

  };

  const deleteConfromation = async () => {
    await dispatch(deleteInnovationHandler(deleteId));
    dispatch(getYourInnovationAPI({ page: 1, page_size: 10 }, data.user_id));
    setDeleteId("");
  };

  const dispatch: any = useDispatch();

  const clearSingleData = () => {
    dispatch(slice.setSingleData({}));
    setYourInnovation({
      innovation_propose_by_id: data.user_id,
      topic: "",
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
    setYourInnovation(singleData);
    handleClickOpen();
  };

  const innovation = useSelector(selectYourInnovation);

  useEffect(() => {
    dispatch(getYourInnovationAPI({ page: 1, page_size: 10 }, data.user_id));
  }, [dispatch]);

  const handleSubmit = async () => {
    try {
      let response;
      response = await dispatch(createYourInnovationAPI(yourInnovation));
      dispatch(getYourInnovationAPI({ page: 1, page_size: 10 }, data.user_id));
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
      response = await dispatch(updateYourInnovationAPI(yourInnovation));
      dispatch(getYourInnovationAPI({ page: 1, page_size: 10 }, data.user_id));
    } catch (err) {
      console.log(err);
    } finally {
      handleCloseDialog();
      handleClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setYourInnovation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="m-10">
        <div className="flex justify-end mb-10">
          <SecondaryButton
            name="Add Innovation"
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
                <TableCell>Topic</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {innovation.data?.map((row) => (
                <TableRow
                  key={row.topic}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "2px solid #F8F8F8" }}
                  >
                    {row.topic}
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
          topic="Delete Your Innovation?"
          content="Deleting this your innovation will also remove all associated data and relationships. Proceed with deletion?"
          className="-224 "
          actionButton={
            dataUpdatingLoadding ? (
              <LoadingButton />
            ) : (
              <DangerButton
                onClick={deleteConfromation}
                name="Delete Your Innovation"
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
            <AddInnocations
              yourInnovation={yourInnovation}
              handleChange={handleChange}
            />
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

export default ProposeYourInnovations;
