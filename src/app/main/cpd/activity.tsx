import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Stack } from "@mui/system";
import { Dialog, IconButton, Menu, MenuItem, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Cpd from "./cpd";
import AlertDialog from "src/app/component/Dialogs/AlertDialog";
import { DangerButton, LoadingButton, SecondaryButtonOutlined } from "src/app/component/Buttons";
import { deleteActivityHandler, getCpdPlanningAPI, selectCpdPlanning, slice } from "app/store/cpdPlanning";
import { selectUser } from "app/store/userSlice";

interface Column {
  id:
  | "date"
  | "learning_objective"
  | "activity"
  | "comment"
  | "support_you"
  | "completed"
  | "added_by"
  | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "date", label: "Date", minWidth: 10 },
  { id: "learning_objective", label: "Learning Objective", minWidth: 10 },
  { id: "activity", label: "Activity", minWidth: 10 },
  { id: "comment", label: "Comment", minWidth: 10 },
  { id: "support_you", label: "Who could support you", minWidth: 10 },
  { id: "completed", label: "Completed", minWidth: 10 },
  { id: "added_by", label: "Added By", minWidth: 10 },
  { id: "action", label: "Action", minWidth: 10 },
];

const Activity = (props) => {
  const {
    setUpdateData = () => { },
    dataUpdatingLoadding,
  } = props;

  const [deleteId, setDeleteId] = useState("");
  const [openMenuDialog, setOpenMenuDialog] = useState<any>({});
  const [edit, setEdit] = useState("view");
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const dispatch: any = useDispatch();
  const { data } = useSelector(selectUser);
  const cpdPlanningData = useSelector(selectCpdPlanning);

  useEffect(() => {
    dispatch(getCpdPlanningAPI(data.user_id));
  }, [dispatch, data.user_id]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const oopen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const editIcon = (edit, value) => {
    setEdit(edit);
    setUpdateData(openMenuDialog);
    setOpen(true);

    const singleData = {
      id: openMenuDialog?.id || "",
      year: cpdPlanningData.data?.year || "",
      date: openMenuDialog?.date || "",
      learning_objective: openMenuDialog?.learning_objective || "",
      activity: openMenuDialog?.activity || "",
      comment: openMenuDialog?.comment || "",
      support_you: openMenuDialog?.support_you || "",
      timeTake: {
        day: openMenuDialog?.timeTake?.day || 0,
        hours: openMenuDialog?.timeTake?.hours || 0,
        minutes: openMenuDialog?.timeTake?.minutes || 0,
      },
      completed: openMenuDialog?.completed || "",
      files: openMenuDialog?.files || [],
    };
    dispatch(slice.setCpdSingledata(singleData));
    dispatch(slice.setDialogType(value));
  };

  const deleteIcon = (id) => {
    setDeleteId(id.id);
  };

  const openMenu = (e, id) => {
    handleClick(e);
    setOpenMenuDialog(id);
  };

  const deleteConfromation = async () => {
    await dispatch(deleteActivityHandler(deleteId));
    setDeleteId("");
  };

  const handleClose = () => {
    dispatch(slice.setCpdSingledata({}));
    setOpen(false);
    setAnchorEl(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const allActivities = cpdPlanningData.data.flatMap(item => item.activities);
  const paginatedData = allActivities.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pageCount = Math.ceil(allActivities.length / rowsPerPage);

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
              {paginatedData.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="fixed bottom-0 left-0 w-full flex justify-center py-4 mb-14">
          <Stack spacing={2}>
            <Pagination
              count={pageCount}
              variant="outlined"
              shape="rounded"
              page={page}
              onChange={handlePageChange}
              siblingCount={1}
              boundaryCount={1}
            />
          </Stack>
        </div>
      </div>
      <AlertDialog
        open={Boolean(deleteId)}
        close={() => deleteIcon("")}
        title="Delete Activity?"
        content="Deleting this activity will also remove all associated data and relationships. Proceed with deletion?"
        className="-224 "
        actionButton={
          dataUpdatingLoadding ? (
            <LoadingButton />
          ) : (
            <DangerButton onClick={deleteConfromation} name="Delete Activity" />
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
        open={oopen}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            editIcon("view", "addNew");
          }}
        >
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            editIcon("edit", "addNew");
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

export default Activity;
