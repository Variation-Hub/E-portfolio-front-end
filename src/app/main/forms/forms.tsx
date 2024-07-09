import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
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
import NorthEastIcon from '@mui/icons-material/NorthEast';
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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import AlertDialog from "src/app/component/Dialogs/AlertDialog";
import FuseLoading from "@fuse/core/FuseLoading";
import DataNotFound from "src/app/component/Pages/dataNotFound";
import { FormBuilder as FormBuilderIo } from "react-formio";
import "formiojs/dist/formio.full.css";
import './style.css'
import { useNavigate } from "react-router-dom";
import { deleteFormHandler, getFormDataAPI, getUserFormDataAPI, selectFormData, slice } from "app/store/formData";
import { userTableMetaData } from "src/app/contanst/metaData";
import { UserRole } from "src/enum";

// const AddForms = (props) => {
//   // const [formIoData, setFormData] = useState({
//   //   display: "form",
//   //   components: []
//   // })
//   // const printResult = () => {

//   //   Formio.createForm(document.getElementById("formio-result"), {
//   //   }).then((form) => {
//   //     console.log(form.component.components);
//   //     form.on("submit", (data) => console.log("submit", data));
//   //   });
//   //   // }
//   // };

//   return (
//     <FormBuilderIo
//       // form={formIoData}
//       // onChange={schema => setFormData(schema)}
//       // onSubmit={(data) => {
//       //   console.log(data);
//       // }}
//       // saveForm={(data) => setFormData(data)}
//       // saveText="Save Form"
//       // onSubmitDone={(data) => console.log(data)}
//     />
//   );
// }

const Forms = (props) => {
  const { data } = useSelector(selectUser);
  const { singleData, meta_data, dataUpdatingLoadding, dataFetchLoading } = useSelector(selectFormData);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [dialogType, setDialogType] = useState(false);

  const [deleteId, setDeleteId] = useState("");

  // const [supportData, setSupportData] = useState({
  //   request_id: data.user_id,
  //   title: "",
  //   description: "",
  // });

  const deleteIcon = (id) => {
    setDeleteId(selectedRow?.id);
  };

  const deleteConfromation = async () => {
    await dispatch(deleteFormHandler(deleteId));
    dispatch(getFormDataAPI({ page: 1, page_size: 10 }, ""));
    setDeleteId("");
  };

  const dispatch: any = useDispatch();

  // const clearSingleData = () => {
  //   dispatch(slice.setSingleData({}));
  //   setSupportData({
  //     request_id: data.user_id,
  //     title: "",
  //     description: "",
  //   });
  // };

  const navigate = useNavigate();

  const handleClickOpen = () => {
    // setDialogType(true);
    navigate("/forms/create");
  };

  // const handleCloseDialog = () => {
  //   // setDialogType(null);
  //   clearSingleData();
  // };

  const handleClick = (event, row) => {
    dispatch(slice.setSingleData(row));
    setSelectedRow(row);
    setAnchorEl(event.currentTarget);
  };

  const   handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = (edit) => {
    dispatch(slice.setMode(edit));
    navigate("/forms/create");
    // setSupportData(singleData);
    // handleClickOpen();
  };

  const handleApply = (e, row, edit) => {
    dispatch(slice.setSingleData(row));
    setSelectedRow(row);
    dispatch(slice.setMode(edit));
    navigate("/forms/create");
  }

  const formdata = useSelector(selectFormData);

  useEffect(() => {
    dispatch(getFormDataAPI({ page: 1, page_size: 10 }, ""));
  }, [dispatch]);


  // const handleUpdate = async () => {
  //   try {
  //     let response;
  //     response = await dispatch(updateSupportDataAPI(supportData));
  //     dispatch(getSupportDataAPI({ page: 1, page_size: 10 }, data.user_id));
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     handleCloseDialog();
  //     handleClose();
  //   }
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setSupportData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(
      getFormDataAPI({ page: newPage, page_size: userTableMetaData.page_size })
    );
  };

  const formatDate = (date) => {
    if (!date) return '';
    const formattedDate = date.substr(0, 10);
    return formattedDate;
  };

  return (
    <>
      <Grid className="m-10" sx={{ minHeight: 600 }}>
        {data.role ==="Admin" && <Box className="flex justify-end mb-10"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <SecondaryButton
            name="Add Forms"
            className="p-12 mb-10"
            startIcon={<AddIcon sx={{ mx: -0.5 }} />}
            onClick={() => handleClickOpen()}
          />
        </Box>}
        <div >
          <TableContainer sx={{ maxHeight: 530 }} >
            {dataFetchLoading ? (
              <FuseLoading />
            ) : formdata.data.length ? (
              <Table
                sx={{ minWidth: 650, heighFaddt: "100%" }}
                size="small"
                aria-label="simple table"
              >
                <TableHead className="bg-[#F8F8F8]">
                  <TableRow>
                    <TableCell>Form Name</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">Created At</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formdata.data?.map((row) => (
                    <TableRow
                      key={row.form_name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ borderBottom: "2px solid #F8F8F8" }}
                      >
                        {row.form_name}
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
                        {row.type}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderBottom: "2px solid #F8F8F8" }}
                      >
                        {formatDate(row.created_at)}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderBottom: "2px solid #F8F8F8" }}
                      >
                        {data.role === UserRole.Admin ?
                        <IconButton
                          size="small"
                          sx={{ color: "#5B718F", marginRight: "4px" }}
                          onClick={(e) => handleClick(e, row)}
                        >
                          <MoreHorizIcon fontSize="small" />
                        </IconButton>
                        :
                        <IconButton
                          size="small"
                          sx={{ color: "#5B718F", marginRight: "4px" }}
                          onClick={(e) => handleApply(e, row, "edit")}
                        >
                          <NorthEastIcon fontSize="small" />
                        </IconButton>
                        }
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
          <div className="fixed bottom-0 left-0 w-full flex justify-center py-4">
            <Stack
              spacing={2}
              className="flex justify-center items-center w-full my-12"
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
        </div>

        <AlertDialog
          open={Boolean(deleteId)}
          close={() => deleteIcon("")}
          title="Delete Form?"
          content="Deleting this form will also remove all associated data and relationships. Proceed with deletion?"
          className="-224 "
          actionButton={
            dataUpdatingLoadding ? (
              <LoadingButton />
            ) : (
              <DangerButton
                onClick={deleteConfromation}
                name="Delete Form"
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
          <MenuItem
            onClick={() => {
              handleEdit("view");
              handleClose();
            }}>
            View
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleEdit("edit");
              handleClose();
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

      </Grid>
    </>
  );
};

export default Forms;
