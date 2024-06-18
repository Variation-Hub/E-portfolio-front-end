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
import { getCpdPlanningAPI, selectCpdPlanning, slice } from "app/store/cpdPlanning";
import { selectUser } from "app/store/userSlice";
import { data } from "src/app/component/Chart/doughnut";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Cpd from "./cpd";

interface Column {
  id:
  | "year"
  | "start_date"
  | "end_date"
  | "cpd_plan"
  | "impact_on_you"
  | "impact_on_colleagues"
  | "impact_on_managers"
  | "impact_on_organisation"
  | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "year", label: "Year", minWidth: 10 },
  { id: "start_date", label: "Start Date", minWidth: 10 },
  { id: "end_date", label: "End Date", minWidth: 10 },
  {
    id: "cpd_plan",
    label: "CPD Plan",
    minWidth: 20,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "impact_on_you",
    label: "On You",
    minWidth: 20,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "impact_on_colleagues",
    label: "Colleagues",
    minWidth: 20,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "impact_on_managers",
    label: "Managers",
    minWidth: 70,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "impact_on_organisation",
    label: "Organization",
    minWidth: 70,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 70,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

const Activity = (props) => {

  const {
    setUpdateData = () => { },
  } = props;

  // const [deleteId, setDeleteId] = useState("");
  const [openMenuDialog, setOpenMenuDialog] = useState("");
  const [edit, setEdit] = useState("view");

  const [open, setOpen] = useState(false);

  const dispatch: any = useDispatch();
  const { data } = useSelector(selectUser);
  const cpdPlanningData = useSelector(selectCpdPlanning);

  useEffect(() => {
    dispatch(getCpdPlanningAPI(data.user_id));
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const oopen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const editIcon = (edit, value) => {
    setEdit(edit)
    setUpdateData(openMenuDialog);
    setOpen(true);
    const data = cpdPlanningData?.data?.find((item) => item.id === openMenuDialog);
    const singleData = {
      id: data?.id || "",
      year: data?.year || "",
      start_date: data?.start_date || "",
      end_date: data?.end_date || "",
      cpd_plan: data?.cpd_plan || "",
      impact_on_you: data?.impact_on_you || "",
      impact_on_colleagues: data?.impact_on_colleagues || "",
      impact_on_managers: data?.impact_on_managers || "",
      impact_on_organisation: data?.impact_on_organisation || "",
      activities: data?.activities || "",
      evaluations: data?.evaluations || "",
      reflections: data?.reflections || "",
    };
    dispatch(slice.setCpdSingledata(singleData));
    dispatch(slice.setDialogType(value));
    console.log(singleData);
  };

  // const deleteIcon = (id) => {
  //   setDeleteId(id);
  // };

  const openMenu = (e, id) => {
    handleClick(e);
    setOpenMenuDialog(id);
  };

  // const deleteConfromation = async () => {
  //   await dispatch(
  //     deleteCourseHandler(deleteId, meta_data, search_keyword, search_role)
  //   );
  //   setDeleteId("");
  // };


  const handleClose = () => {
    dispatch(slice.setCpdSingledata({}));
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }} className="-m-12">
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#F8F8F8",
                  }}
                  className="text-left "
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cpdPlanningData?.data?.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}

                >
                  {columns?.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} className="text-left ">
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : column.id === "action" ?
                            <IconButton
                              size="small"
                              sx={{ color: "#5B718F", marginRight: "4px" }}
                              onClick={(e) => openMenu(e, row.id)}
                            >
                              <MoreHorizIcon fontSize="small" />
                            </IconButton>
                            : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
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
            editIcon("view", "addPlan");
          }}
        >
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            editIcon("edit", "addPlan");
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
        // onClick={() => {
        // handleClose();
        // deleteIcon(openMenuDialog);
        // }}
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
