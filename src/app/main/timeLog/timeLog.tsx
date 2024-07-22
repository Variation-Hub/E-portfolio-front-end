import { Card, Dialog, DialogContent, Grid, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { fetchCourseAPI, selectCourseManagement } from 'app/store/courseManagement';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SecondaryButton } from 'src/app/component/Buttons';
import NewTimeLog from './newTimeLog';

const dataBase = [
  {
    activityType: "Manual",
    activityDescription: "Traditional face-to-face session",
    jobTraining: "Off the Job",
    timeTaken: "1:00",
    date: "19/06/2024"
  },
  {
    activityType: "Session",
    activityDescription: "Traditional face-to-face session",
    jobTraining: "On the Job",
    timeTaken: "2:00",
    date: "01/05/2024"
  },
  {
    activityType: "Session",
    activityDescription: "Traditional face-to-face session",
    jobTraining: "On the Job",
    timeTaken: "2:00",
    date: "26/03/2024"
  }
]

const TimeLog = () => {

  const dispatch: any = useDispatch();
  const { data } = useSelector(selectCourseManagement);

  useEffect(() => {
    dispatch(fetchCourseAPI());
  }, []);

  const [courseId, setCourseId] = useState('');

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    setCourseId(courseId);
  };

  const [dialogType, setDialogType] = useState(false);

  const handleClickOpen = () => {
    setDialogType(true);
  };

  const handleCloseDialog = () => {
    setDialogType(null);
  };

  return (
    <Grid className="flex flex-col m-10 p-10 gap-20" sx={{ minHeight: 600 }}>
      <Grid>
        <Typography className='h2 font-500 pb-10'>Viewing E-Timelog for All Courses and General Activities</Typography>
      </Grid>
      <Grid className='w-full pb-10 flex flex-row gap-40 '>
        <Select
          className='w-9/12'
          name="course_id"
          value={courseId}
          size="small"
          placeholder='Select Course'
          required
          fullWidth
          onChange={handleCourseChange}
        >
          {data?.map(data => (
            <MenuItem key={data.id} value={data.course_id}>
              {data.course_name}
            </MenuItem>
          ))}
        </Select>
        <Typography className="font-600 mb-2 flex items-center  "> &lt; Change View by Course</Typography>
      </Grid>
      <Grid className='w-full pb-10 flex flex-row gap-40 '>
        <Select
          className='w-9/12'
          name="log_entries"
          // value={employerData.log_entries}
          size="small"
          required
          fullWidth
        // onChange={handleDataUpdate}
        >
          <MenuItem value={"All Time Log Entries"}>All Time Log Entries</MenuItem>
          <MenuItem value={"Not Applicable"}>Not Applicable</MenuItem>
          <MenuItem value={"On the job"}>On the job</MenuItem>
          <MenuItem value={"Off the job"}>Off the job</MenuItem>
        </Select>
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
                <Typography className='h1 font-600'>0 :</Typography>
                <Typography className='h4 font-600'>00</Typography>
              </Grid>
            </Card>
          </Grid>
          <Grid className='w-1/4 rounded-4' sx={{ border: "1px solid #ddd" }}>
            <Card className='rounded-4 p-10 bg-grey-200' sx={{ borderBottom: "1px solid #ddd" }}>
              <Typography className='h4 font-300'>This Month:</Typography>
            </Card>
            <Card className='rounded-4 p-20'>
              <Grid className='flex items-baseline gap-5'>
                <Typography className='h1 font-600'>0 :</Typography>
                <Typography className='h5 font-600'>00</Typography>
              </Grid>
            </Card>
          </Grid>
          <Grid className='w-1/4 rounded-4' sx={{ border: "1px solid #ddd" }}>
            <Card className='rounded-4 p-10 bg-grey-200' sx={{ borderBottom: "1px solid #ddd" }}>
              <Typography className='h4 font-300'>Total:</Typography>
            </Card>
            <Card className='rounded-4 p-20'>
              <Grid className='flex items-baseline gap-5'>
                <Typography className='h1 font-600'>2 :</Typography>
                <Typography className='h5 font-600'>15</Typography>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid className='w-full rounded-4 ' sx={{ border: "1px solid #ddd" }}>
        <Card className='rounded-4 p-10 b-grey-200'>
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
                  <TableCell align="left">Time Taken Time Taken</TableCell>
                  <TableCell align="left">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataBase?.map((row) => (
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
                      <TableCell className='w-full'>{row.activityType}</TableCell>
                      <TableCell className='w-full text-sm'>{row.activityDescription}</TableCell>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "1px solid #ddd", width: "30%" }}
                    >
                      {row.jobTraining}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "1px solid #ddd", width: "10%" }}
                    >
                      {row.timeTaken}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "1px solid #ddd", width: "10%" }}
                    >
                      {row?.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid className='flex justify-between m-10 '>
        <SecondaryButton name="Switch to Calendar View" />
        <SecondaryButton name="Add New Timelog Entry" onClick={() => handleClickOpen()}/>
      </Grid>
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
          <NewTimeLog />
      </Dialog>
    </Grid>
  )
}
export default TimeLog;