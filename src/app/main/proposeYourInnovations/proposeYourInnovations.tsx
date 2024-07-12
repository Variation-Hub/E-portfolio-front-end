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
  Drawer,
  Tooltip,
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
  createInnovationCommentAPI,
  createYourInnovationAPI,
  deleteInnovationHandler,
  getInnovationCommentAPI,
  getYourInnovationAPI,
  selectYourInnovation,
  slice,
  updateYourInnovationAPI,
} from "app/store/yourInnovation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import AlertDialog from "src/app/component/Dialogs/AlertDialog";
import { Link } from "react-router-dom";
import FuseLoading from "@fuse/core/FuseLoading";
import DataNotFound from "src/app/component/Pages/dataNotFound";

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
  const { singleData, dataUpdatingLoadding, dataFetchLoading } = useSelector(selectYourInnovation);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [dialogType, setDialogType] = useState(null);
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false); // State for chat drawer
  const [chatMessages, setChatMessages] = useState([]); // State to store chat messages
  const [newMessage, setNewMessage] = useState("");

  const [deleteId, setDeleteId] = useState("");

  const [yourInnovation, setYourInnovation] = useState({
    innovation_propose_by_id: data.user_id,
    topic: "",
    description: "",
  });

  const deleteIcon = (id) => {
    setDeleteId(selectedRow?.id);
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
  const handleClickOpen = (type) => {
    setDialogType(type);
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
    setDialogType(null);
    setDeleteId("");
    // clearSingleData();
  };

  const handleEdit = () => {
    setYourInnovation(singleData);
    handleClickOpen('edit');
  };

  const handleView = async () => {
    try {
      const response = await dispatch(getInnovationCommentAPI({ page: 1, page_size: 10 }, selectedRow?.id));
    } catch (error) {
      console.error(error);
    }

    setYourInnovation(singleData);
    setChatDrawerOpen(true);
  };


  const handleDrawerClose = () => {
    setChatDrawerOpen(false);
    clearSingleData();
  };

  const innovation = useSelector(selectYourInnovation);

  useEffect(() => {
    dispatch(getYourInnovationAPI({ page: 1, page_size: 10 }, data.user_id));
  }, [dispatch]);

  const handleSubmit = async () => {
    try {
      let response;
      response = await dispatch(createYourInnovationAPI(yourInnovation));
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

  const handleSendChatMessage = async () => {
    if (newMessage.trim() !== "") {
      const isAdmin = data.roles.includes('Admin');
      const messageType = isAdmin ? 'Response' : 'Reply';

      const newChatMessage = {
        innovation_id: selectedRow.id,
        type: messageType,
        description: newMessage,
      };
      console.log(chatMessages);

      try {
        let response;
        response = await dispatch(createInnovationCommentAPI(newChatMessage));
        dispatch(getInnovationCommentAPI({ page: 1, page_size: 10 }, selectedRow?.id))
      } catch (err) {
        console.log(err);
      } finally {
        // handleCloseDialog();
        handleClose();
      }

      setChatMessages(singleData);
      setNewMessage("");
    }
  };

  const isAdmin = data.roles.includes('Admin');

  const isInnovations = Object.values(yourInnovation).find(data => data === "") === undefined;

  return (
    <>
      <div className="m-10">
        <Box className="flex justify-end mb-10"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <SecondaryButton
            name="Add Innovation"
            className="py-6 px-12 mb-10"

            startIcon={<AddIcon sx={{ mx: -0.5 }} />}
            onClick={() => handleClickOpen('add')}
          />
        </Box>
        <TableContainer sx={{ maxHeight: 500 }} >
          {dataFetchLoading ? (
            <FuseLoading />
          ) : innovation.data.length ? (
            <Table
              sx={{ minWidth: 650, height: "100%" }}
              size="small"
              aria-label="simple table"
            >
              <TableHead className="bg-[#F8F8F8]">
                <TableRow>
                  <TableCell align="left" sx={{ maxWidth: "4rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Topic</TableCell>
                  <TableCell align="left" sx={{ maxWidth: "9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Description</TableCell>
                  <TableCell align="left" sx={{ width: "15rem" }}>Status</TableCell>
                  <TableCell align="left" sx={{ width: "15rem" }}>Action</TableCell>
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
                      sx={{ borderBottom: "2px solid #F8F8F8", maxWidth: "4rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                      {row.topic}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "2px solid #F8F8F8", maxWidth: "9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                      {row.description}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "2px solid #F8F8F8", width: "15rem" }}
                    >
                      {row.status}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "2px solid #F8F8F8", width: "15rem" }}
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
          ) : (
            <div
              className="flex flex-col justify-center items-center gap-10 "
              style={{ height: "94%" }}
            >
              <DataNotFound width="25%" />
              <Typography variant="h5">No data found</Typography>
              <Typography variant="body2" className="text-center">
                It is a long established fact that a reader will be <br />
                distracted by the readable content.
              </Typography>
            </div>
          )}
        </TableContainer>
        <div className="fixed bottom-0 left-0 w-full flex justify-center py-4 mb-14">
          <Stack
            spacing={2}
            className="flex justify-center items-center w-full my-12"
          >
            <Pagination count={3} variant="outlined" shape="rounded" />
          </Stack>
        </div>


        <AlertDialog
          open={Boolean(deleteId)}
          close={() => { deleteIcon(""); handleClose(); }}
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
              onClick={() => {
                handleClose();
              }}
              name="Cancel"
            />
          }
        />

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              handleView();
            }}>
            View
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleEdit();
            }}>
            Edit
          </MenuItem>
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
          open={dialogType === 'add' || dialogType === 'edit'}
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
                  onClick={handleClose}
                  name="Cancel"
                />
                <SecondaryButton
                  name={Object.keys(singleData).length !== 0 ? "Edit" : "Save"}
                  onClick={
                    Object.keys(singleData).length !== 0
                      ? handleUpdate
                      : handleSubmit
                  }
                  disable={!isInnovations}
                />
              </>
            }
          </DialogActions>
        </Dialog>

        {/* Chat Drawer */}
        <Drawer
          anchor="right"
          open={chatDrawerOpen}
          onClose={() => setChatDrawerOpen(false)}
          sx={{ width: "100%", "& .MuiDrawer-paper": { width: "50%" } }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box p={2}>
              <Tooltip title={yourInnovation.topic}>
                <Typography variant="subtitle1" className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{yourInnovation.topic}</Typography>
              </Tooltip>
              <Tooltip title={yourInnovation.description}>
                <Typography variant="subtitle1" className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">{yourInnovation.description}</Typography>
              </Tooltip>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
              {singleData.comment?.map((message) => (
                <Box key={message.id} mb={2}>
                  <Typography
                    className={
                      (isAdmin && message.type == 'Response') || (!isAdmin && message.type == 'Reply')
                        ? 'text-end'
                        : 'text-start'
                    }
                  >
                    {message.description}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box p={2} mt="auto">
              <Box sx={{ display: 'flex' }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Start your chat..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <SecondaryButton
                  sx={{ ml: 2 }}
                  className="ml-10"
                  onClick={handleSendChatMessage}
                  name="Send"
                />
              </Box>
            </Box>
          </Box>
        </Drawer>

      </div >
    </>
  );
};

export default ProposeYourInnovations;
