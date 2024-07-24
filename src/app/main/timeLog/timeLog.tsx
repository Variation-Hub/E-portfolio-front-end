import { Card, Dialog, DialogContent, Grid, IconButton, Menu, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { fetchCourseAPI, selectCourseManagement } from 'app/store/courseManagement';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { DangerButton, LoadingButton, SecondaryButton, SecondaryButtonOutlined } from 'src/app/component/Buttons';
import NewTimeLog from './newTimeLog';
import { deleteTimeLogHandler, getTimeLogAPI, getTimeLogSpendData, selectTimeLog } from 'app/store/timeLog';
import { selectGlobalUser } from 'app/store/globalUser';
import FuseLoading from '@fuse/core/FuseLoading';
import DataNotFound from 'src/app/component/Pages/dataNotFound';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AlertDialog from 'src/app/component/Dialogs/AlertDialog';
import CalendarComponent from './calendar';

const TimeLog = (props) => {

  const dispatch: any = useDispatch();
  const { data } = useSelector(selectCourseManagement);
  const { currentUser, selectedUser, selected } = useSelector(selectGlobalUser);
  const timeLog = useSelector(selectTimeLog);
  const [edit, setEdit] = useState("save");

  const [timeLogData, setTimeLogData] = useState({
    user_id: selected ? selectedUser?.user_id : currentUser?.user_id,
    course_id: null,
    activity_date: '',
    activity_type: '',
    unit: '',
    trainer_id: null,
    type: '',
    spend_time: '0:0',
    start_time: '0:0',
    end_time: '0:0',
    impact_on_learner: '',
    evidence_link: '',
  });

  const handleDataUpdate = (e) => {
    const { name, value } = e.target;
    setTimeLogData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteId, setDeleteId] = useState("");
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleClick = (event, row) => {
    console.log(row);
    setSelectedRow(row);
    setAnchorEl(event.currentTarget);
  };


  const handleEdit = (edit) => {
    setEdit(edit);
    setTimeLogData(selectedRow);
    handleClickOpen();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteIcon = (id) => {
    setDeleteId(selectedRow?.id);
    setSelectedRow(null);
  };

  const deleteConfromation = async () => {
    await dispatch(deleteTimeLogHandler(deleteId));
    dispatch(getTimeLogAPI({ page: 1, page_size: 10 }, selected ? selectedUser?.user_id : currentUser?.user_id));
    setDeleteId("");
  };

  useEffect(() => {
    dispatch(fetchCourseAPI());
    dispatch(getTimeLogAPI({ page: 1, page_size: 10 }, selected ? selectedUser?.user_id : currentUser?.user_id));
    // dispatch(getTimeLogSpendData(selected ? selectedUser?.user_id : currentUser?.user_id,));
  }, [dispatch]);

  const [filterData, setFilterData] = useState({
    courseId: "",
    jobType: ""
  });
  console.log(filterData);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    dispatch(getTimeLogSpendData(selected ? selectedUser?.user_id : currentUser?.user_id, filterData?.courseId, filterData?.jobType));
  }, [dispatch, filterData]);

  const [dialogType, setDialogType] = useState(false);

  const handleClickOpen = () => {
    setDialogType(true);
  };

  const handleCloseDialog = () => {
    setDialogType(false);
    setTimeLogData({
      user_id: selected ? selectedUser?.user_id : currentUser?.user_id,
      course_id: null,
      activity_date: '',
      activity_type: '',
      unit: '',
      trainer_id: null,
      type: '',
      spend_time: '0:0',
      start_time: '0:0',
      end_time: '0:0',
      impact_on_learner: '',
      evidence_link: '',
    })
  };

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = date.substr(0, 10);
    return formattedDate;
  };

  const [isCalendarView, setIsCalendarView] = useState(false);

  const handleToggleView = () => {
    setIsCalendarView(!isCalendarView);
  };
  return (
    <Grid className="flex flex-col m-10 p-10 gap-20" sx={{ minHeight: 600 }}>
      <Grid>
        <Typography className='h2 font-500 pb-10'>Viewing E-Timelog for All Courses and General Activities</Typography>
      </Grid>
      <Grid className='w-full pb-10 flex flex-row gap-40 '>
        <TextField
          className='w-9/12'
          name="courseId"
          select
          value={filterData?.courseId}
          size="small"
          label="Select Course"
          required
          fullWidth
          onChange={handleFilterChange}
          sx={{
            ".muiltr-156t61m-MuiSvgIcon-root-MuiSelect-icon": {
              color: "black"
            }
          }}
        >
          {data?.map(data => (
            <MenuItem key={data.id} value={data.course_id}>
              {data.course_name}
            </MenuItem>
          ))}
        </TextField>
        <Typography className="font-600 mb-2 flex items-center  "> &lt; Change View by Course</Typography>
      </Grid>
      <Grid className='w-full pb-10 flex flex-row gap-40 '>
        <TextField
          className='w-9/12'
          name="jobType"
          select
          label="Select Job Training"
          value={filterData?.jobType}
          size="small"
          required
          fullWidth
          sx={{
            ".muiltr-156t61m-MuiSvgIcon-root-MuiSelect-icon": {
              color: "black"
            }
          }}
          onChange={handleFilterChange}
        >
          <MenuItem value={"Not Applicable"}>Not Applicable</MenuItem>
          <MenuItem value={"On the job"}>On the job</MenuItem>
          <MenuItem value={"Off the job"}>Off the job</MenuItem>
        </TextField>
        <Typography className="font-600 mb-2 flex items-center  "> &lt;  Change View by On/Off the Job Training</Typography>
      </Grid>
      <Grid className='flex justify-center'>
        <Grid className='flex gap-40 w-[60%]'>
          <Grid className='w-1/4 rounded-4' sx={{ border: "1px solid #ddd" }}>
            <Card className='rounded-4 p-10 bg-grey-200' sx={{ borderBottom: "1px solid #ddd" }}>
              <Typography className='h4 font-300'>This Week:</Typography>
            </Card>
            <Card className='rounded-4 p-20'>
              <Grid className='flex items-baseline gap-5'>
                <span className='h1 font-600'>{timeLog?.timeLogspendData?.thisWeek?.split(':')[0]}</span>
                <span className='h5 font-600'>: {timeLog?.timeLogspendData?.thisWeek?.split(':')[1]}</span>
              </Grid>
            </Card>
          </Grid>
          <Grid className='w-1/4 rounded-4' sx={{ border: "1px solid #ddd" }}>
            <Card className='rounded-4 p-10 bg-grey-200' sx={{ borderBottom: "1px solid #ddd" }}>
              <Typography className='h4 font-300'>This Month:</Typography>
            </Card>
            <Card className='rounded-4 p-20'>
              <Grid className='flex items-baseline gap-5'>
                <span className='h1 font-600'>{timeLog?.timeLogspendData?.thisMonth?.split(':')[0]}</span>
                <span className='h5 font-600'>: {timeLog?.timeLogspendData?.thisMonth?.split(':')[1]}</span>
              </Grid>
            </Card>
          </Grid>
          <Grid className='w-1/4 rounded-4' sx={{ border: "1px solid #ddd" }}>
            <Card className='rounded-4 p-10 bg-grey-200' sx={{ borderBottom: "1px solid #ddd" }}>
              <Typography className='h4 font-300'>Total:</Typography>
            </Card>
            <Card className='rounded-4 p-20'>
              <Grid className='flex items-baseline gap-5'>
                <span className='h1 font-600'>{timeLog?.timeLogspendData?.total?.split(':')[0]}</span>
                <span className='h5 font-600'>: {timeLog?.timeLogspendData?.total?.split(':')[1]}</span>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid className='w-full rounded-4 ' sx={{ border: "1px solid #ddd" }}>
        <Card className='rounded-4 p-10 bg-grey-200'>
          <Typography className='h5 font-400'>Recent Activity:</Typography>
        </Card>
        <Grid className="m-10 px-10 pt-10 ">
          <TableContainer sx={{ maxHeight: "auto" }} >
            {/* {dataFetchLoading ? (
                            <FuseLoading />
                        ) : formdata.data.length ? ( */}
            <Table
              sx={{ minWidth: 650, heighFaddt: "100%" }}
              size="small"
              aria-label="simple table"
            >
              <TableHead sx={{ borderBottom: "3px solid #ddd" }}>
                <TableRow>
                  <TableCell>Activity Type</TableCell>
                  <TableCell align="left">On/Off the Job Training</TableCell>
                  <TableCell align="left">Time Taken</TableCell>
                  <TableCell align="left">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timeLog?.data?.slice(0, 3)?.map((row) => (
                  <TableRow
                    key={row.activityType}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className='flex flex-col w-full'
                      sx={{ borderBottom: "1px solid #ddd", width: "30%" }}
                    >
                      {row?.activity_type}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "1px solid #ddd", width: "30%" }}
                    >
                      {row?.type}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "1px solid #ddd", width: "10%" }}
                    >
                      {row?.spend_time}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "1px solid #ddd", width: "10%" }}
                    >
                      {formatDate(row?.activity_date)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid className='flex justify-between m-10 '>
        <SecondaryButton name={isCalendarView ? "Switch to List View" : "Switch to Calendar View"} onClick={handleToggleView} />
        <SecondaryButton name="Add New Timelog Entry" onClick={() => handleClickOpen()} />
      </Grid>

      {isCalendarView ? (
        <CalendarComponent />
      ) : (
        <Grid className='flex justify-between m-10 '>
          <TableContainer sx={{ maxHeight: 500, marginBottom: "2rem" }}>
            {timeLog?.dataFetchLoading ? (
              <FuseLoading />
            ) : timeLog?.data?.length ? (
              <Table
                sx={{ minWidth: 650, height: "100%" }}
                size="small"
                aria-label="simple table"
              >
                <TableHead className="bg-[#F8F8F8]" sx={{ borderBottom: "3px solid #ddd" }}>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{
                        maxWidth: "9rem",
                        overflow: "hidden",
                        textOverflow: "inherit",
                        // whiteSpace: "nowrap",
                      }}>
                      Activity Type
                    </TableCell>
                    <TableCell align="left"
                      sx={{
                        maxWidth: "9rem",
                        overflow: "hidden",
                        textOverflow: "inherit",
                        // textOverflow: "ellipsis",
                        // whiteSpace: "nowrap",
                      }}>
                      Course / Unit
                    </TableCell>
                    <TableCell align="left"
                      sx={{
                        maxWidth: "9rem",
                        overflow: "hidden",
                        textOverflow: "inherit",
                        // textOverflow: "ellipsis",
                        // whiteSpace: "nowrap",
                      }}>
                      Trainer
                    </TableCell>
                    <TableCell align="left"
                      sx={{
                        maxWidth: "9rem",
                        overflow: "hidden",
                        textOverflow: "inherit",
                        // textOverflow: "ellipsis",
                        // whiteSpace: "nowrap",
                      }}>
                      Time Spent
                    </TableCell>
                    <TableCell align="left"
                      sx={{
                        maxWidth: "9rem",
                        overflow: "hidden",
                        textOverflow: "inherit",
                        // textOverflow: "ellipsis",
                        // whiteSpace: "nowrap",
                      }}>
                      Activity Start Time
                    </TableCell>
                    <TableCell align="left"
                      sx={{
                        maxWidth: "9rem",
                        overflow: "hidden",
                        textOverflow: "inherit",
                        // textOverflow: "ellipsis",
                        // whiteSpace: "nowrap",
                      }}>
                      On/Off the Job Training
                    </TableCell>
                    <TableCell align="left"
                      sx={{
                        maxWidth: "9rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                      Comment
                    </TableCell>
                    <TableCell align="left" sx={{ width: "15rem" }}>
                      Date
                    </TableCell>
                    <TableCell align="left" sx={{ width: "5rem" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timeLog?.data?.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 }, borderBottom: "1px solid #ddd", }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          borderBottom: "1px solid #ddd",
                          maxWidth: "9rem",
                          overflow: "hidden",
                          textOverflow: "inherit",
                          // textOverflow: "ellipsis",
                          // whiteSpace: "nowrap",
                        }}
                      >
                        {row?.activity_type}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          borderBottom: "1px solid #ddd",
                          maxWidth: "9rem",
                          overflow: "hidden",
                          textOverflow: "inherit",
                          // textOverflow: "ellipsis",
                          // whiteSpace: "nowrap",
                        }}
                      >
                        {row?.course_id?.course_name}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          width: "15rem",
                          overflow: "hidden",
                          textOverflow: "inherit",
                          borderBottom: "1px solid #ddd",
                          // textOverflow: "ellipsis",
                          // whiteSpace: "nowrap"
                        }}>
                        {row?.trainer_id?.user_name}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderBottom: "1px solid #ddd", width: "15rem" }}
                      >
                        {row?.spend_time}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderBottom: "1px solid #ddd", width: "15rem" }}
                      >
                        {row?.start_time}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderBottom: "1px solid #ddd", width: "15rem" }}
                      >
                        {row?.type}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderBottom: "1px solid #ddd", width: "15rem" }}
                      >
                        {row?.impact_on_learner}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderBottom: "1px solid #ddd", width: "15rem" }}
                      >
                        {formatDate(row?.activity_date)}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderBottom: "1px solid #ddd", width: "5rem" }}
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
        </Grid>
      )}

      <AlertDialog
        open={Boolean(deleteId)}
        close={() => deleteIcon("")}
        title="Delete Time Log?"
        content="Deleting this time log will also remove all associated data and relationships. Proceed with deletion?"
        className="-224 "
        actionButton={
          timeLog?.dataUpdatingLoadding ? (
            <LoadingButton />
          ) : (
            <DangerButton
              onClick={deleteConfromation}
              name="Delete Time Log"
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
            handleEdit("edit");
            handleClose();
          }}
        >
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
        open={dialogType}
        onClose={handleCloseDialog}
        sx={{
          ".MuiDialog-paper": {
            borderRadius: "4px",
            width: "100%",
          },
        }}
      >
        <NewTimeLog
          edit={edit}
          handleCloseDialog={handleCloseDialog}
          timeLogData={timeLogData}
          setTimeLogData={setTimeLogData}
          handleDataUpdate={handleDataUpdate}
        />
      </Dialog>
    </Grid>
  )
}
export default TimeLog;