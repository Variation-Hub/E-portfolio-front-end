import FuseLoading from '@fuse/core/FuseLoading';
import { Autocomplete, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { selectGlobalUser } from 'app/store/globalUser';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SecondaryButton } from 'src/app/component/Buttons';
import DataNotFound from 'src/app/component/Pages/dataNotFound';
import CustomPagination from 'src/app/component/Pagination/CustomPagination';

const CourseTab = () => {
    const { selectedUser, dataFetchLoading } = useSelector(selectGlobalUser);
    const navigate = useNavigate();

    const courseList = selectedUser?.course?.map((item) => (item?.course));
    console.log(courseList);

    const handleCreateCourse = () => {
        // navigate("/courseBuilder/course");
    };

    const formatDate = (date) => {
        if (!date) return "";
        const formattedDate = date.substr(0, 10);
        return formattedDate;
    };

    return (
        <div>
            <div>
                <h1 className='font-semibold'>Learner Course Management</h1>
            </div>

            <Grid className='w-full flex flex-row gap-20 mt-32 mb-24 justify-center'>
                <Grid className='w-[80%] flex flex-col justify-start gap-10'>
                    <Grid >
                        <Typography sx={{ fontSize: "0.9vw", marginBottom: "0.5rem", fontWeight: "600" }}>Select Course</Typography>
                        <Autocomplete
                            disableClearable
                            fullWidth
                            size="small"
                            options={courseList}
                            getOptionLabel={(option: any) => option?.course_name}
                            // value={employer.find((emp) => emp.employer.employer_id === learnerData.employer_id) || null}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Select Course"
                                    name="course"
                                />
                            )}
                            // onChange={(event, value) => {
                            //     setLearnerData((prevData) => ({
                            //         ...prevData,
                            //         employer_id: value?.employer?.employer_id || null,
                            //     }));
                            // }}
                            sx={{
                                ".MuiAutocomplete-clearIndicator": {
                                    color: "#5B718F",
                                },
                            }}
                            PaperComponent={({ children }) => (
                                <Paper style={{ borderRadius: "4px" }}>{children}</Paper>
                            )}
                        />
                    </Grid>

                    <Grid>
                        <SecondaryButton
                            className="py-6"
                            name="Add Course"
                            onClick={handleCreateCourse}
                        />
                    </Grid>
                </Grid>
            </Grid>

            <TableContainer sx={{ minHeight: 550, display: "flex", flexDirection: "column", justifyContent: "space-between", overflowX: "auto !important" }}>
                {dataFetchLoading ? (
                    <FuseLoading />
                ) : courseList?.length ? (
                    <Table
                        sx={{ minWidth: 650, height: "100%" }}
                        size="small"
                        aria-label="simple table"
                    >
                        <TableHead className="bg-[#F8F8F8]">
                            <TableRow>
                                <TableCell align="left">
                                    Course Name
                                </TableCell>
                                <TableCell align="left">
                                    Status
                                </TableCell>
                                <TableCell align="left">
                                    Episode
                                </TableCell>
                                <TableCell align="left">
                                    Grouping
                                </TableCell>
                                <TableCell align="left">
                                    Qualification Code
                                </TableCell>
                                <TableCell align="left">
                                    Course Start/End
                                </TableCell>
                                <TableCell align="left">
                                    Extension Date
                                </TableCell>
                                <TableCell align="left">
                                    Actual End Date
                                </TableCell>
                                <TableCell align="left">
                                    Assessor(s)
                                </TableCell>
                                <TableCell align="left">
                                    IQA(s)
                                </TableCell>
                                <TableCell align="left">
                                    Grades
                                </TableCell>
                                <TableCell align="left">
                                    Awarding Body
                                </TableCell>
                                <TableCell align="left">
                                    Registratin Details
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courseList?.map((row) => (
                                <TableRow
                                    key={row.topic}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", minWidth: "15rem" }}
                                    >
                                        {row?.course_name}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", minWidth: "15rem" }}
                                    >
                                        {row?.qualification_status}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", minWidth: "15rem" }}
                                    >
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", minWidth: "15rem" }}
                                    >
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", minWidth: "15rem" }}
                                    >
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", minWidth: "15rem" }}
                                    >
                                        {formatDate(row.operational_start_date)}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", minWidth: "15rem" }}
                                    >
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", minWidth: "15rem" }}
                                    >
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", minWidth: "15rem" }}
                                    >
                                        {(selectedUser?.course?.map((item) => (item.employer_id.first_name)))} {(selectedUser?.course?.map((item) => (item.employer_id.last_name)))}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", minWidth: "15rem" }}
                                    >
                                        {(selectedUser?.course?.map((item) => (item.IQA_id.first_name)))} {(selectedUser?.course?.map((item) => (item.IQA_id.last_name)))}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", minWidth: "15rem" }}
                                    >
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", minWidth: "15rem" }}
                                    >
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderBottom: "2px solid #F8F8F8", minWidth: "15rem" }}
                                    >
                                        {/* {formatDate(row.created_at)} */}
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
                {/* <CustomPagination
                    pages={meta_data?.pages}
                    page={meta_data?.page}
                    handleChangePage={handleChangePage}
                    items={meta_data?.items}
                /> */}
            </TableContainer>
        </div>
    )
}

export default CourseTab