import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Stack } from "@mui/system";
import { Dialog, IconButton, Menu, MenuItem, Pagination } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import { deleteReflectionHandler, getCpdPlanningAPI, selectCpdPlanning, slice } from "app/store/cpdPlanning";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Cpd from "./cpd";
import AlertDialog from "src/app/component/Dialogs/AlertDialog";
import { DangerButton, LoadingButton, SecondaryButtonOutlined } from "src/app/component/Buttons";


interface Column {
  id:
  | "learning_objective"
  | "what_went_well"
  | "differently_next_time"
  | "feedback"
  // | "files"
  | "added_by"
  | "action"
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "learning_objective", label: "Learning Objective", minWidth: 10 },
  { id: "what_went_well", label: "What went well", minWidth: 10 },
  { id: "differently_next_time", label: "What would you do differently", minWidth: 10 },
  { id: "feedback", label: "How could i share this learning", minWidth: 10 },
  // { id: "files", label: "Files", minWidth: 10 },
  { id: "added_by", label: "Added by", minWidth: 10 },
  { id: "action", label: "Action", minWidth: 10 },
  // {
  //   id: "differentlynexttime",
  //   label: "Differently next time",
  //   minWidth: 20,
  //   align: "right",
  //   format: (value: number) => value.toLocaleString("en-US"),
  // },
  // {
  //   id: "action",
  //   label: "Action",
  //   minWidth: 70,
  //   align: "right",
  //   format: (value: number) => value.toLocaleString("en-US"),
  // },
];

const Reflection = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const {
    setUpdateData = () => { },
    dataUpdatingLoadding,
  } = props;

  const [deleteId, setDeleteId] = useState("");
  const [openMenuDialog, setOpenMenuDialog] = useState<any>({});
  const [edit, setEdit] = useState("view");

  const [open, setOpen] = useState(false);

  const dispatch: any = useDispatch();
  const { data } = useSelector(selectUser);
  const cpdPlanningData = useSelector(selectCpdPlanning);

  useEffect(() => {
    dispatch(getCpdPlanningAPI(data.user_id));
  }, [dispatch]);

  // console.log(cpdPlanningData.data.map(item => item.activities));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const oopen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const editIcon = (edit, value) => {
    setEdit(edit)
    setUpdateData(openMenuDialog);
    setOpen(true);
    // const data = cpdPlanningData?.data?.find((item) => item.id === openMenuDialog);
    const singleData = {
      id: openMenuDialog?.id || "",
      completed: openMenuDialog?.completed || "",
      learning_objective: openMenuDialog?.learning_objective || "",
      what_went_well: openMenuDialog?.what_went_well || "",
      differently_next_time: openMenuDialog?.differently_next_time || "",
      feedback: openMenuDialog?.feedback || "",
      files: openMenuDialog?.files || [],
    };
    dispatch(slice.setCpdSingledata(singleData));
    dispatch(slice.setDialogType(value));
    console.log(data);
    console.log(singleData);
  };

  const deleteIcon = (id) => {
    setDeleteId(id.id);
  };

  const openMenu = (e, id) => {
    handleClick(e);
    setOpenMenuDialog(id);
  };

  const deleteConfromation = async () => {
    await dispatch(
      deleteReflectionHandler(deleteId)
    );
    setDeleteId("");
  };


  const handleClose = () => {
    dispatch(slice.setCpdSingledata({}));
    setOpen(false);
    setAnchorEl(null);
  };

  console.log(cpdPlanningData.data);

  return (
    <>
      <div>
        <TableContainer sx={{ maxHeight: 440 }} className="-m-12">
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#F8F8F8",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cpdPlanningData?.data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((item) => (
                item?.reflections?.map(row => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    //   key={row.whosupportyou}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : column.id === "action" ?
                                <IconButton
                                  size="small"
                                  sx={{ color: "#5B718F", marginRight: "4px" }}
                                  onClick={(e) => openMenu(e, row)}
                                >
                                  <MoreHorizIcon fontSize="small" />
                                </IconButton>
                                : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        {/* <div className="fixed bottom-0 left-0 w-full flex justify-center py-4 mb-14">
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div> */}
        <div className="fixed bottom-0 left-0 w-full flex justify-center py-4 mb-14">
          <Stack spacing={2}>
            <Pagination count={3} variant="outlined" shape="rounded" />
          </Stack>
        </div>
      </div>
      <AlertDialog
        open={Boolean(deleteId)}
        close={() => deleteIcon("")}
        title="Delete Reflection?"
        content="Deleting this reflection will also remove all associated data and relationships. Proceed with deletion?"
        className="-224 "
        actionButton={
          dataUpdatingLoadding ? (
            <LoadingButton />
          ) : (
            <DangerButton onClick={deleteConfromation} name="Delete Reflection" />
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
          "aria-labelledby": "long-addReflection",
        }}
        anchorEl={anchorEl}
        open={oopen}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            editIcon("view", "addReflection");
          }}
        >
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            editIcon("edit", "addReflection");
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
      </Menu>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        sx={{
          ".MuiDialog-paper": {
            borderRadius: "4px",
            padding: "1rem",
          },
        }}
      >
        <Cpd edit={edit} handleClose={handleClose} />
      </Dialog>
    </>
  );
};

export default Reflection;
